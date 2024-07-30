// Check if the 'signInButton' element exists before adding an event listener
var signInButton = document.getElementById('signInButton');
if (signInButton) {
    signInButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevents form from submitting normally
        
        var adminName = document.getElementById('adminName').value;
        var adminPassword = document.getElementById('adminPassword').value;
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'server.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var responseText = xhr.responseText;
                
                // Check if login was successful
                if (responseText.includes('<table')) {
                    alert('Login Successful.');

                    // Hide the login form
                    document.getElementById('adminForm').style.display = 'none';
                    
                    // Show the result table
                    var resultContainer = document.getElementById('resultContainer');
                    resultContainer.innerHTML = responseText;
                } else {
                    // Display error message if login failed
                    alert('Invalid credentials.');
                }
            }
        };
        
        var params = 'adminName=' + encodeURIComponent(adminName) + '&adminPassword=' + encodeURIComponent(adminPassword);
        xhr.send(params);
    });
}

// Check if the 'userSignUpButton' element exists before adding an event listener
var userSignUpButton = document.getElementById('userSignUpButton');
if (userSignUpButton) {
    userSignUpButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevents form from submitting normally
        
        var newUserName = document.getElementById('newUserName').value;
        var newUserCode = document.getElementById('newUserCode').value;
        var newUserSeverity = document.getElementById("newUserSeverity").value;
        var newUserInjury = document.getElementById("newUserInjury").value;
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'server2.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var responseText = xhr.responseText;
                console.log(responseText);
                
                try {
                    var response = JSON.parse(responseText);
                    if (response.success) {
                        alert('Sign Up Successful.');
                    } else {
                        // Display error message if sign up failed
                        alert('Error signing up: ' + response.message);
                    }
                } catch (e) {
                    alert('Error processing the server response.');
                }
            }
        };
        
        var params = 'newUserName=' + encodeURIComponent(newUserName) + '&newUserCode=' + encodeURIComponent(newUserCode) + '&newUserSeverity=' + encodeURIComponent(newUserSeverity) + '&newUserInjury=' + encodeURIComponent(newUserInjury);
        xhr.send(params);
    });
}

var userSignInButton = document.getElementById('userSignInButton');
if (userSignInButton) {
    userSignInButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevents form from submitting normally
        
        var returningUserName = document.getElementById('returningUserName').value;
        var returningUserCode = document.getElementById('returningUserCode').value;
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'server3.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var responseText = xhr.responseText;
                console.log(responseText);
                
                var response = JSON.parse(responseText);
                if (response.success) {
                    // Hide the sign-in form using the .hidden class
                    document.getElementById('returningUserForm').classList.add('hidden');
                    
                    // Display the wait time in an h1 element
                    var waitTimeContainer = document.getElementById('waitTimeContainer');
                    var waitTimeMessage = document.createElement('h1');
                    waitTimeMessage.className = 'center-align'; // Add class to the h1 element
                    waitTimeMessage.textContent = 'Current Wait Time: ' + response.currentWaitTime;
                    waitTimeContainer.appendChild(waitTimeMessage);
                } else {
                    // Display error message if sign in failed
                    alert('Error signing in: ' + response.message);
                }
            }
        };
        
        var params = 'returningUserName=' + encodeURIComponent(returningUserName) + '&returningUserCode=' + encodeURIComponent(returningUserCode);
        xhr.send(params);
    });
}

// Other functions can remain the same
function showUserPage() {
    window.location.href = 'usersPage.html';
}

function showAdminPage() {
    window.location.href = 'adminPage.html';
}

function showNewUserForm() {
    document.getElementById('newUserForm').classList.remove('hidden');
    document.getElementById('returningUserForm').classList.add('hidden');
}

function showReturningUserForm() {
    document.getElementById('returningUserForm').classList.remove('hidden');
    document.getElementById('newUserForm').classList.add('hidden');
}

function returnToHome() {
    window.location.href = 'index.html';
}

function removeFirstPatient() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert('Patient helped successfully!');
                // Refresh the table content
                fetchUpdatedTable();
            } else {
                alert('Error helping patient: ' + response.message);
            }
        }
    };
    
    var params = 'removeFirstPatient=true';
    xhr.send(params);
}

function fetchUpdatedTable() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var responseText = xhr.responseText;
            if (responseText.includes('<table')) {
                // Update the table content
                var resultContainer = document.getElementById('resultContainer');
                resultContainer.innerHTML = responseText;
            } else {
                alert('Error fetching updated table.');
            }
        }
    };
    
    var params = 'fetchTable=true';
    xhr.send(params);
}
