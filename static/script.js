async function fetchStockData() {
    const response = await fetch('/api/stocks');
    const stocks = await response.json();
    const stocksBody = document.getElementById('stocks-body');
    stocksBody.innerHTML = ''; // Clear existing data

    stocks.forEach(stock => {
        const row = document.createElement('tr');
        
        const priceChangeClass = stock.current_price > stock.opening_price ? 'text-success' : 'text-danger'; // Class for up/down indicators

        row.innerHTML = `
            <td>${stock.symbol}</td>
            <td>$${stock.opening_price.toFixed(2)}</td>
            <td class="${priceChangeClass}">$${stock.current_price.toFixed(2)}</td>
            <td class="${priceChangeClass}">$${stock.profit.toFixed(2)}</td>
            <td>${stock.last_updated}</td>
        `;
        
        stocksBody.appendChild(row);
    });
}

// Fetch stock data when the page loads
window.onload = fetchStockData;

// Fetch stock data on button click
document.getElementById('fetch-button').addEventListener('click', fetchStockData);
