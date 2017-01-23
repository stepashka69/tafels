export default class Score {
    constructor(elementCorrect, elementIncorrect, elementTotal, nrTotal) {
        this.elementCorrect = elementCorrect;
        this.elementIncorrect = elementIncorrect;
        this.elementTotal = elementTotal;
        this.nrTotal = nrTotal;
        this.init();
    }

    init() {
        this.correct = 0;
        this.incorrect = 0;
        this.show();
    }

    getCorrect() {
        return this.correct;
    }

    getIncorrect() {
        return this.incorrect;
    }

    show() {
        this.elementCorrect.text(this.correct);
        this.elementIncorrect.text(this.incorrect);
        this.elementTotal.text(`${this.correct + this.incorrect} van ${this.nrTotal}`);
    }

    addCorrect() {
        this.correct++;
        this.show();
    }

    addIncorrect() {
        this.incorrect++;
        this.show();
    }
}
