$(document).ready(function () {
    console.log("document ready!");
    $('.new-tweet textarea').on('keypress', function () {
        let charCounter = 140;
        let charTyped = $(this).val().length;
        let charLeft = charCounter - charTyped;
        console.log(charLeft)

        $('.counter').text(charLeft)
    });
});