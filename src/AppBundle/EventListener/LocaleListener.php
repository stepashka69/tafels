<?php
namespace AppBundle\EventListener;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\Router;

class LocaleListener implements EventSubscriberInterface
{
    /** @var Router */
    private $router;

    /** @var string */
    private $supportedLocales;

    /** @var string */
    private $defaultLocale;

    /**
     * LocaleListener constructor.
     * @param Router $router
     * @param string $supportedLocales
     * @param string $defaultLocale
     */
    public function __construct(Router $router, $supportedLocales, $defaultLocale = 'en')
    {
        $this->router = $router;
        $this->supportedLocales = $supportedLocales;
        $this->defaultLocale = $defaultLocale;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();

        $requestLocale = $request->getLocale();
        $preferredLocale = $request->getPreferredLanguage($this->supportedLocales);

        // For the first-time user if it get's to the default landing page need to
        // detect the locale and redirect to the correct one.
        if (!$request->hasPreviousSession() && $requestLocale == $this->defaultLocale) {
            $request->getSession()->set('_locale', $preferredLocale);
            if ($requestLocale != $preferredLocale) {
                $event->setResponse(
                    new RedirectResponse(
                        $this->router->generate(
                            $request->get('_route'),
                            array_merge(
                                $request->query->all(),
                                $request->get('_route_params'),
                                ['_locale' => $preferredLocale]
                            )
                        )
                    )
                );
                return;
            }
        }

        // try to see if the locale has been set as a _locale routing parameter
        if ($locale = $request->attributes->get('_locale')) {
            $request->getSession()->set('_locale', $locale);
        } else {
            // if no explicit locale has been set on this request, use one from the session
            $request->setLocale($request->getSession()->get('_locale', $preferredLocale));
        }

    }

    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::REQUEST => array(array('onKernelRequest', 15)),
        );
    }
}
