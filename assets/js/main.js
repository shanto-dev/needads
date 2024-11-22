(function ($) {

    'use strict';

    /*----------------------------------------------------------

   / 12. Contact Form Submission

   /----------------------------------------------------------*/
    $('#applyForm').on('submit', function (e) {

        e.preventDefault();

        var $this = $(this);

        $('button[type="submit"]', this).attr('disabled', 'disabled').val('Processing...');

        var form_data = $this.serialize();

        var required = 0;

        $(".required", this).each(function () {

            if ($(this).val() === '') {

                $(this).addClass('reqError');
                required += 1;

            } else {

                if ($(this).hasClass('reqError')) {
                    $(this).removeClass('reqError');
                    if (required > 0) {
                        required -= 1;
                    }
                }

            }

        });

        if (required === 0) {

            $.ajax({
                type: 'POST',
                url: './contact.php',
                data: {
                    form_data: form_data
                },
                success: function (data) {
                    // Redirect to thank-you.html page immediately after form submission
                    window.location.href = 'thank-you.html';
                }
            });

        } else {
            $('button[type="submit"]', $this).removeAttr('disabled').val('Message');

            $('.con_message', $this).fadeIn()
                .html('<strong>Oops!</strong> Error found. Please fix those and re-submit.')
                .removeClass('alert-success').addClass('alert-warning');

            setTimeout(function () {
                $('.con_message', $this).fadeOut().html('').removeClass('alert-success alert-warning');
            }, 5000);
        }

    });

    $(".required").on('keyup', function () {
        $(this).removeClass('reqError');
    });





    // Testimonial 
    var bramdSwiper = new Swiper('.brand_carousel', {
        loop: true,
        autoplay: {
            delay: 2200,
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

    function updateActiveStep() {
        // Update the active state of the step-circle buttons
        $('.step-circle').removeClass('active');
        $('.step-circle').eq(currentStep - 1).addClass('active');

        // Show the corresponding step content
        $('.step').hide();
        $(".step-" + currentStep).show();
    }

    // Hide all steps except the first one on load
    $('#nda-multi-step-form').find('.step').slice(1).hide();

    // Next button click handler
    $(".next-step").click(function () {
        if (currentStep < 3) {
            currentStep++;
            updateActiveStep();
        }
    });

    // Previous button click handler
    $(".prev-step").click(function () {
        if (currentStep > 1) {
            currentStep--;
            updateActiveStep();
        }
    });

    // Initialize the first step as active on page load
    updateActiveStep();




})(jQuery);