<?php
header('Content-Type: application/json');
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Invalid request"]);
    exit;
}

$action = $_POST['action'] ?? '';

if ($action === 'enquiry') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if ($name === '' || $email === '' || $message === '') {
        echo json_encode(["error" => "All fields required"]);
        exit;
    }

    $stmt = $conn->prepare(
        "INSERT INTO enquiries (name, email, message) VALUES (?, ?, ?)"
    );
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Insert failed"]);
    }
    exit;
}

echo json_encode(["error" => "Unknown action"]);  
 