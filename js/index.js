$(document).ready(function () {
    $('a.page-scroll').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 900);
                return false;
            }
        }
    });

    var barInitialized = false;
    var bar;
    var timer;
    var progressSlide = 0;
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.navbar-fixed-top').outerHeight();

    var listElem = $('.slide-4 .bottom ul>li');
    var displayAmount = 0;
    for (var i = 0; i < listElem.length - 1; i++) {
        if($(listElem[i]).css('display') === 'block') {
            displayAmount++;
        }
    }

    $(window).scroll(function(event) {
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


        if (st > lastScrollTop && st > navbarHeight) {
            $('.navbar-fixed-top').removeClass('nav-down').addClass('nav-up');
        } else {
            if(st + $(window).height() < $(document).height()) {
                $('.navbar-fixed-top').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }

    // function setHeight() {
    //     var height = $('.slide-2 .right').outerHeight();
    //     $('.slide-2 .bot-preview-block').height(height);
    // }
    // setHeight();
    // $(window).resize(setHeight);


    //.bot-example scripts
    var phrases = [
        { type: 'person', phrase: '1.You dude!' },
        { type: 'bot', phrase: '2.Aloha! How can I help You?' },
        { type: 'person', phrase: '3.Can you book a table in one of the nearest 5-stars rated pizzerias?' },
        { type: 'bot', phrase: '4.Sure! Let\'s find the best one for You' },
        { type: 'person', phrase: '5.You dude!' },
        { type: 'bot', phrase: '6.Aloha! How can I help You?' },
        { type: 'person', phrase: '7.Can you book a table in one of the nearest 5-stars rated pizzerias?' },
        { type: 'bot', phrase: '8.Sure! Let\'s find the best one for You' }
    ];

    var current;
    var addMessages = function() {
        current = 0;
        clearTimeout(timer);
        timer = setTimeout(function message() {
            if ( ($w.scrollTop() > $('.slide-5').offset().top) ) {
                clearTimeout(timer);
            }

            var example = $($('.bot-example')[progressSlide]);
            var div = document.createElement('div');
            div.className = "phrase-box " + phrases[current].type;
            div.innerHTML = phrases[current].phrase;
            $(div).appendTo(example).fadeOut(0);
            // console.log(div);
            removeFirstElement(example.children()[current]);
            current++;
            // if(current > 4) {
            //     // $(example.children()[0]).remove();
            //     example = $($('.bot-example')[progressSlide])
            //     console.log('removed', example.children()[0]);
            // }
            if(current < 8) {
                timer = setTimeout(message, 800);
            } else {
                current = 0;
            }

        }, 200);
    };

    var removeFirstElement = function(phraseObj) {
        $(phraseObj).fadeIn("slow");
        var example = $('.bot-example');
        example.scrollTop(example[progressSlide].scrollHeight);

        // var exampleHeight = $(example[progressSlide]).outerHeight();
        // for(var i = 0; i < example.children().length; i++) {
        //     console.log(example.children()[i]);
        // }
        // if(example.children().length > 4) {
        //     // var example = $($('.bot-example')[progressSlide]);
        //     // $(example.children()[0]).css('display', 'none');
        //     // console.log('removed ' + example.children().length);
        //     // example.find('div').eq(0).remove();
        // }
    };



    var progressBarInit = function () {
        var listItemLink = $('.slide-4 .bottom ul>li>a');
        addMessages();

        $($('.slide-4 .bottom ul>li .progressbar-container')[0]).remove();
        $($('.slide-4 .bottom ul>li')[progressSlide]).append('<div class="progressbar-container"></div>');
        listItemLink.removeClass('active');
        $(listItemLink[progressSlide]).addClass('active');
        bar = new ProgressBar.Line('.progressbar-container', {
            strokeWidth: 1,
            duration: 7000,
            color: '#2F80ED',
            trailColor: '#DFDFDF',
            trailWidth: 6,
            svgStyle: {width: '100%', height: '100%'}
        });

        bar.animate(1.0, function() {
            var example = $('.bot-example');
            if(progressSlide < 6) {
                progressSlide++;
                $('#botUsesCard').carousel('next');
            } else {
                progressSlide = 0;
                $('.slide-4 .bottom ul>li .progressbar-container').remove();
                $($('.slide-4 .bottom ul>li')[progressSlide]).append('<div class="progressbar-container"></div>');
            }
            if(progressSlide === 6) {
                progressSlide = 0;
            }
            example.children().remove();
            progressBarInit();
        });
    };

    $('.slide-4 .bottom ul>li>a').click(function () {
        var item = $('#botUsesCard .item');
        var listItemLink = $('.slide-4 .bottom ul>li>a');

        listItemLink.removeClass('active');
        $(this).addClass('active');
        bar.stop();
        bar.set(0.0);
        $('.bot-example').children().remove();
        progressSlide = listItemLink.index(this);

        $($('.slide-4 .bottom ul>li .progressbar-container')[0]).remove();
        $($('.slide-4 .bottom ul>li')[progressSlide]).append('<div class="progressbar-container"></div>');
        progressBarInit();
    });

    var targetOffset = ($('.slide-3').offset().top + $(window).height());
    var $w = $(window).scroll(function() {
        var slide5 = $('.slide-5');
        if ( !barInitialized && ($w.scrollTop() > targetOffset) && ($w.scrollTop() < slide5.offset().top) ) {
            progressBarInit();
            barInitialized = true;
        }

        if ( barInitialized && (($w.scrollTop() > slide5.offset().top) || $w.scrollTop() < targetOffset)) {
            clearTimeout(timer);
            bar.stop();
            bar.set(0.0);
            $($('.bot-example')[progressSlide]).children().remove();
            barInitialized = false;
        }
    });


    var $rw = $(window).resize(function(){
        console.log('resized');
        var listElem = $('.slide-4 .bottom ul>li');
        displayAmount = 0;
        for (var i = 0; i < listElem.length - 1; i++) {
            if($(listElem[i]).css('display') === 'block') {
                displayAmount++;
            }
        }
        var middle = $('.slide-4 .middle');
        var maxHeight = middle.height();
        if($(window).width() < 767) {
            middle.css('max-height', (maxHeight * 2));
            console.log('window less than 767');
        }
        console.log(middle.css('max-height'));
    });

    var counter = 0;
    var listScrollNext = function () {
        console.log(displayAmount, 'displayAmount');
        var listElem = $('.slide-4 .bottom ul>li');
        if($(listElem[listElem.length - 2]).css('display') == 'block') {
            counter = 0;
            for(var i = 0; i < listElem.length - 1; i ++) {
                $(listElem[i]).css('display', 'none');
                console.log($(listElem[listElem.length - 2]).css('display'), 'loop ' + i);
                if(i < displayAmount) {
                    console.log(displayAmount, 'i < displayAmount');
                    $(listElem[i]).css('display', 'block');
                    console.log($(listElem[i]).css('display'), 'reloading');
                }
            }
        } else {
            $(listElem[counter]).css('display', 'none');
            console.log($(listElem[counter]).css('display'), 'display counter');
            $(listElem[counter + displayAmount]).css('display', 'block');
            console.log($(listElem[counter + displayAmount]).css('display'), 'display counter+2');
            counter++;
        }
    };
    $('#listScrollNext').click(function (e) {
        console.log('worked');
        listScrollNext();
        return false;
    });

    autosize($('textarea'));
});
