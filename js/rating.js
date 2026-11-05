/* Task 1: DOM Manipulation - Rating Stars & Read More Toggles */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        
        // 1. Rating Stars Logic (document.querySelectorAll)
        var ratingContainers = document.querySelectorAll('.star-rating');
        ratingContainers.forEach(function (container) {
            var stars = container.querySelectorAll('.star');
            stars.forEach(function (star, index) {
                star.addEventListener('click', function () {
                    var ratingValue = index + 1;
                    container.setAttribute('data-rating', ratingValue);
                    
                    // Update active styles
                    stars.forEach(function (s, i) {
                        if (i <= index) {
                            s.classList.add('active');
                            s.textContent = '★';
                        } else {
                            s.classList.remove('active');
                            s.textContent = '☆';
                        }
                    });
                });
            });
        });

        // 2. "Read More" Visibility Toggle (style.display)
        var readMoreBtns = document.querySelectorAll('.btn-read-more');
        readMoreBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var cardBody = btn.closest('.custom-card-content, .card-body');
                var extraText = cardBody.querySelector('.extra-content');
                if (!extraText) return;

                if (extraText.style.display === 'block') {
                    extraText.style.display = 'none';
                    btn.textContent = 'Read More';
                } else {
                    extraText.style.display = 'block';
                    btn.textContent = 'Show Less';
                }
            });
        });

        // 3. Dynamic Quote Generator (textContent & innerHTML)
        var quoteBtn = document.getElementById('fetchQuoteBtn');
        var quoteDisplay = document.getElementById('cs2QuoteText');
        var quotes = [
            "\"CS2 is not just about aiming; it's about positioning and team coordination.\" — CS2 Analyst",
            "\"Donk's aggressive entry fragging redefined the rifler meta in 2024.\"",
            "\"Smoke physics in Source 2 introduced volumetric tactical gameplay.\"",
            "\"s1mple is widely regarded as the GOAT of Counter-Strike history.\"",
            "\"m0NESY's clutch potential with the AWP is unmatched in high-stakes finals.\""
        ];

        if (quoteBtn && quoteDisplay) {
            quoteBtn.addEventListener('click', function () {
                var randomIndex = Math.floor(Math.random() * quotes.length);
                quoteDisplay.textContent = quotes[randomIndex];
                quoteDisplay.style.color = '#0d6efd';
            });
        }
    });
})();