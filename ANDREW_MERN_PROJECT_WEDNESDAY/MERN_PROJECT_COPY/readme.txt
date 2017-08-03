//READ.me

Steps:
npm install.

1. app.js express server:
PORT is 8084.
database is at localhost/projectdb.

2. karma. 
./node_modules/.bin/karma start karma.config.js
or npm test
...

------

Notes: 

Completed:
- Functionality to add a new bug. This updates the list automatically on the page without reload.
- Functionality to edit a bug on the edit page. 
- High priority bugs have a alarm image. This is automatically detected. 
- Some input validation is implemented in the mongoose Schema, via enums. 

Still to do:
- Actions do not render properly on main page, but render correctly on the edit page.
- No sort functionality yet.
- Delete bug button.
- general css. 
- testing

