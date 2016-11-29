export default class Expression {
    constructor(report) {
        this.callback = {};
        this.callback.report = report;
        this.expression = $("#expression");
        do {
            this.num1 = Math.round(Math.random(10) * 10);
            this.num2 = Math.round(Math.random(10) * 10);
        } while (this.num1 < 2 || this.num2 < 2)
    }

    ask() {
        this.expression.text(`${this.num1} * ${this.num2}`);
        $('#answerInput').on('keyup', this.onKeyup.bind(this));
    }

    onKeyup(e) {
        if (e.which == 13) {
            $('#answerInput').off('keyup');
            this.callback.report(
                this.num1,
                this.num2,
                (this.num1 * this.num2) == parseInt($(e.target).val())
            );
            $('#answerInput').val('');
        }
    }
}
