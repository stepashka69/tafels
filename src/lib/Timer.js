export default class Timer {

    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.seconds = 0;
        this.stop();
        this.output();
    }

    start() {
        this.timerInterval = window.setInterval(function () {
            this.output();
            this.seconds++;
        }.bind(this), 1000);
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timerInterval = null
    }

    output() {
        this.element.text(this.format());
    }

    format() {
        const minutes = Math.floor(this.seconds / 60);
        const seconds = Math.floor(this.seconds - minutes * 60);
        return `${minutes}:${((seconds < 10)?'0':'')}${seconds}`;
    }
}
