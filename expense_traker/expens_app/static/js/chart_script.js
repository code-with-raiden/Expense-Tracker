document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('spendingChart').getContext('2d');

    // Retrieve values from the JSON script tags
    const categoriesJson = document.getElementById('categories-data').textContent;
    const amountsJson = document.getElementById('amounts-data').textContent;

    // Parse the JSON strings into arrays
    let categoryNames = JSON.parse(categoriesJson);
    let amounts = JSON.parse(amountsJson);

    // Aggregate amounts by category
    const aggregatedData = {};
    
    for (let i = 0; i < categoryNames.length; i++) {
        const category = categoryNames[i];
        const amount = amounts[i];

        if (aggregatedData[category]) {
            aggregatedData[category] += amount; // Add to existing amount
        } else {
            aggregatedData[category] = amount; // Initialize new category
        }
    }

    // Prepare data for the chart
    const uniqueCategories = Object.keys(aggregatedData);
    const totalAmounts = uniqueCategories.map(category => aggregatedData[category]);

    // Create the chart instance
    const spendingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: uniqueCategories,
            datasets: [{
                label: 'Amount Spent',
                data: totalAmounts,
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Categories'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (₹)'
                    },
                    ticks: {
                        callback: function(value) { return value.toFixed(2); }
                    }
                }
            }
        }
    });
});