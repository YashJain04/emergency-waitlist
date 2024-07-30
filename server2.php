<?php
header('Content-Type: application/json');

// Suppress any warnings or errors
error_reporting(0);
ini_set('display_errors', 0);

// Establish the connection
$connection = pg_connect("host=localhost port=5432 dbname=hospitalTriage user=postgres password=root");

if (!$connection) {
    echo json_encode(array('success' => false, 'message' => 'Connection failed.'));
    exit();
}

// Get the data from the request
$newUserName = $_POST['newUserName'];
$newUserCode = $_POST['newUserCode'];
$newUserSeverity = $_POST['newUserSeverity'];
$newUserInjury = $_POST['newUserInjury'];

// Check if the user code already exists
$checkQuery = "SELECT * FROM users WHERE code = $1";
$checkResult = pg_query_params($connection, $checkQuery, array($newUserCode));

if (pg_num_rows($checkResult) > 0) {
    echo json_encode(array('success' => false, 'message' => 'User code already exists.'));
} else {
    // Insert the data into the users table
    $query = "INSERT INTO users (name, code, severity, injury) VALUES ($1, $2, $3, $4)";
    $result = pg_query_params($connection, $query, array($newUserName, $newUserCode, $newUserSeverity, $newUserInjury));

    if ($result) {
        echo json_encode(array('success' => true, 'message' => 'User registered successfully.'));
    } else {
        $error = pg_last_error($connection);
        echo json_encode(array('success' => false, 'message' => 'User registration failed. Code should only contain letters.'));
    }
}

// Close the connection
pg_close($connection);
?>
