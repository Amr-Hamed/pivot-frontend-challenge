========================
Pivot Frontend Challenge
========================

#What is this..?
================
*This is the answer to the "Pivot Frontend Challenge" task.

#How to Run..?
==============
*create a new folder in your desired location on your device.
*open the terminal and clone the repo using : 
        $ git clone https://github.com/Amr-Hamed/pivot-frontend-challenge.git
*navigate to the "pivot-frontend-challenge" folder.
*backend configuration: 
    - we need to follow the following steps to create a virtual env for the backend.
        $ sudo apt install python3-pip
        $ pip install virtualenv
        $ virtualenv --python=python3 venv
        $ source venv/bin/activate
    - Now we need to install flask: 
        $ pip install Flask
    - The last thing to do here is to install flask-CORS
        $ pip install flask_cors
    - Now to make sure we got everything right, run the backend server on port 5000 using the command:
        $ python3 api/app.py
*frontend configuration:
    - navigate to "frontend" folder.
    - to install dependancies run the command:
        $ npm install
    - to run the frontend server on port 3000, run the command:
        $ npm start
# Hope you like it :).




