/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
    const data = [{
            "user": {
                "name": "Newton",
                "avatars": {
                    "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
                    "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
                    "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
                },
                "handle": "@SirIsaac"
            },
            "content": {
                "text": "If I have seen further it is by standing on the shoulders of giants"
            },
            "created_at": 1461116232227
        },
        {
            "user": {
                "name": "Descartes",
                "avatars": {
                    "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                    "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                    "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
                },
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        },
        {
            "user": {
                "name": "Johann von Goethe",
                "avatars": {
                    "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                    "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                    "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
                },
                "handle": "@johann49"
            },
            "content": {
                "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
            },
            "created_at": 1461113796368
        }
    ];

    function createTweetElement(tweetData) {
        let $h1 = $("<h1>").addClass("username").text(tweetData.user.handle);
        let $h2 = $(`<h2 class="fullname">`).text(tweetData.user.name)
        let $img = $("<img>").addClass("avatar").attr("src", tweetData.user.avatars.small);

        let $header = $("<header>").append($img, $h1, $h2);


        let $p = $("<p>").text(tweetData.content.text)
        let $div = $("<div>").addClass("tweet-content").append($p)

        let $p2 = $("<p>").addClass("timestamp").text(tweetData.created_at)
        let $footer = $("<footer>").append($p2)

        //tweet variable now appends all its children 
        let $tweet = $("<article>")
            .addClass("tweet")
            .append($header)
            .append($div)
            .append($footer)

        return $tweet;
    }

    function renderTweets(tweets) {
        tweets.forEach(function (element) {
            var result = createTweetElement(element);
            $('#all-tweets').append(result)

        });

    }

    renderTweets(data);

    $('#createTweet').on('submit', function (event) {
        event.preventDefault();
        console.log("we submitted the form")
        var data = $('#createTweet').serialize();
        console.log(data);


        $.ajax({
            url: '/tweets',
            method: 'POST',
            data: data,
            success: function (result) {
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
});