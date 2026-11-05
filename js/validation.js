/* Task 1: Form validation
   Validates every form marked with data-validate.
   Errors appear in elements with data-error-for="<input id>". */
(function () {
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var MIN_PASSWORD = 8;

    function setError(form, id, message) {
        var box = form.querySelector('[data-error-for="' + id + '"]');
        var field = form.querySelector('#' + id);
        if (box) box.textContent = message || '';
        if (field) field.classList.toggle('is-invalid', !!message);
    }

    function validateForm(form) {
        var ok = true;
        var name = form.querySelector('#name, #subName');
        var email = form.querySelector('#email, #subEmail');
        var password = form.querySelector('#password');
        var confirm = form.querySelector('#confirmPassword');
        var message = form.querySelector('#message');
        var agreement = form.querySelector('input[type="checkbox"][required]');

        function check(field, test, text) {
            if (!field) return;
            var msg = test() ? '' : text;
            setError(form, field.id, msg);
            if (msg) ok = false;
        }

        function filled(field) {
            return field.value.trim() !== '';
        }

        if (name) check(name, function () { return filled(name); }, 'Please enter your name.');
        if (email) check(email, function () {
            if (!filled(email)) return false;
            return EMAIL_RE.test(email.value.trim());
        }, filled(email) ? 'Enter a valid email, e.g. name@example.com.' : 'Email is required.');

        if (message) check(message, function () { return filled(message); }, 'Please write a message.');

        if (password) check(password, function () {
            return password.value.length >= MIN_PASSWORD;
        }, password.value ? 'Password must be at least ' + MIN_PASSWORD + ' characters.' : 'Password is required.');

        if (confirm) check(confirm, function () {
            return confirm.value !== '' && confirm.value === password.value;
        }, confirm.value ? 'Passwords do not match.' : 'Please confirm your password.');

        if (agreement) {
            var msg = agreement.checked ? '' : 'You must agree before submitting.';
            setError(form, agreement.id, msg);
            if (msg) ok = false;
        }
        return ok;
    }

    document.querySelectorAll('form[data-validate]').forEach(function (form) {
        // Clear an error as soon as the user edits that field
        form.querySelectorAll('input, textarea').forEach(function (field) {
            field.addEventListener('input', function () { setError(form, field.id, ''); });
            field.addEventListener('change', function () { setError(form, field.id, ''); });
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var status = form.querySelector('.form-status');
            if (validateForm(form)) {
                if (status) {
                    status.className = 'form-status text-success fw-semibold mt-3';
                    status.textContent = 'Thank you! Your form is valid and has been submitted.';
                }
                form.reset();
            } else if (status) {
                status.className = 'form-status text-danger fw-semibold mt-3';
                status.textContent = 'Please fix the highlighted fields.';
            }
        });
    });
})();