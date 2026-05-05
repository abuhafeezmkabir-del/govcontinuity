// Dashboard-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Table row hover effect
    const tableRows = document.querySelectorAll('.table-premium tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#F5F7FA';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Search functionality (demo)
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            console.log('Searching for:', e.target.value);
            // In production, this would filter the table
        });
    }
    
    // Pagination click handlers
    const paginationButtons = document.querySelectorAll('.pagination button');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            paginationButtons.forEach(b => {
                b.classList.remove('bg-navy', 'text-white');
                b.classList.add('text-gray-500', 'border-gray-200');
            });
            this.classList.add('bg-navy', 'text-white');
            this.classList.remove('text-gray-500', 'border-gray-200');
        });
    });
});