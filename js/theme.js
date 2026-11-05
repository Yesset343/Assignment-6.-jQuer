/* Task 1: Dynamic Style Changes - Day & Night Theme Toggle */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var toggleBtn = document.getElementById('themeToggleBtn');
        var currentTheme = localStorage.getItem('cs2hub_theme');

        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (toggleBtn) toggleBtn.textContent = '☀️ Day Mode';
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                document.body.classList.toggle('dark-theme');
                var isDark = document.body.classList.contains('dark-theme');
                toggleBtn.textContent = isDark ? '☀️ Day Mode' : '🌙 Night Mode';
                localStorage.setItem('cs2hub_theme', isDark ? 'dark' : 'light');
            });
        }
    });
})();