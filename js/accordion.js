/* Task 2: Accordion (FAQ). Answers are hidden by default; clicking a question toggles them. */
(function () {
    document.querySelectorAll('.accordion-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            var item = button.closest('.accordion-item');
            var isOpen = item.classList.toggle('is-open');
            button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });
})();