/* Task 2: Keyboard Event Handling
   Allows navigating navbar menu links using Left and Right arrow keys. */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
        if (!navLinks.length) return;

        document.addEventListener('keydown', function (event) {
            // Check if active element is inside the navbar
            var focusedElement = document.activeElement;
            var currentIndex = navLinks.indexOf(focusedElement);

            if (currentIndex !== -1) {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    var nextIndex = (currentIndex + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    var prevIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
                    navLinks[prevIndex].focus();
                }
            }
        });
    });
})();