# Python Web Api
REST API for widgets

## Overview
This code was written to store information on widgets in 
a sqlite database. 

## How to run my code:
* Python 3.9 or higher is required to run this code on your machine.
* Open the terminal in the root directory.
* You will need to install the python Tornado package using this command
  __pip install tornado__.
* Type __python ./server.py__ on the commandline to run the code.
* Server should be running on port: 3000
* Download a REST Client like Postman in order to send requests to the REST API server.py.
* Request should be sent in JSON format.
* Example request format for 
  CreateWidgetHandler endpoint. 
  {
    'id': 1,
    'name': 'Widget 1',
    'num_of_parts': 3
  }
