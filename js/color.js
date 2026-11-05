/* Task 4: Change background color on each click (cycles through predefined colors). */
(function () {
    var colors = ['#ffffff', '#fff3cd', '#d1e7dd', '#cff4fc', '#f8d7da', '#e2d9f3'];
    var index = 0;
    var button = document.getElementById('colorButton');
    if (!button) return;

    button.addEventListener('click', function () {
        index = (index + 1) % colors.length;
        document.body.style.backgroundColor = colors[index];
    });
})();