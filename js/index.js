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
