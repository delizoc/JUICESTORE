# JUICESTORE
To be used with SQL database
1. Ensure database path is connected. Copy all 'ProjectDDQ.sql' and add into new db.
2. within terminal in project folder 'npm start'
3. Within /public/index.js -> update server as needed and port. ex: 'flip3' '6333'
    NOTE: Whichever flip you are logged into will be the server (flip1, flip2, flip3)
4. If updated in step 3, navigate to index.js and upated port (line 10) to step 3 port #.\
5. Open a search enginge and go to http://{server}.engr.oregonstate.edu:{port}/ (use server and port form step 3)
6. Enjoy! all CRUD functionality should be working. If 404 error, db is no longer connected.
