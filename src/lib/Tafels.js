import Expression from './Expression.js';
import Timer from './Timer.js';
import Score from './Score.js'
import Question from './Question.js'
import Log from './Log.js';

export default class Tafels {
    constructor(elTimer, elCorrect, elFail, elTotal, elQuestion, elInput, elTable, total, nrMin, nrMax) {
        this.total = total;
        this.score = new Score(elCorrect, elFail, elTotal, total);
        this.timer = new Timer(elTimer);
        this.question = new Question(elQuestion, elInput);
        this.log = new Log(elTable);
        this.nrMin = nrMin;
        this.nrMax = nrMax;
        this.init();
    }

    init() {
        this.count = 0;
        this.previousEx = null;
    }

    start() {
        this.reset();
        this.timer.start();
        this.ask();
    }

    exists(num1, num2) {
        for (let res of this.result) {
            if (res.num1 == num1 && res.num2 == num2) {
                return true;
            }
        }
        return false;
    }

    res(ex, res) {
        this.previousEx = ex;

        this.count++;

        ex.isCorrect(res) ? this.score.addCorrect() : this.score.addIncorrect();

        this.log.add(ex, res);

        if (this.count == this.total) {
            return this.finish();
        }

        this.ask();
    }

    ask() {
        if (this.count == this.total) {
            return;
        }

        let ex;
        do {
            ex = new Expression(this.nrMin, this.nrMax);
        } while (this.previousEx && this.previousEx.equals(ex));
        this.question.ask(ex, this.res.bind(this, ex));
    }

    finish() {
        $('.finish').removeClass('hidden');
        this.question.hide();
        this.timer.stop();
    }

    reset() {
        $('.finish').addClass('hidden');
        this.score.init();
        this.timer.init();
        this.question.init();
        this.question.show();
        this.log.init();
    }
}
