$(document).ready(function () {
    console.log("document ready!");
    $('.new-tweet textarea').on('input', function () {
        let charLeft = 140 - $(this).val().length;
        console.log(charLeft)
        $('#counter').text(charLeft)
        if (charLeft < 0) {
            $('#counter').css('color', 'red');
            $('.new-tweet').find('.error').slideDown();
        } else {
            $('#counter').css('color', 'black');
            $('.new-tweet').find('.error').slideUp();
        }
    });
});