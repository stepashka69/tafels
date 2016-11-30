$(function () {
    var tafels = new window.Tafels(
        $('#timer'),
        $('#res-correct'),
        $('#res-fail'),
        $('#res-total'),
        $("#expression"),
        $('#answerInput'),
        $('#res-table'),
        10,
        0,
        10
    );
    $('#btn-opnew').on('click', function () {
        tafels.start();
    });

    $('#btn-start').on('click', function (e) {
        $(this).closest('div.row').addClass('hidden');
        tafels.start();
    });
});
