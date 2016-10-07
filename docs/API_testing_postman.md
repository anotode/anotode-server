So to test our API we use **POSTMAN**

Now that our Anotode server is ready with basic functionalities:

 1. Creating a User
 2. login 
 3. saving data. 
 4. Viewing our data


### Creating a user:

send a `POST` request to `http://anotode.herokuapp.com/api/users/`

with parameters
-  email: 
- password:

![alt tag](https://cloud.githubusercontent.com/assets/9148277/19167683/71b557a6-8c2a-11e6-9f27-6584e8e373c0.gif)

<br><br>

### Login: 

Send a `POST` request to `http://anotode.herokuapp.com/api/login/` with your login credentials

then you will receive a token. Copy that token.


![alt tag](https://cloud.githubusercontent.com/assets/9148277/19167761/b5cbd94c-8c2a-11e6-918d-e553d1b3ac3e.gif)

<br><br>

### Sending  your highlights to DataBase:

send a `POST` request to `http://anotode.herokuapp.com/api/highlights?token=<yourtoken>` 

and body with your **text** and **title** and **tags** as parametres.

![alt tag](https://cloud.githubusercontent.com/assets/9148277/19167791/d34fa32c-8c2a-11e6-92d5-6801c4a1d8e8.gif)

<br><br>

### To get list of all your data: 

send a `GET` request to `http://anotode.herokuapp.com/api/highlights?token=<yourtoken>`  

![alt tag](https://cloud.githubusercontent.com/assets/9148277/19167793/d5538a30-8c2a-11e6-8fc7-a6fe0c1e3128.gif)

<br><br>

[Here](https://drive.google.com/open?id=0B92d-PQYTSLwV2xscFc1YmUzWjQ) is the collection of requests to test the API. You can import them directly to Postman and start testing.  
