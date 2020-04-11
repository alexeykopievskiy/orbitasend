$(function(){
	"use strict";
	
	
	var scrollOffset = 100;
	
	$(window).on('scroll', function(){
		
		/*=========================================================================
			Change navigation bar from transparent to white
		=========================================================================*/
		if( $(window).scrollTop() < scrollOffset ){
			$('body').removeClass('scrolled');
		}else{
			$('body').addClass('scrolled');
		}
		
		/*=========================================================================
			Navbar ScrollSpy
		=========================================================================*/
		var scrollPos = $(document).scrollTop(),
			nav_height = $('#navbar').outerHeight();
		
		$('.navbar li a').each(function () {
			var currLink = $(this),
				refElement = $(currLink.attr('href'));
			if( refElement.size() > 0 ){
				if ( ( refElement.position().top - nav_height ) <= scrollPos ) {
					$('.navbar li').removeClass('active');
					currLink.closest('li').addClass('active');
				}else{
					currLink.removeClass('active');
				}
			}
		});
		
		
	});
	
	
	//Initialize smoothscroll plugin
	smoothScroll.init({
		updateURL: false
	});
	
	
	/*=========================================================================
		WOW.js initialization
	=========================================================================*/
	new WOW().init({
		mobile: false
	});
	
	
	/*=========================================================================
		AjaxChimp (For mailchimp subscribe form)
	=========================================================================*/
	$('.newsletter-form').ajaxChimp();
	
	
	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.view-btn').magnificPopup({
		type: 'image',
		mainClass: 'mfp-with-zoom',
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
			opener: function(openerElement) {
			  return openerElement.is('img') ? openerElement : openerElement.closest('figure').find('img');
			}
		  }
	});
	
	
	/*=========================================================================
		Video Section Video Popup
	=========================================================================*/
	$('.play-btn').magnificPopup({
		type: 'iframe'
	});
	
	
	/*=========================================================================
		Hide Preloader When Page Is Loaded
	=========================================================================*/
	$(window).on('load',function(){
		$('body').addClass('loaded');
	});
	
	
	/*=========================================================================
		Initialize Material Design Ripples
	=========================================================================*/
	Waves.attach('.btn-custom', 'waves-classic');
	Waves.init();
	
	/*=========================================================================
		Screenshots Slider
	=========================================================================*/
	$('.screenshots-slider').owlCarousel({
		center: true,
		items:2,
		loop:false,
		margin:15,
		startPosition: 1,
		responsive:{
			600:{
				items:4
			},
			0: {
				startPosition: 0
			}
		}
	});
	
	/*=========================================================================
		Testimonials Slider
	=========================================================================*/
	$('.testimonials-slider').owlCarousel({
		items: 1,
		loop: true,
		startPosition: 1
	});
	
	$(window).on('resize', function(){
		
		// To fix the parallax.js bug
		window.setTimeout(function(){
			$(window).resize();
		},500);
	
	});
	
	// To fix the parallax.js bug
	var isMobile = {
		Android: function() { return navigator.userAgent.match(/Android/i); }, 
		BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
		iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
		Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, 
		Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, 
		any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
	};
    jQuery(function($) {
        if (isMobile.any()) {
			document.documentElement.className = document.documentElement.className + " touch";
            $('.parallax').each(function(i, obj) {
                $(this).css("background-image", 'url('+$(this).data('image-src')+')');
                $(this).css("background-color", "#FFFFFF");
                $(this).css("background-size", "cover");
                $(this).css("background-position", "center center");
            });
        }
	});
	
	
	
	
	/*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	$('#contact-form').validator().on('submit', function (e) {
		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message
			e.preventDefault();
			var $this = $(this),
				//You can edit alerts here
				alerts = {
					success: 
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
					error: 
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
				};
			$.ajax({
				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function(data){
					if( isJSON(data) ){
						data = $.parseJSON(data);
						if(data['error'] == false){
							$('#contact-form-result').html(alerts.success);
							$('#contact-form').trigger('reset');
						}else{
							$('#contact-form-result').html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);
						}
					}else{
						$('#contact-form-result').html(alerts.error);
					}
				},
				error: function(){
					$('#contact-form-result').html(alerts.error);
				}
			});
		}
	});
	
	
	/*=========================================================================
		Particle BG Code
	=========================================================================*/

	
});

