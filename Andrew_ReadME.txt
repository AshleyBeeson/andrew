//READ.me

-----------------------------------

Steps:

Setup: -----------
1. Go to https://nodejs.org/en/ and download the latest version of Node.
2. Download and install mongodb from: 
https://www.mongodb.com/download-center#community
(Community Server). 
- Install Mongo to the C:/ drive

3. Mongo database setup! 
- In the command prompt, cd to C://. 
- Required json file is in MERN_PROJECT folder called 'bugImport.json'.
Run this command to import to mongo database:
C:/mongodb/bin/mongoimport.exe --database projectdb --collection bugs --file 'path-to-bugImport.json' --jsonArray
For example: C:\>mongodb\bin\mongoimport.exe -d projectdb -c bugs "C:\Users\Administrator\My Documents\MERN_PROJECT\bugImport.json" --jsonArray
-bugImport.json is stored in 'MERN_PROJECT' folder!!!
- otherwise, use Robo3T to manually copy and paste it into a database called 'projectdb', within a collection called 'bugs'.


4. Starting the website
- Using Node.js cmd prompt. go to the MERN_PROJECT folder.
- Type: "npm install" to install the node_modules.
- After the node_modules are installed: within "MERN_PROJECT" type:
- 'webpack' and 'npm start' to start the express server and build the website!

5. Go to localhost:8084/Bugtracker in your browser and the site will appear.


Notes:
- The database location is defined in the app.js file: 
find this line: 
"mongoose.connect("mongodb://localhost/projectdb");"

- app.js is the Express server setup:
- PORT is 8084 currently

- jasmine/karma tests (see selenium tests. there are very few jasmine tests). 
./node_modules/.bin/karma start karma.config.js
or npm test

-------Testing with Selenium--------
- Open Eclipse. 
- In 'AndrewJAVA' > 'src' > 'mern_selenium'. Import this package folder into eclipse
- In your java project, import the require external jar files found in 'selenium_jar_files' folder. Import all the files!
Do this by right clicking on your Java project. clicking properties. Going to the 'Java Build Path' then 'Libraries' tab. Then click 'Add External JARS...'! >> apply and close.
- Run the tests!

Currently, the tests:
1. checks if bug cards expand, and edit page exists.
2. creates a new bug with the form and checks it was created on the page. 

---------------------------------------
------------Tools Used------------------

Website runs in ReactJS, hosted on an Express server in Node, which loads data via a RestAPI connected to MongoDB via Mongoose. 

Mongoose provides a schema based solution to validate and model the mongoDB documents around. I have basic type and enum validation here.

The MongoDB database is queried via http requests through the RestAPI. These requests are defined in the 'routes' folder, in api.js, where the GET/POST/PUT/DELETE actions are defined. This means that different HTTP requests can be customised to query the data however one would like. 

The website was built using the Flux design pattern of one way data flow. Flux was used as it provides a highly convinient was to store the data in a defined place (the 'Store'). This means, onloading of the website, the store queries the RestAPI to pull the data from MongoDB into the Store. When actions are triggered by the 'View', these can again query the RestAPI at the store if required.

Testing was attempted via Jasmine/karma initially, however this was abandoned for the Selenium webdriver coded in Java. As data needs to be loaded asynchronously from the API, delays would have to be implemented aswell in the tests.

------------------------------
------------------------------

On the Website functionality: 
- Generating the list of bugs: 
The bugs are generated as a list from data called via the API. Each bug is contained in its own 'card', which can be expanded for more details.
Actions are located in the expandable view, however, for improvement, I would have also put the actions in a 'swipeable' box, rather than displaying all the actions at once, as this is bad where a bug has more than a few actions.

- A red 'siren' icon is auto generated for bugs of 'HIGH PRIORITY = true', and blank for those false. 
- green, orange and red icons are automatically generated for bug with 'low/medium/high' severity rating. 
- On the right-most panel of the bug card, the date displayed was parsed into a easily readable date string, exluding the time. this is because the Mongoose schema I created required a 'Date' type, which looks something like '2017-03-07T11:38:00.000Z' before parsing. 
- There also exists an edit and delete (bin icon) button.

-Creating a bug:
- At the top of the page, '[Track A Bug!]' is clickable which displays the hidden create bug form.
The ID is automatically generated, via incrementing +1, to the number of bugs which exists. 
- The issueID field has very basic format validation, handled in the store, where the string must contain 'INPUT' or 'BUG'. To improve, I would have also furthered the validation via mongoose, or regex in the view.
- The date input is auto-filled with the current date/time. 

-Once the bug has been successfully submitted, it is auto updated within the React view (after a second or two due to the api speed and timeout delays). 

-----Editing a bug:
- when the edit button is clicked on the bug card; the view changes to the edit page. 
- The reason they are all text boxes is because I auto generated each box via a loop. This was initially for convinience, as there are many fields. However, in hind sight, using radio-buttons/checkboxes and dropdowns would be much better for the user, and also remove the need for unneeded and complicated validation logic. Thus, the issueId string is validated in the view here, where an error messages appears if the string != contain 'BUG' or 'ISSUE'. The rests handled via the mongoose schema.
-The actions are non-editable. There is currently no ADD or EDIT Action option. 
-Once submitted, it sends a PUT request which updates the selected bug.

-Sorting/filtering the Bug list:
- the 'HP'(high priority) column header is clickable. upon clicking, it changes color and shows only the 'high priority' bugs. 
- the 'severity' column header is clickable. upon clicking, it cycles through green/orange/red/off to display only the 'low/medium/high/all' priorities. 

-The issue column header has a clickable 'bug' and 'paper' icon, which enlarges upon selection. These again, display only those selected.

-The search box is case insensitive. it searches the summaries and updates on keystroke.

-currently, the filters do not co-operate well toghether, overriding one another upon their selection.
however, if one searches via the searchbox, then clicks sort button, this will sort the options provided by the search box. 

-------Deleting a bug.
- Bugs can be deleted by the 'bin' icon, which updates the list upon deletion after being processed.
- this is processed via a 'DELETE' request via the RestAPI to the mongodb.






