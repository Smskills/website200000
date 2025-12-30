<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "smskills_db"; // <-- must match phpMyAdmin DB name

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode([
        "error" => "Database connection failed"
    ]));
}
