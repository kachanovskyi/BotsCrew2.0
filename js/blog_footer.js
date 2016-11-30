var targetOffsetTop = $('.social-share').offset().top;
$(window).on('resize', function(){
    var targetOffsetTop = $('.social-share').offset().top;
}());
console.log(targetOffsetTop, 'targetOffset');
var $w = $(window).scroll(function(){
    if ( $w.scrollTop() > 51) {
        $('.footer-fixed').removeClass('hidden');
        console.log('1');
    } else {
        $('.footer-fixed').addClass('hidden');
        console.log('2');
    }

    if ( ($w.scrollTop() + $w.height()) > (targetOffsetTop + 51*2)) {
        $('.footer-fixed').addClass('hidden');
    } else {
        $('.footer-fixed').removeClass('hidden');
    }
});
