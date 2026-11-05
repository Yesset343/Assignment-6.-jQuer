/* =========================================================
   ASSIGNMENT #6 — JQUERY COMPLETE INTERACTION ENGINE
   ========================================================= */

// Database for Autocomplete & Search
var cs2Database = [
    "NAVI", "Natus Vincere", "Spirit", "Team Spirit", "Vitality", 
    "FaZe Clan", "G2 Esports", "Liquid", "Team Liquid", "FURIA", 
    "Falcons", "m0NESY", "NiKo", "donk", "s1mple", "tn1r", "moon",
    "Mirage", "Inferno", "Nuke", "Dust II", "Anubis", "Ancient"
];

// Helper: Global Toast Notification System (Task 7)
function showToast(message) {
    var $toast = $('<div class="custom-toast"></div>').text(message);
    $('#toastContainer').append($toast);
    $toast.fadeIn(300).delay(2800).fadeOut(400, function () {
        $(this).remove();
    });
}

$(document).ready(function () {

    // ==========================================
    // TASK 4: Colorful Scroll Progress Bar
    // ==========================================
    $(window).on('scroll', function () {
        var winScroll = $(window).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var scrolled = (winScroll / docHeight) * 100;
        $('#scrollProgressBar').css('width', scrolled + '%');
    });

    // ==========================================
    // TASK 1 & 2 & 3: Real-Time Search, Autocomplete & Highlighting
    // ==========================================
    var $searchInput = $('#searchInput');
    var $suggestionsBox = $('#searchSuggestions');

    if ($searchInput.length) {
        $searchInput.on('keyup input', function () {
            var query = $(this).val().toLowerCase().trim();

            // Task 1: Real-time Live Filter
            $('.searchable-card').each(function () {
                var text = $(this).text().toLowerCase();
                $(this).toggle(text.indexOf(query) > -1);
            });

            // Task 3: Search Highlighting in Accordions & Cards
            $('.searchable-text').each(function () {
                var $el = $(this);
                var originalText = $el.data('original-text') || $el.text();
                if (!$el.data('original-text')) $el.data('original-text', originalText);

                if (query.length >= 2) {
                    var regex = new RegExp('(' + query + ')', 'gi');
                    var highlighted = originalText.replace(regex, '<mark class="search-highlight">$1</mark>');
                    $el.html(highlighted);
                } else {
                    $el.html(originalText);
                }
            });

            // Task 2: Autocomplete Suggestions Dropdown
            if (query.length > 0) {
                var matches = cs2Database.filter(function (item) {
                    return item.toLowerCase().indexOf(query) > -1;
                });

                $suggestionsBox.empty();
                if (matches.length > 0) {
                    matches.forEach(function (match) {
                        $suggestionsBox.append('<div class="autocomplete-item">' + match + '</div>');
                    });
                    $suggestionsBox.slideDown(150);
                } else {
                    $suggestionsBox.hide();
                }
            } else {
                $suggestionsBox.hide();
            }
        });

        // Click Autocomplete Item
        $(document).on('click', '.autocomplete-item', function () {
            var selectedText = $(this).text();
            $searchInput.val(selectedText).trigger('input');
            $suggestionsBox.hide();
            showToast("Filtered by: " + selectedText);
        });

        // Hide Suggestions when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.search-container').length) {
                $suggestionsBox.hide();
            }
        });
    }

    // ==========================================
    // TASK 5: Animated Number Counter
    // ==========================================
    var animated = false;
    function checkCounters() {
        var $counterSection = $('#statsSection');
        if (!$counterSection.length || animated) return;

        var oTop = $counterSection.offset().top - window.innerHeight;
        if ($(window).scrollTop() > oTop) {
            $('.stat-number').each(function () {
                var $this = $(this);
                var countTo = parseInt($this.attr('data-count'), 10);
                
                $({ countNum: 0 }).animate({ countNum: countTo }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum + '+');
                    }
                });
            });
            animated = true;
        }
    }
    $(window).on('scroll load', checkCounters);

    // ==========================================
    // TASK 6: Loading Spinner on Submit
    // ==========================================
    $('form[data-validate], #contactForm, #subscribeForm').on('submit', function (e) {
        var $form = $(this);
        var $submitBtn = $form.find('button[type="submit"]');
        var originalBtnText = $submitBtn.html();

        // Show spinner & disable button
        $submitBtn.prop('disabled', true).html(
            '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Please wait...'
        );

        // Simulate server response delay (1.5 seconds)
        setTimeout(function () {
            $submitBtn.prop('disabled', false).html(originalBtnText);
            showToast("Form submitted successfully!");
            
            // Close popup modal if open
            $('#subscribePopup').removeClass('is-open');
            $form[0].reset();
        }, 1500);
    });

    // ==========================================
    // TASK 8: Copied to Clipboard Button
    // ==========================================
    $('.btn-copy').on('click', function () {
        var $btn = $(this);
        var textToCopy = $('#serverIpText').text().trim();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(function () {
                showToast("Copied server IP to clipboard!");
                $btn.html('✓ Copied!').addClass('btn-success').removeClass('btn-outline-primary');
                setTimeout(function () {
                    $btn.html('📋 Copy IP').removeClass('btn-success').addClass('btn-outline-primary');
                }, 2000);
            });
        }
    });

    // ==========================================
    // TASK 9: Image Lazy Loading
    // ==========================================
    function lazyLoadImages() {
        $('img.lazy-img[data-src]').each(function () {
            var $img = $(this);
            var imgTop = $img.offset().top;
            var winBottom = $(window).scrollTop() + $(window).height();

            if (imgTop < winBottom + 100) {
                $img.attr('src', $img.attr('data-src')).removeAttr('data-src').addClass('loaded');
            }
        });
    }
    $(window).on('scroll resize load', lazyLoadImages);
});