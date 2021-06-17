$("#sidebarTop > li > a").click(function() {
    if ($(this).next('ul').length) {
        $(this).toggleClass('active').next('ul').toggle();
    }
});
$("#sidebarTop > li > ul > li > a").click(function() {
    if ($(this).next('ul').length) {
        $(this).toggleClass('active').next('ul').toggle();
    }
});