<?php

$profiles = require_once realpath(getcwd() . '/../../config/profiles.php');

header('Content-Type: application/json');
echo json_encode($profiles);