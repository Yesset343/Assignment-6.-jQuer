/* Task 5: Current date and time, updated every second. */
(function () {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];
    var output = document.getElementById('datetime');
    if (!output) return;

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function format(now) {
        var hours = now.getHours();
        var suffix = hours >= 12 ? 'PM' : 'AM';
        var hour12 = hours % 12 === 0 ? 12 : hours % 12;
        return MONTHS[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear() +
               ', ' + hour12 + ':' + pad(now.getMinutes()) + ' ' + suffix;
    }

    function update() {
        output.textContent = format(new Date());
    }

    update();
    setInterval(update, 1000);
})();