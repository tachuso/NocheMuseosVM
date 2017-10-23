$(document).ready(function () {
    if ($("#homePage").length) {
        $("#homePage").scroll(function () {
            if ($("#homePage").scrollTop() >= 1) {
                $(".headerShadow.homePage").fadeIn(200);
            } else {
                $(".headerShadow.homePage").fadeOut(200);
            }
        });
    }

    $('#skyAnimation > .scene, #moon').parallax({
        calibrateX: false,
        calibrateY: false,
        invertX: false,
        invertY: true,
        limitX: false,
        limitY: 10,
        scalarX: 2,
        scalarY: 8,
        frictionX: 0.2,
        frictionY: 0.8,
        originX: 0.0,
        originY: 1.0
    });

});