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
$returningUserName = $_POST['returningUserName'];
$returningUserCode = $_POST['returningUserCode'];

// Check if the user exists
$checkQuery = "SELECT * FROM users WHERE name = $1 AND code = $2";
$checkResult = pg_query_params($connection, $checkQuery, array($returningUserName, $returningUserCode));

if (pg_num_rows($checkResult) > 0) {
    // User exists, get the current wait-time for the user
    $userRow = pg_fetch_assoc($checkResult);
    $currentWaitTime = $userRow['wait_time'];
    
    echo json_encode(array('success' => true, 'message' => 'User signed in successfully.', 'currentWaitTime' => $currentWaitTime));
} else {
    // User does not exist
    echo json_encode(array('success' => false, 'message' => 'User does not exist.'));
}

// Close the connection
pg_close($connection);
?>