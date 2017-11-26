<?php

$apiUrl = 'https://api.coinbase.com/v2/prices/GBP/spot';

function callApi($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return json_decode($result);
}

$response = callApi('GET', $apiUrl);

$coins = [];
foreach ($response->data as $coin) {
    $coins[$coin->base] = (float) $coin->amount;
}

header('Content-Type: application/json');
echo json_encode($coins);