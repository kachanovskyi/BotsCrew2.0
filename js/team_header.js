var targetOffset = ($('.content').offset().top - 44*2);
console.log(targetOffset, 'targetOffset');
var $w = $(window).scroll(function(){
    if ( $w.scrollTop() > targetOffset ) {
        console.log('header styles updated');
        $('.menu-item').addClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('white');
        $('.header .menu-item.bot-btn').addClass('white-blue');
        $('.logo').attr('src', "../img/logo.svg");
        $('.navbar').css('background', '#FFFFFF');
        $('.navbar-default').css('border-bottom', '1px solid #E5E5E5');
    } else {
        $('.menu-item').removeClass('standard-menu-item');
        $('.header .menu-item.bot-btn').removeClass('white-blue');
        $('.header .menu-item.bot-btn').addClass('white');
        $('.logo').attr('src', "../img/logo_white.svg");
        $('.navbar').css('background', 'transparent');
        $('.navbar-default').css('border-bottom', 'none');
    }
});
