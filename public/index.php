<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Coinstatus</title>
        <script type="text/javascript" src="/js/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="/js/display.js"></script>
        <link rel="stylesheet" type="text/css" href="/build/css/style.css">
    </head>
    <body>
        <div class="profiles">
            <?php for ($profileId = 1; $profileId <= 4; $profileId++): ?>
            <div class="profile">
                <div class="name" id="name-<?=$profileId?>">-</div>
                <div class="profit">
                    <div class="value" id="profit-<?=$profileId?>">-</div>
                    <div class="label">Profit</div>
                </div>
                <div class="investment">
                        <div class="value" id="investment-<?=$profileId?>">-</div>
                        <div class="label">Invested</div>
                </div>
                <div class="assets">
                    <div class="coin btc" id="btc-amount-<?=$profileId?>">-</div>
                    <div class="coin eth" id="eth-amount-<?=$profileId?>">-</div>
                    <div class="coin ltc" id="ltc-amount-<?=$profileId?>">-</div>
                </div>
            </div>
            <?php endfor ?>
        </div>
        <div class="coins">
                <div class="coin btc">
                    <div class="name">Bitcoin (BTC)</div>
                    <div class="current-price" id="btc-current-price">-</div>
                </div>
                <div class="coin eth">
                    <div class="name">Ethereum (ETH)</div>
                    <div class="current-price" id="eth-current-price">-</div>
                </div>
                <div class="coin ltc">
                    <div class="name">Litecoin (LTC)</div>
                    <div class="current-price" id="ltc-current-price">-</div>
                </div>
            </div>
    </body>
</html>

