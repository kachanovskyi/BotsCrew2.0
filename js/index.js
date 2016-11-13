//progress bar
var bar = new ProgressBar.Line('#progressbar-container', {
    strokeWidth: 1,
    // easing: 'easeInOut',
    duration: 10000,
    color: '#2F80ED',
    trailColor: '#DFDFDF',
    trailWidth: 6,
    svgStyle: {width: '100%', height: '100%'}
});

var progressBarInit = function () {
    bar.animate(1.0, function() {
        bar.animate(0.0, {duration: 3000}, function () {
            progressBarInit();
        });
    });
};
progressBarInit();

$(document).ready(function () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.navbar').outerHeight();

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
            $('.navbar').removeClass('nav-down').addClass('nav-up');
        } else {
            if(st + $(window).height() < $(document).height()) {
                $('.navbar').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }
});
