$(document).ready(function () {
    $('a.page-scroll').click(function () {
        console.log('scrolled');
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
    
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.navbar-fixed-top').outerHeight();

    var listElem = $('.slide-4 .bottom ul>li');
    var displayAmount;
    for (var i = 0; i < listElem.length - 1; i++) {
        if($(listElem[i]).css('display') === 'block') {
            displayAmount++;
        }
    }


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

    function setHeight() {
        var height = $('.slide-2 .right').outerHeight();
        $('.slide-2 .bot-preview-block').height(height);
    }
    setHeight();
    $(window).resize(setHeight);


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
        console.log('progressBarInit');
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


    var firstDisplayed = 0;
        $(window).on('resize', function(){
        var listElem = $('.slide-4 .bottom ul>li');
        console.log('window resized');
        console.log(listElem.length, 'length of listElem');
        firstDisplayed = 0;
        displayAmount = 0;
        for (var i = 0; i < listElem.length - 1; i++) {
            if($(listElem[i]).css('display') === 'block') {
                displayAmount++;
            }
        }
    }());

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
    })
});

// var listScrollNext = function () {
//     // console.log(window.getComputedStyle(document.getElementsByClassName('bottom-list-item')[0]).getPropertyValue('display'), 'blah');
//     var elems = document.getElementsByClassName('bottom-list-item');
//     console.log(elems, 'blah');
//     if($(listElem[listElem.length - 2]).css('display') == 'block') {
//         console.log('first if-block');
//         for(var j = 0; j < (listElem.length - 1); j++) {
//             if(j < displayAmount) {
//                 $(listElem[j]).css('display', 'block');
//                 // document.getElementsByClassName('bottom-list-item')[i].style.display = 'block';
//                 // console.log($(listElem[j]).css('display'),'lwifjpnperenjklgnelrnjlergnjlergnljerngjlergnjlernglerr');
//                 console.log('reloading blocks');
//             } else {
//                 // console.log(elems[i], 'elems');
//                 // console.log($(listElem[j]).css('display'),'lwifjpnperenjklgnelrnjlergnjlergnljerngjlergnjlernglerr');
//                 // elems[i].style.display = 'none';
//                 $(listElem[j]).css('display', 'none');
//                 console.log($(listElem[j]).css('display'), 'ukuku');
//                 // console.log(document.getElementsByClassName('bottom-list-item')[i], 'reloading hidden elements');
//             }
//         }
//     }
//     for(var i = 0; i < listElem.length - 1; i++) {
//         console.log('loop one');
//         // console.log($(listElem[j]).css('display'));
//         if($(listElem[i]).css("display") === "block") {
//             console.log('block found ' + i);
//             document.getElementsByClassName('bottom-list-item')[i].style.display = 'none';
//             // $(listElem[i]).css("display", "none");
//             break;
//         }
//     }
//     for(i; i < listElem.length - 1; i++) {
//         console.log('loop two ' + $(listElem[i]).css('display'));
//         if($(listElem[i]).css('display') === 'none') {
//             document.getElementsByClassName('bottom-list-item')[i].style.display = 'block';
//             // $(listElem[i]).css("display", "block");
//             console.log('hidden element found, displaying next ' + i + " " + $(listElem[i]).css('display'));
//             break;
//         }
//     }
// };

// var listScrollNext = function () {
//     // var elemFound = false;
//     var lastElem = $(listElem[listElem.length - 1]);
//     console.log(displayAmount,'displayAmount');
//     // var windowWidth = $(window).width();
//     // var listWidth = $(window).width() - lastElem.css('width');
//     // console.log(lastElem.css('width'), 'width1');
//     // console.log(lastElem.outerWidth(), 'width2');
//     // console.log(windowWidth, 'window width');
//     // console.log(firstDisplayed + " " + displayAmount, 'firstDisplayed + displayAmount');
//     // console.log((listElem.length-1), 'listElem.length - 1');
//
//     // console.log(listElem.length, 'lenght');
//     // console.log($($('.slide-4 .bottom ul>li')[0]).css('display'));
//     if((firstDisplayed + displayAmount) === (listElem.length - 1)) {
//         alert(firstDisplayed + " " + displayAmount + ': firstDisplayed + displayAmount');
//         alert((listElem.length-1) + ' listElem.length - 1');
//         for(var i = 0; i < displayAmount; i++) {
//             $(listElem[i]).css('display', 'block');
//             // $(listElem[i]).css('width', elementWidth);
//             // var arrowWidth = windowWidth - displayAmount*elementWidth;
//             firstDisplayed = 0;
//             // $(lastElem).css('width', ($(window).css('width') - displayAmount*elementWidth));
//             // console.log(($(window).css('width') - ((displayAmount*elementWidth) + 'px')), 'TEST');
//             // console.log($(lastElem).css('width'), 'lastElem width404');
//             console.log('displayed new');
//         }
//         for(i = displayAmount; i < listElem.length - 1; i++) {
//             // $(listElem[i]).css('display', 'none');
//         }
//     } else {
//         console.log('else block');
//         for (i = 0; i < listElem.length - 1; i++) {
//             if($(listElem[i]).css('display') === 'block') {
//                 firstDisplayed = i;
//                 $(listElem[i]).css('display', 'none');
//                 $(listElem[i + displayAmount]).css('display', 'block');
//                 // elementWidth = $(listElem[i]).css('width');
//                 // console.log(elementWidth, 'elementWidth1111');
//                 console.log(firstDisplayed, 'firstDisplayed');
//                 console.log(i+displayAmount, 'i+displayAmount');
//                 console.log($(listElem[i + displayAmount]).css('width'), 'this element width');
//                 break;
//             }
//         }
//         // $(listElem[i]).css('display', 'none');
//         // $(listElem[i + displayAmount]).css('display', 'block');
//         // elementWidth -=1;
//         // $(listElem[i + displayAmount]).css('width', elementWidth);
//         // var arrowWidth = (windowWidth - displayAmount*elementWidth);
//         // console.log(arrowWidth, 'arrowWidth');
//         // $(lastElem).css('width', arrowWidth);
//
//     }
//     return false;
// };
// listScrollNext();
