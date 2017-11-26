$(document).ready(function() {
    refreshProfilesLoop();
    refreshCoinPricesLoop();
});

var profileData;
var coinData;

function refreshProfilesLoop() {
    refreshProfiles();

    setInterval(function () {
        refreshProfiles();
    }, 300000);
}

function refreshCoinPricesLoop() {
    refreshCoinPrices();

    setInterval(function () {
        refreshCoinPrices();
    }, 60000);
}

function refreshProfiles() {
    $.get('/api/profiles.php', function (profiles) {
        profileData = profiles;
        
        updateName(profiles[1].name, 1);
        updateInvestment(profiles[1].investment, 1);
        updateCoinAmount('BTC', profiles[1].coins.BTC, 1);
        updateCoinAmount('ETH', profiles[1].coins.ETH, 1);
        updateCoinAmount('LTC', profiles[1].coins.LTC, 1);
        calculateProfit(1);
        
        updateName(profiles[2].name, 2);
        updateInvestment(profiles[2].investment, 2);
        updateCoinAmount('BTC', profiles[2].coins.BTC, 2);
        updateCoinAmount('ETH', profiles[2].coins.ETH, 2);
        updateCoinAmount('LTC', profiles[2].coins.LTC, 2);
        calculateProfit(2);
    });
}

function refreshCoinPrices() {
    $.get('/api/prices.php', function (coins) {
        coinData = coins;
        
        updateCoinPrice('BTC', coins.BTC);
        updateCoinPrice('ETH', coins.ETH);
        updateCoinPrice('LTC', coins.LTC);

        calculateProfit(1);
        calculateProfit(2);
    });
}

function calculateProfit(profile) {
    if (typeof profileData === 'undefined'
        || typeof coinData === 'undefined'
    ) {
        return false;
    }

    var investment = profileData[profile].investment;
    var btcAmount = profileData[profile].coins.BTC;
    var ethAmount = profileData[profile].coins.ETH;
    var ltcAmount = profileData[profile].coins.LTC;
    var btcPrice = coinData.BTC;
    var ethPrice = coinData.ETH;
    var ltcPrice = coinData.LTC;

    var btcValue = btcPrice * btcAmount;
    var ethValue = ethPrice * ethAmount;
    var ltcValue = ltcPrice * ltcAmount;
    
    var totalValue = btcValue + ethValue + ltcValue;
    
    var profit = totalValue - investment;
    
    updateProfit(profit, profile);
}

function updateName(name, profile) {
    var element = $('#name-' + profile);
    element.text(name);
}

function updateInvestment(investment, profile) {
    var element = $('#investment-' + profile);
    
    var displayDecimals = false;
    if (investment < 1000) {
        displayDecimals = true;
    }
    
    element.text(formatGbpCurrency(investment, displayDecimals));
}

function updateProfit(profit, profile) {
    var element = $('#profit-' + profile);
    element.removeClass('positive negative');
    
    var sign = '';
    if (profit > 0) {
        sign = '+ ';
        element.addClass('positive');
    } else if (profit < 0) {
        sign = '- ';
        profit = profit * -1;
        element.addClass('negative');
    }

    var displayDecimals = false;
    if (profit < 1000) {
        displayDecimals = true;
    }

    element.text(sign + formatGbpCurrency(profit, displayDecimals));
}

function updateCoinAmount(coinType, amount, profile) {
    var element = $('#' + coinType.toLowerCase() + '-amount-' + profile);
    element.text(formatCryptocurrency(amount, coinType));
}

function updateCoinPrice(coinType, price) {
    var element = $('#' + coinType.toLowerCase() + '-current-price');
    element.text(formatGbpCurrency(price));
}

function formatGbpCurrency(price, decimalPlaces) {
    if (typeof decimalPlaces === 'undefined') {
        decimalPlaces = true;
    }
    
    if (decimalPlaces) {
        minimumFractionDigits = 2;
        maximumFractionDigits = 2;
    } else {
        minimumFractionDigits = 0;
        maximumFractionDigits = 0;
    }

    return '£' + price.toLocaleString('en', {
        'minimumFractionDigits': minimumFractionDigits,
        'maximumFractionDigits': maximumFractionDigits,
    });
}

function formatCryptocurrency(amount, currencyCode) {
    return amount.toLocaleString('en', {
        'minimumFractionDigits': 8,
        'maximumFractionDigits': 8,
    }) + ' ' + currencyCode;
}