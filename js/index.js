$(document).ready(function () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.navbar-fixed-top').outerHeight();
    console.log(navbarHeight);

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;


        if (st > lastScrollTop && st > navbarHeight){
            $('.navbar-fixed-top').removeClass('nav-down').addClass('nav-up');
        } else {
            if(st + $(window).height() < $(document).height()) {
                $('.navbar-fixed-top').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }


    //.bot-example scripts
    var phrases = [
        { type: 'person', phrase: 'You dude!' },
        { type: 'bot', phrase: 'Aloha! How can I help You?' },
        { type: 'person', phrase: 'Can you book a table in one of the nearest 5-stars rated pizzerias?' },
        { type: 'bot', phrase: 'Sure! Let\'s find the best one for You' },
        { type: 'person', phrase: 'You dude!' },
        { type: 'bot', phrase: 'Aloha! How can I help You?' },
        { type: 'person', phrase: 'Can you book a table in one of the nearest 5-stars rated pizzerias?' },
        { type: 'bot', phrase: 'Sure! Let\'s find the best one for You' }
    ];

    var addMessages = function() {
        for (var i = 0; i < phrases.length; i++) {
            var example = $('.bot-example');
            var div = document.createElement('div');
            div.className = "phrase-box " + phrases[i].type;
            div.innerHTML = phrases[i].phrase;
            $(div).appendTo(example).fadeOut("fast");
            setTimeout(removeFirstElement.bind(null, example.children()[i]), 1000 * (i+1));
        }
    };

    var removeFirstElement = function(phraseObj) {
        $(phraseObj).fadeIn("slow");
        var example = $('.bot-example');
        var exampleHeight = example.outerHeight();
        if(exampleHeight > 333) {
            var child = example.children()[0];
            example.find('div').eq(0).remove();
        }
    };

    //progress bar
    var bar = new ProgressBar.Line('#progressbar-container', {
        strokeWidth: 1,
        // easing: 'easeInOut',
        duration: 9000,
        color: '#2F80ED',
        trailColor: '#DFDFDF',
        trailWidth: 6,
        svgStyle: {width: '100%', height: '100%'}
    });

    var progressBarInit = function () {
        addMessages(phrases);
        bar.animate(1.0, function() {
            bar.animate(0.0, {duration: 3000}, function () {
                progressBarInit();

            });
        });
    };
    progressBarInit();
});
