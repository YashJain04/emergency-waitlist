IMPORTANT - If there is trouble running the application please see the submitted video for proof of the application running.

IMPORTANT - Portfolio Resubmission: Please see the resubmitted Portfolio with all the changes suggested by the TA for previous projects. The final project is updated to address all concerns and updated with links to take you to each individual project's GitHub.

Student Details:
Yash Jain - 300245571
Oliver Byl - 300168571

Details Of The Application:
This is our implementation for the Assignment 4 - CSI 3140 Emergency Waitlist Hospital Triage Application.

Technologies Used:
HTML
CSS
JavaScript (With AJAX)
PHP (Server Side Scripting)
Postgres SQL
pgAdmin 4
Apache - Hosting The Server

How To Setup/Run The Application:
1. Make sure Postgres SQL and pgAdmin 4 + Apache for hosting the server (backend) is correctly installed
2. Download the submitted zip file
3. Extract the zip file in the working directory for Apache (usually /var/www/)
4. Start the Apache Server using "apachectl start" in the command terminal
5. Visit http://localhost:8080/emergency-waitlist/index.html and explore the pages
6. Once done, make sure to close the Apache Server using "apachectl stop" in the command terminal

How To Download/Setup Apache (Macbook M1 & M2):
1. Install Apache using Homebrew
brew install apache-httpd

2. Install PHP:
brew install php

3. In case of M1 and M2, find the locate DocumentRoot (folder where to have the directory) by running the command:
brew info httpd
(Most probably it will be /opt/homebrew/var/www)

4. Configure the Apache Server. Go to /opt/homebrew/etc/httpd:
Open file httpd.conf and uncomment »“LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so”

5. Start the server using the command:
apachectl start

6. Stop the server using the command:
apachectl stop

7. Run the application by placing the downloaded zip directory in the DocumentRoot (opt/homebrew/var/www/) and run application using command:
http://localhost:8080/emergency-waitlist/index.html

8. If all works correctly the homepage should be visible

Using The Application:
-> As a user
- On the homagepage select that you are a USER
- Create a new user through sign-up (ensure that the code is UNIQUE and only LETTERS)
- An alert will popup saying that USER SIGNUP is sucessful

- Log into your user through the login button and once correct credentials are entered you can see the current wait-time

Example User Details:

id |   name    | code | severity |                            injury                            | wait_time 

----+-----------+------+----------+--------------------------------------------------------------+-----------

1 | Josh Doe  | AAA  | maximal  | I am feeling some heart pain, headaches, and other symptoms. |         7

2 | John Doe  | BBB  | minor    | I have a slight cough.                                       |        67

3 | Jane Doe  | CCC  | moderate | I have some ear pain.                                        |       127

4 | Janet Doe | DDD  | serious  | I have twisted my ankle.                                     |       171

-> As an admin
- On the homepage select that you are an ADMIN
- Login with the admin details:

Admin Details:

id |    name    | password 

----+------------+-----------

1 | Yash Jain  | 300245571

2 | Oliver Byl | 300168571

3 | root       | root

- Once logged in admins can see the entire queue of patients and help (remove) them as necessary
- Watch the queue times get updated upon helping patients

Other Details:
- The queue is updated as a patient is helped
- The queue is based on a wait_time generated by the severity, see the criteria below
- The wait_time is added from all users with a lower id to get the wait time for a specific user

The wait_time is created through the hospital system automatically in the backend database. It will use the following criteria by adding these amount of minutes to the current wait time to get how long the user will have to wait:

-> Criteria
minor: 60-70 minutes
moderate: 50-60 minutes
serious: 40-50 minutes
severe: 30-40 minutes
critical: 20-30 minutes
catastrophic: 10-20 minutes
maximal: 0-10 minutes (ideally should wait the lowest amount of time, but if the queue is filled and a patient arrived before them they will still have to wait)

Website States:

Homepage [Homepage](https://github.com/YashJain04/emergency-waitlist/blob/Main/homepageImage.png?raw=true)

Admin Sign In [Admin Sign In](https://github.com/YashJain04/emergency-waitlist/blob/Main/adminSignInImage.png?raw=true)

Admin Sees Patients [Admin Checks Patients](https://github.com/YashJain04/emergency-waitlist/blob/Main/patientsListImage.png?raw=true)

New User [New User Image](https://github.com/YashJain04/emergency-waitlist/blob/Main/newUserImage.png?raw=true)

Returning User [Returning User](https://github.com/YashJain04/emergency-waitlist/blob/Main/returningUserImage.png?raw=true)

Example User Wait Time John Doe[Example User Wait Time John Doe](https://github.com/YashJain04/emergency-waitlist/blob/Main/johnDoeWaitTimeExample.png?raw=true)