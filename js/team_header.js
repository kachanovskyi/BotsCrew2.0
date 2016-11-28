var targetOffset = $('.content').offset().top;
console.log(targetOffset, 'targetOffset');
var $w = $(window).scroll(function(){
    if ( $w.scrollTop() > (targetOffset - 44*2)) {
        console.log('header styles updated');
        $('.menu-item').addClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('white');
        $('.header .menu-item.bot-btn').addClass('white-blue');
        $('.logo').attr('src', "../img/logo.svg");
    } else {
        $('.menu-item').removeClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('white-blue');
        $('.header .menu-item.bot-btn').addClass('white');
        $('.logo').attr('src', "../img/logo_white.svg");
    }

    if ( $w.scrollTop() > targetOffset - 44) {
        $('.navbar-default').css('border-bottom', '1px solid #E5E5E5');
        $('.navbar').css('background', '#FFFFFF');
    } else {
        $('.navbar-default').css('border-bottom', 'none');
        $('.navbar').css('background', 'transparent');
    }
});
