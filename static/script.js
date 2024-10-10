function fetchStockData() {
    fetch('/api/stocks')
        .then(response => response.json())
        .then(data => {
            const stocksBody = document.getElementById('stocks-body');
            stocksBody.innerHTML = ''; // Clear existing data

            data.forEach(stock => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${stock.symbol}</td>
                    <td>$${stock.opening_price.toFixed(2)}</td>
                    <td>$${stock.current_price.toFixed(2)}</td>
                    <td>$${stock.profit.toFixed(2)}</td>
                    <td>${stock.last_updated}</td>
                `;
                stocksBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching stock data:', error));
}

// Initial fetch and set interval for updates
fetchStockData();
setInterval(fetchStockData, 10000); // Update every 10 seconds
