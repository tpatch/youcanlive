/*jslint devel: false, browser: false, white: true */
/*global $: false, window: false */

function respImage(prefix) {
	$('img.responsive-image').each(function(){
		var src = $(this).attr('data-src'),
		imgType = $(this).attr('data-imagetype'),
		name = $(this).attr('alt');
		$(this).attr('src', src + prefix + name + imgType);	
	});
}


(function () {
	"use strict";

	window.GOED = {
		init: function () {
			this.bannerTrans();
			this.galSlider();
			this.nav();
			this.popUp();
			this.vidSwap();
			this.urlHash();
			this.trackShare();
		},

		bannerTrans: function () {
			setTimeout(function() {
				$( '#second' ).fadeTo( 2000, 1 );
			}, 2000);
		},

		galSlider: function () {

			$('#gallery .slidewrapper ul li:first').before($('.slidewrapper ul li:last'));
			$('#gallery2 .slidewrapper ul li:first').before($('.slidewrapper ul li:last'));
			
			var itemWidth = $('.slidewrapper ul li').width() + 20,
				itemLength = $('.slidewrapper ul li').length,
				navPrev = "<span class='nav prev'></span>",
				navNext = "<span class='nav next'></span>",
				sliderWidth = $('.slidewrapper ul').width() * itemLength,
				viewport = itemWidth;

			$('.slidewrapper ul').css({left: -itemWidth, width:sliderWidth + 'px'});
			$('.slider .slidewrapper').css('width', viewport);

			if ($(window).width() < itemWidth * 2) {
				$('.slider .slidewrapper').css('width', itemWidth * 1);
			} else if ($(window).width() < itemWidth * 3){
				$('.slider .slidewrapper').css('width', itemWidth * 2);
			} else  if ($(window).width() < itemWidth * 4){
				$('.slider .slidewrapper').css('width', itemWidth * 3);
			} else {
				$('.slider .slidewrapper').css('width', itemWidth * 4);
			};

			$(window).on('resize', function() {
				$('.slidewrapper ul').css({left: -itemWidth});
				
				if ($(window).width() < itemWidth * 2) {
					$('.slider .slidewrapper').css('width', itemWidth * 1);
				} else if ($(window).width() < itemWidth * 3){
					$('.slider .slidewrapper').css('width', itemWidth * 2);
				} else  if ($(window).width() < itemWidth * 4){
					$('.slider .slidewrapper').css('width', itemWidth * 3);
				} else {
					$('.slider .slidewrapper').css('width', itemWidth * 4);
				};
			});

			$( '.slidewrapper' ).after(navPrev);
			$( '.slidewrapper' ).after(navNext);

			$('.nav').on('click',function(){

				var sliderID = $(this).parent().find('.slidewrapper ul').attr('id');
				
				if (sliderID == 'gallery') {
					var galName = 'Jobs';
				} else if (sliderID == 'gallery2') {
					var galName = 'Lifestyle';
				};

				if ($(this).hasClass('next')) {
					$('#' + sliderID).animate({
							left: '-=' + itemWidth
						}, 500, function() {
							$('#' + sliderID + ' li:last').after($('#' + sliderID + ' li:first'));
							$('#' + sliderID).css({left: -itemWidth});
							_gaq.push(['_trackEvent', 'Gallery Next', 'click', galName]);
				 	});
				} else if ($(this).hasClass('prev')) {
					$('#' + sliderID).animate({
							left: '+=' + itemWidth
						}, 500, function() {
							$('#' + sliderID + ' li:first').before($('#' + sliderID + ' li:last'));
							$('#' + sliderID).css({left: -itemWidth});
							_gaq.push(['_trackEvent', 'Gallery Previous', 'click', galName]);
					});
				}
			});
		},

		nav: function () {
			$('ul.nav a').on('click', function(e) {
				if ($(this).attr('class')) {
					e.preventDefault();
					var navId = $(this).attr('class');
					$('html, body').animate({scrollTop:$("div#" + navId).position().top - 50}, 1000);
					$('.header ul').removeClass('open');
				}
			});

			$('.link').on('click', function (e) {
				e.preventDefault();
				var navId = $(this).attr('href');
				$('html, body').animate({scrollTop:$(navId).position().top - 50}, 1000);
				
			});

			$('#menu').on('click', function () {
				$('.mobile-header').toggleClass('open');
			});

			$('.mobile-header .nav li').on('click', function () {
				$('.mobile-header').removeClass('open');
			});
		},

		popUp: function () {
			$('#gallery').magnificPopup({
				delegate: 'a',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title');
					}
				},
                iframe: {
                    tError: '<a href="%url%">The video #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title');
                    }
                }
			});

			$('#gallery2').magnificPopup({
				delegate: 'a',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title');
					}
				},
                iframe: {
                    tError: '<a href="%url%">The video #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title');
                    }
                }
			});
		},

		vidSwap: function () {
			$('#jobs .grid .w6 img').on('click', function () {
		                var youtubeLink = '';
		                if ($(this).attr("src").indexOf("joe") >= 0) {
		                    youtubeLink = 'g5SaKO0he7c';
		                } else {
		                    youtubeLink = 'g5SaKO0he7c';
		                }
				$(this).remove();
				$('#jobs .grid .w6').append('<iframe width="615" height="405" src="https://www.youtube.com/embed/' + youtubeLink + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
			});

			$('#lifestyle .grid .w5 img').on('click', function () {
		                var youtubeLink = '';
		                if ($(this).attr("src").indexOf("lifestyle") >= 0) {
		                    youtubeLink = '06H_AC2YXGI';
		                } else {
		                    youtubeLink = '06H_AC2YXGI';
		                }
				$(this).remove();
				$('#lifestyle .grid .w5').append('<iframe width="615" height="405" src="https://www.youtube.com/embed/' + youtubeLink + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
			});
		},

		urlHash: function () {
			if ($(window).width() > 768) {
				var currentHash = "#initial_hash"
				$(document).scroll(function () {
					$('.marker').each(function () {
						var top = window.pageYOffset;
						var distance = top - $(this).offset().top;
						var hash = $(this).attr('id');
						if (distance < 100 && distance > -100 && currentHash != hash) {
							if (window.history && window.history.pushState && hash != 'home') {
								history.pushState("", document.title, '#' + hash);
							}
							currentHash = hash;
						}
					});
				});
			}
		},

		trackShare: function () {
			setTimeout(function() {
			    $('.at-share-btn').on('click', function () {
			      var shareID = $(this).find('span').attr('title');
			      _gaq.push(['_trackEvent', 'Social Share', 'Click', shareID]);
			    });
			  }, 1000);
		}
	};

		$(window.document).ready(function () {
			if ($(window).width() < 768) {
				$('.nomobile').each(function(){
					$(this).remove();
				});
			};
			window.GOED.init();
		});
	}());