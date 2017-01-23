export default class Log {
    constructor(elTable) {
        this.elTable = elTable;
        this.init();
    }

    init() {
        this.elTable.empty().append('<tbody></tbody>');
    }

    add(ex, answer) {
        const res = ex.isCorrect(answer);
        this.elTable.prepend(`<tr class="${res ? 'success' : 'danger'}">
                    <td class="text-right" style="width: 50%">${ex.toString()}</td>
                    <td class="text-center">${res ? '=' : '&ne;'}</td>
                    <td class="text-left" style="width: 50%">${answer}</td>
                </tr>`);
    }
}
