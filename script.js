async function updateDashboard() {
    const container = document.getElementById('visualizer');
    
    try {
        // Fetches Top 10 coins by Market Cap
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
        const data = await response.json();
        
        container.innerHTML = ''; 

        data.forEach(coin => {
            const change = coin.price_change_percentage_24h.toFixed(2);
            const isUp = change >= 0;

            const card = document.createElement('div');
            card.className = 'coin-card';
            card.innerHTML = `
                <img src="${coin.image}" style="width:40px; margin-bottom:10px;">
                <div class="symbol">${coin.symbol.toUpperCase()}</div>
                <div class="price">$${coin.current_price.toLocaleString()}</div>
                <div class="change ${isUp ? 'up' : 'down'}">
                    ${isUp ? '▲' : '▼'} ${Math.abs(change)}%
                </div>
                <div class="cap">Cap: $${(coin.market_cap / 1e9).toFixed(1)}B</div>
            `;
            container.appendChild(card);
        });
        
    } catch (err) {
        container.innerHTML = `<div class="error">DATA STREAM INTERRUPTED. RECONNECTING...</div>`;
    }
}
updateDashboard();