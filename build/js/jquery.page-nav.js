!function(n){n(document).ready(function(){n(window).scroll(function(){var a,t=n(".page-nav__link");a=window.pageYOffset,t.each(function(a,t){var e,i,r=n(".page-nav__link--current");i=n(this).offset().top,target=n(this).attr("href"),e=n(target).offset().top,i>e&&(r.removeClass("page-nav__link--current"),n(this).addClass("page-nav__link--current")),i>903&&i<2160||i>3170&&i<4605||i>5300?n(this).addClass("link-black"):n(this).removeClass("link-black")})})})}(jQuery,jQuery(window));