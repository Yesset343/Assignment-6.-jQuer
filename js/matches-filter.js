/* Task 2 & 3: Advanced JS Concepts (Objects, Arrays, Higher-Order Functions & Switch) */
(function () {
    // Array of Match Objects
    var matchesData = [
        { id: 1, title: 'NAVI vs Spirit', format: 'BO3', status: 'upcoming', category: 'Major', img: 'images/navi.jpg' },
        { id: 2, title: 'G2 vs Vitality', format: 'BO3', status: 'upcoming', category: 'Tier-1', img: 'images/g2.jpg' },
        { id: 3, title: 'FaZe vs Liquid', format: 'BO3', status: 'finished', category: 'Tier-1', img: 'images/faze.jpg' },
        { id: 4, title: 'FURIA vs Mouz', format: 'BO3', status: 'finished', category: 'Major', img: 'images/furia.jpg' },
        { id: 5, title: 'Falcons vs Virtus.pro', format: 'BO3', status: 'upcoming', category: 'Tier-1', img: 'images/falcons.jpg' },
        { id: 6, title: 'Liquid vs Complexity', format: 'BO1', status: 'finished', category: 'Regional', img: 'images/liquid.jpg' }
    ];

    function renderMatches(list) {
        var container = document.getElementById('matchesContainer');
        if (!container) return;

        container.innerHTML = ''; // Clear previous content

        // Higher-Order Function: forEach
        list.forEach(function (match) {
            var badgeClass = match.status === 'upcoming' ? 'bg-success' : 'bg-secondary';
            var cardHtml = `
                <div class="col-12 col-md-6 col-lg-4">
                    <article class="card h-100 shadow-sm">
                        <img src="${match.img}" class="card-img-top" alt="${match.title}">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge ${badgeClass}">${match.status.toUpperCase()}</span>
                                <small class="text-muted">${match.category}</small>
                            </div>
                            <h3 class="card-title h5">${match.title}</h3>
                            <p class="card-text">Competitive CS2 match.</p>
                            <p><strong>Format:</strong> ${match.format}</p>
                            <button type="button" class="btn btn-outline-primary w-100 btn-animate" onclick="alert('Viewing match: ${match.title}')">Match Details</button>
                        </div>
                    </article>
                </div>
            `;
            container.innerHTML += cardHtml;
        });
    }

    function filterMatchesByStatus(filterType) {
        var filteredList = [];

        // Task 2: Switch Statement to control filtering logic
        switch (filterType) {
            case 'upcoming':
                // Higher-Order Function: filter
                filteredList = matchesData.filter(function (m) { return m.status === 'upcoming'; });
                break;
            case 'finished':
                filteredList = matchesData.filter(function (m) { return m.status === 'finished'; });
                break;
            case 'all':
            default:
                filteredList = matchesData;
                break;
        }

        renderMatches(filteredList);
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Initial render
        renderMatches(matchesData);

        // Filter buttons click listeners
        var filterBtns = document.querySelectorAll('[data-filter]');
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-outline-primary');
                });
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary');

                var filterValue = btn.getAttribute('data-filter');
                filterMatchesByStatus(filterValue);
            });
        });
    });
})();