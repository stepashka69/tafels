export default class Expression {
    constructor(minNum, maxNum) {
        this.minNum = minNum;
        this.maxNum = maxNum;
        this.init();
    }

    init() {
        do {
            this.num1 = Math.round(Math.random() * this.maxNum);
            this.num2 = Math.round(Math.random() * 10);
        } while (this.num1 < this.minNum);
        this.res = this.num1 * this.num2;
    }

    toString() {
        return `${this.num1} * ${this.num2}`;
    }

    isCorrect(val) {
        return val == this.res;
    }

    equals(ex) {
        return this.num1 == ex.num1 && this.num2 == ex.num2;
    }
}

