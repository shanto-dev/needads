var bramdSwiper = new Swiper('.brand_carousel', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        480: {
            spaceBetween: 15,
            slidesPerView: 2
        },
        576: {
            spaceBetween: 15,
            slidesPerView: 2
        },
        768: {
            spaceBetween: 20,
            slidesPerView: 3
        },
        992: {
            spaceBetween: 20,
            slidesPerView: 4
        },
        1300: {
            spaceBetween: 30,
            slidesPerView: 5
        }
    }
});

// Testimonial 
var testimonialSwiper = new Swiper('.cStudies_testimonial_carousel', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 30,
});

$(".countfact").appear();
$(document.body).on("appear", ".countfact", function (e, $affected) {
    $affected.each(function () {
        var $this = $(this);
        if (!$this.hasClass("appeared")) {
            jQuery({
                Counter: 0
            }).animate({
                Counter: $this.attr("data-count")
            }, {
                duration: 3000,
                easing: "swing",
                step: function () {
                    var num = Math.ceil(this.Counter).toString();
                    if (Number(num) > 999) {
                        while (/(\d+)(\d{3})/.test(num)) {
                            num = num.replace(/(\d+)(\d{3})/, '<span class="count-span">' + "$1" + "</span>" + "$2");
                        }
                    }
                    if ($this.hasClass("hasFraction")) {
                        var num = Math.abs(this.Counter);
                        num = num.toFixed(1).toString();
                    }
                    $(".counter", $this).html(num);
                },
            });
            $this.addClass("appeared");
        }
    });
});

var currentStep = 1;
var updateProgressBar;

function displayStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= 3) {
        $(".step-" + currentStep).hide();
        $(".step-" + stepNumber).show();
        currentStep = stepNumber;
        updateProgressBar();
        updateActiveStepClass();
    }
}

function updateActiveStepClass() {
    $('.step-circle').removeClass('active');
    $('.step-circle').eq(currentStep - 1).addClass('active');
}

$('#nda-multi-step-form').find('.step').slice(1).hide();

$(".next-step").click(function () {
    if (currentStep < 3) {
        $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");
        currentStep++;
        setTimeout(function () {
            $(".step").removeClass("animate__animated animate__fadeOut").hide();
            $(".step-" + currentStep).show().addClass("animate__animated animate__fadeIn");
            updateProgressBar();
            updateActiveStepClass();
        }, 500);
    }
});

$(".prev-step").click(function () {
    if (currentStep > 1) {
        $(".step-" + currentStep).addClass("animate__animated animate__fadeOut");
        currentStep--;
        setTimeout(function () {
            $(".step").removeClass("animate__animated animate__fadeOut").hide();
            $(".step-" + currentStep).show().addClass("animate__animated animate__fadeIn");
            updateProgressBar();
            updateActiveStepClass();
        }, 500);
    }
});

updateProgressBar = function () {
    var progressPercentage = ((currentStep - 1) / 2) * 100;
    $(".progress-bar").css("width", progressPercentage + "%");
};

// Initialize active step on load
updateActiveStepClass();