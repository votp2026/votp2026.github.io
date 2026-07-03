window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "https://homes.cs.washington.edu/~kpar/nerfies/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    document.getElementById("single-task-result-video").playbackRate = 2.0;
    document.getElementById("multi-task-result-video").playbackRate = 2.0;
})

// -------- Experimental Demos: per-task method/baseline carousel (mimics PRIMT) --------
function demoShowSlide(carouselId, n) {
    var carousel = document.getElementById(carouselId);
    var media = carousel.getElementsByClassName("carousel-images")[0].querySelectorAll("video, img");
    var dots = carousel.getElementsByClassName("dots-container")[0].getElementsByClassName("dot");
    var label = carousel.getElementsByClassName("gif-label")[0];

    // Wrap-around
    if (n >= media.length) { n = 0; }
    if (n < 0) { n = media.length - 1; }

    for (var i = 0; i < media.length; i++) {
        media[i].classList.remove('active');
        dots[i].classList.remove('active');
    }

    media[n].classList.add('active');
    dots[n].classList.add('active');
    if (label) { label.textContent = media[n].dataset.label; }
    if (media[n].tagName === 'VIDEO') {
        try { media[n].currentTime = 0; media[n].play(); } catch (e) {}
    }
    carousel.dataset.currentSlide = n;
}

function demoPlusSlides(carouselId, n) {
    var carousel = document.getElementById(carouselId);
    var current = parseInt(carousel.dataset.currentSlide || 0);
    demoShowSlide(carouselId, current + n);
}

function currentSlide(carouselId, n) {
    demoShowSlide(carouselId, n);
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.gif-carousel').forEach(function(carousel) {
        carousel.dataset.currentSlide = 0;
        demoShowSlide(carousel.id, 0);
        carousel.querySelector('.prev-btn').addEventListener('click', function() { demoPlusSlides(carousel.id, -1); });
        carousel.querySelector('.next-btn').addEventListener('click', function() { demoPlusSlides(carousel.id, 1); });
    });
});


// -------- Table <-> Chart toggle --------
$(function () {
    $('#table-chart-tabs li').on('click', function () {
        var v = $(this).data('view');
        $('#table-chart-tabs li').removeClass('is-active');
        $(this).addClass('is-active');
        $('.table-chart-stage .tc-view').removeClass('is-active');
        $('.table-chart-stage .tc-view[data-view="' + v + '"]').addClass('is-active');
    });
});
