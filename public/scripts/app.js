$(document).ready(function () {

    function createTweetElement(tweetData) {
        //header's children and append after
        let $h1 = $("<h1>").addClass("username").text(tweetData.user.handle);
        let $h2 = $(`<h2 class="fullname">`).text(tweetData.user.name)
        let $img = $("<img>").addClass("avatar").attr("src", tweetData.user.avatars.small);
        let $header = $("<header>").append($img, $h1, $h2);

        let $p = $("<p>").text(tweetData.content.text)
        let $div = $("<div>").addClass("tweet-content").append($p)

        // icons and timestamp append to footer 
        let $icons = $('<div class="icons">');
        let $iFlag = $('<i class="fa fa-flag">');
        let $iRetweet = $('<i class="fa fa-retweet">');
        let $iHeart = $('<i class="fa fa-heart like-button">');
        $icons.append($iFlag, $iRetweet, $iHeart);
        let $p2 = $("<p>").addClass("timestamp").text(tweetData.created_at)
        let $footer = $("<footer>").append($icons, $p2)

        //tweet variable now appends all its children 
        let $tweet = $("<article>")
            .addClass("tweet")
            .append($header, $div, $footer);

        return $tweet;
    }

    function renderTweets(tweets) {
        tweets.forEach(function (element) {
            var result = createTweetElement(element);
            $('#all-tweets').prepend(result)

        });

    }

    function showMessage(message) {
        alert(message);
    };


    $('#createTweet').on('submit', function (event) {
        event.preventDefault();
        var data = $('#createTweet').serialize();
        var tweetLength = $('#textArea').val().length;
        if (tweetLength === 0) {
            showMessage("Please add text");
            return;
        };
        if (tweetLength > 140) {
            showMessage("Exceeded word limit");
            return;
        } else {
            $('#counter').text("140")
        }


        $.ajax({
            url: '/tweets',
            method: 'POST',
            data: data,
            success: function (result) {
                $('#textArea').val('');
                loadTweets();
            },
            error: function (err) {

            }
        })
    })

    function loadTweets() {
        $.get("/tweets", function (tweets) {
            $("#all-tweets").empty();
            renderTweets(tweets)
        });

    }
    loadTweets();
});