$(document).ready(function() {

	var particlesSettings = {
		particles: {
			number: {
				value: 30,
				density: {
					enable: !0,
					value_area: 800
				}
			},
			color: {
				value: "#FFF"
			},
			shape: {
				type: "circle",
				stroke: {
					width: 0,
					color: "#F0F0F0"
				},
				polygon: {
					nb_sides: 5
				},
				image: {
					src: "img/github.svg",
					width: 100,
					height: 100
				}
			},
			opacity: {
				value: .5,
				random: !1,
				anim: {
					enable: !1,
					speed: .5,
					opacity_min: .1,
					sync: !1
				}
			},
			size: {
				value: 3,
				random: !0,
				anim: {
					enable: !1,
					speed: 10,
					size_min: .1,
					sync: !1
				}
			},
			line_linked: {
				enable: !0,
				distance: 150,
				color: "#FFF",
				opacity: .4,
				width: 1
			},
			move: {
				enable: !0,
				speed: 1,
				direction: "none",
				random: !1,
				straight: !1,
				out_mode: "out",
				bounce: !1,
				attract: {
					enable: !1,
					rotateX: 600,
					rotateY: 1200
				}
			}
		},
		interactivity: {
			detect_on: "canvas",
			events: {
				onhover: {
					enable: !0,
					mode: "grab"
				},
				onclick: {
					enable: !0,
					mode: "push"
				},
				resize: !0
			},
			modes: {
				grab: {
					distance: 140,
					line_linked: {
						opacity: 1
					}
				},
				bubble: {
					distance: 400,
					size: 40,
					duration: 2,
					opacity: 8,
					speed: 1.5
				},
				repulse: {
					distance: 200,
					duration: .4
				},
				push: {
					particles_nb: 4
				},
				remove: {
					particles_nb: 2
				}
			}
		},
		retina_detect: true
	};
	console.log('ready')
		console.log('es')
		particlesJS('particles-js', {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}, function() {
			console.log('done')
		});

	});

	$( function() {
		$("button.form-submit").click(function() {
			var cost = $(".slider-results span")[0].textContent;
			var address = $("#address").val();
			var contact = $("#contacts").val();

			if(!address.length) $("#address").addClass('error');
			if(!contact.length) $("#contacts").addClass('error');

			var results = {
				cost,
				address,
				contact
			}

			console.log(results, 'res')
		});

		$("#address").on('keyup', function() {
			$(this).removeClass('error')
		})

		$("#contacts").on('keyup', function() {
			$(this).removeClass('error')
		})
		
		$( "#slider" ).slider({
			range: "min",
			value: 51,
			step: 25,
      min: 50,
      max: 100,
    }).each(function() {

			//
			// Add labels to slider whose values 
			// are specified by min, max and whose
			// step is set to 1
			//
		
			// Get the options for this slider
			console.log($(this).data()['ui-slider'].options)
			var opt = $(this).data()['ui-slider'].options;

			
			// Get the number of possible values
			var vals = (opt.max - opt.min) / opt.step;
			
			// Space out values
			for (var i = 0; i < vals; i++) {
				
				var el = $('<label>'+((opt.value-1) + (opt.step*i))+'k</label>').css('left',(i/vals*100)+'%');
			
				$( "#slider" ).append(el);
				
			}

			var elMax = $('<label>'+(opt.max)+'k</label>').css('left','98%');

			$("#slider").append(elMax)

			$("#slider").on("slide", function(event, ui) {
				console.log(ui)
				var pos = ui.value;
				console.log(pos)

        $(".slider-results span").text(pos*4)
    });
		})
  } );
