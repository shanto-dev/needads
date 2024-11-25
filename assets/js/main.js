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



    // Multistep Form 
    $(document).ready(function () {
        var currentStep = 1;

        function updateActiveStep() {
            // Update the active state of the step-circle buttons
            $('.step-circle').removeClass('active');
            $('.step-circle').eq(currentStep - 1).addClass('active');

            // Show the corresponding step content
            $('.step').hide();
            $(".step-" + currentStep).show();

            // Validate the current step
            validateStep();
        }

        function validateStep() {
            let isValid = true;

            // Check all required fields in the current step
            $(".step-" + currentStep + " :input[required]").each(function () {
                if (!$(this).val()) {
                    isValid = false;
                    return false; // Exit loop on first invalid field
                }
            });

            // Enable or disable the Next button
            $(".next-step").prop('disabled', !isValid);
        }

        function sendStepData() {
            const formData = $(".step-" + currentStep + " :input").serialize(); // Serialize the data of the current step

            $.ajax({
                url: 'your-email-handler-endpoint.php', // Replace with your server-side endpoint
                method: 'POST',
                data: formData,
                success: function (response) {
                    console.log("Data sent successfully:", response);
                },
                error: function (xhr, status, error) {
                    console.error("Error sending data:", error);
                }
            });
        }

        // Next button click handler
        $(".next-step").click(function () {
            if (currentStep < 3) { // Adjust max steps as needed
                sendStepData(); // Send data for the current step
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

        // Validate the first step on page load
        updateActiveStep();

        // Trigger validation on input change
        $(document).on("input", ":input", validateStep);
    });


    // form Handele 
    function sendStepData() {
        const formData = $(".step-" + currentStep + " :input").serialize(); // Serialize the data of the current step
    
        $.ajax({
            url: 'form-handler.php', // Adjust the path if needed
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    console.log("Data sent successfully:", response.message);
                } else {
                    console.error("Server error:", response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error sending data:", error);
            }
        });
    }
    




})(jQuery);