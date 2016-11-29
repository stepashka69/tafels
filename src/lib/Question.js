export default class Question {
    constructor(elQuestion, elInput) {
        this.elQuestion = elQuestion;
        this.elInput = elInput;
        this.init();
    }

    init() {
        this.elQuestion.text('');
        this.elInput.val('');
        this.elInput.off('keyup');
        this.elInput.removeClass('correct fail');
    }

    ask(exp, callback) {
        this.elQuestion.text(exp.toString());
        this.elInput.focus();
        this.elInput.on('keyup', this.onKeyup.bind(this, exp, callback));
    }

    onKeyup(exp, callback, e) {
        const element = $(e.target);
        const val = parseInt(element.val());
        if (e.which == 13) {
            element.val('');
            if (isNaN(val)) {
                return;
            }
            element.addClass(exp.isCorrect(val) ? 'correct' : 'fail');
            setTimeout(function () {
                    element.removeClass('correct fail');
                },
                3000
            );
            element.off('keyup');
            return callback(val);
        }
    }

    hide() {
        this.elQuestion.closest('div.row').addClass('hidden');
        this.elInput.closest('div.row').addClass('hidden');
    }

    show() {
        this.elQuestion.closest('div.row').removeClass('hidden');
        this.elInput.closest('div.row').removeClass('hidden');
    }
}
