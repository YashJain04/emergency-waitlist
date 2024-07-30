<?php
header('Content-Type: text/html');

// Establish the connection
$connection = pg_connect("host=localhost port=5432 dbname=hospitalTriage user=postgres password=root");

if (!$connection) {
    echo json_encode(array('success' => false, 'message' => 'Connection failed.'));
    exit();
}

// Handle patient removal
if (isset($_POST['removeFirstPatient'])) {
    $patientQuery = "SELECT id FROM users ORDER BY id LIMIT 1";
    $patientResult = pg_query($connection, $patientQuery);

    if ($patientResult && pg_num_rows($patientResult) > 0) {
        $patient = pg_fetch_assoc($patientResult);
        $patientId = $patient['id'];

        $deleteQuery = "DELETE FROM users WHERE id = $1";
        $deleteResult = pg_query_params($connection, $deleteQuery, array($patientId));

        if ($deleteResult) {
            echo json_encode(array('success' => true, 'message' => 'First patient removed successfully.', 'patientId' => $patientId));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Error removing patient.'));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'No patients to remove.'));
    }

    pg_close($connection);
    exit();
}

// Handle table fetch request
if (isset($_POST['fetchTable'])) {
    fetchTableData($connection);
    exit();
}

// Check if POST data is set for login
if (isset($_POST['adminName']) && isset($_POST['adminPassword'])) {
    $adminName = $_POST['adminName'];
    $adminPassword = $_POST['adminPassword'];

    // SQL query to check credentials
    $sql = "SELECT * FROM admins WHERE name = $1 AND password = $2";
    $result = pg_query_params($connection, $sql, array($adminName, $adminPassword));

    if ($result) {
        if (pg_num_rows($result) > 0) {
            fetchTableData($connection);
        } else {
            echo 'Invalid credentials.';
        }
    } else {
        echo 'Error in SQL query.';
    }
} else {
    echo 'Invalid request.';
}

// Fetch table data function
function fetchTableData($connection) {
    // Fetch all data from users table
    $userQuery = "SELECT * FROM users";
    $userResult = pg_query($connection, $userQuery);

    if ($userResult) {
        echo '<table border="1">';
        echo '<tr><th>ID</th><th>Name</th><th>Code</th><th>Severity</th><th>Injury</th><th>Wait Time</th></tr>';

        while ($row = pg_fetch_assoc($userResult)) {
            echo '<tr id="patient-' . $row['id'] . '">';
            echo '<td>' . $row['id'] . '</td>';
            echo '<td>' . $row['name'] . '</td>';
            echo '<td>' . $row['code'] . '</td>';
            echo '<td>' . $row['severity'] . '</td>';
            echo '<td>' . $row['injury'] . '</td>';
            echo '<td>' . $row['wait_time'] . '</td>';
            echo '</tr>';
        }

        echo '</table>';

        // Add REMOVE and HOME buttons
        echo '<div class="button-container button-special">';
        echo '<button class="general-button" onclick="removeFirstPatient()">HELP</button>';
        echo '<button class="general-button" onclick="returnToHome()">HOME</button>';
        echo '</div>';
    } else {
        echo 'Error retrieving user data.';
    }
}

// Close the connection
pg_close($connection);
?>
