<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Intl\Intl;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..') . DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {
        // replace this example code with whatever you need
        return $this->render('default/about.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..') . DIRECTORY_SEPARATOR,
        ]);
    }

    public function languagesAction(Request $request)
    {
        $masterRequest = $this->get('request_stack')->getMasterRequest();
        $route = $masterRequest->get('_route');
        $routeParams = $masterRequest->query->all();
        $langs = [];
        $supportedLanguages = $this->getParameter('supported_locales');
        foreach ($supportedLanguages as $languageCode) {
            $langs[$languageCode] = Intl::getLanguageBundle()->getLanguageName($languageCode, null, $languageCode);
        }

        asort($langs);

        return $this->render('parts/languages.html.twig', array(
            'languages' => $langs,
            'currentLanguage' => Intl::getLanguageBundle()->getLanguageName($request->getLocale(), null, $request->getLocale()),
            'route' => $route,
            'routeParams' => $routeParams,
        ));
    }
}
