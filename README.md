# Sem2-appointment-finder
-simple javascript - html - php -based  website
--
-displays given appointments and their possible timeslots
--
-users can vote for a time and must leave their name/can leave a comment
--
-appointments expire, after expiry, voting is disabled
--

# structure:
-frontend:
--
--pages ->html (termine, navbar)\n
--scripts ->javascript/jquery (fetch navbar, appointments, termine, comments + vote, expiry)\n
--style ->css/img (style.css)\n
--index.html ->starting/mainpage\n

-backend:
--
--db ->database information/connection, queries\n
--simpleLogic ->distributes ajax-sent methods to database queries and returns results\n
--models ->models of db tables, store data in objects for readability\n
--requestHandler.php ->direct connection of frontend to backend\n
