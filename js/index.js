$(document).ready(function () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.navbar-fixed-top').outerHeight();

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
            $(div).appendTo(example).fadeOut(0);
            setTimeout(removeFirstElement.bind(null, example.children()[i]), 1000 * (i));
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
        duration: 8000,
        color: '#2F80ED',
        trailColor: '#DFDFDF',
        trailWidth: 6,
        svgStyle: {width: '100%', height: '100%'}
    });

    var progressBarInit = function () {
        addMessages(phrases);
        bar.animate(1.0, function() {
            var messagesLength = $('.bot-example').children().length;
            var timePerMessage = 3000 / messagesLength;
            for (i = 0; i < messagesLength; i++) {
                setTimeout(function () {
                    var example = $('.bot-example');
                    var child = example.children()[0];
                    example.find('div').eq(0).remove();
                }, i * timePerMessage);
            }
            bar.animate(0.0, {duration: 3000}, function () {
                progressBarInit();
            });
        });
    };
    // var targetOffset = $('.slide-4').offset().top;
    // var $w = $(window).scroll(function(){
    //     if ( $w.scrollTop() > targetOffset ) {
    //         progressBarInit();
    //     }
    // });


    var listElem = $('.slide-4 .bottom ul>li');
    var displayAmount = 0;
    var firstDisplayed = 0;
    $(window).on('resize', function(){
        listElem = $('.slide-4 .bottom ul>li');
        displayAmount = 0;
        firstDisplayed = 0;
        for (var i = 0; i < listElem.length - 1; i++) {
            if($(listElem[i]).css('display') === 'block') {
                displayAmount++;
                console.log(displayAmount, 'displayAmount');
            }
        }
    });

    var listScrollNext = function () {
        var elemFound = false;

        // console.log(listElem.length, 'lenght');
        // console.log($($('.slide-4 .bottom ul>li')[0]).css('display'));
        if((firstDisplayed + displayAmount) === (listElem.length - 1)) {
            for(i = 0; i < displayAmount; i++) {
                $(listElem[i]).css('display', 'block');
                firstDisplayed = 0;
                console.log('displayed new');
            }
            for(i = displayAmount; i < listElem.length - 1; i++) {
                $(listElem[i]).css('display', 'none');
            }
        } else {
            for (i = 0; i < listElem.length - 1; i++) {
                if($(listElem[i]).css('display') === 'block') {
                    firstDisplayed = i;
                    console.log(firstDisplayed, 'firstDisplayed');
                    break;
                }
            }
            $(listElem[i]).css('display', 'none');
            $(listElem[i + displayAmount]).css('display', 'block');
        }
        return false;
    };
    // listScrollNext();
    $('#listScrollNext').click(function (e) {
        console.log('worked');
        listScrollNext();
        return false;
    })
});
