/* Task 3: Popup subscription form.
   Hidden by default. Opens with any [data-popup-open] button,
   closes with the close button, a click outside the box, or the Escape key. */
(function () {
    var overlay = document.getElementById('subscribePopup');
    if (!overlay) return;
    var closeButtons = overlay.querySelectorAll('[data-popup-close]');
    var openButtons = document.querySelectorAll('[data-popup-open]');
    var lastFocused = null;

    function open() {
        lastFocused = document.activeElement;
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        var first = overlay.querySelector('input');
        if (first) first.focus();
    }

    function close() {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        if (lastFocused) lastFocused.focus();
    }

    openButtons.forEach(function (btn) { btn.addEventListener('click', open); });
    closeButtons.forEach(function (btn) { btn.addEventListener('click', close); });

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) close();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
})();