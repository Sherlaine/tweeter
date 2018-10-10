$(document).ready(function () {
    console.log("document ready!");
    $('.new-tweet textarea').on('keypress', function () {
        let charLeft = 140 - $(this).val().length;
        console.log(charLeft)
        $('#counter').text(charLeft)
        if (charLeft < 0) {
            $('#counter').css('color', 'red');
        } else {
            $('#counter').css('color', 'black');
        }
    });
});