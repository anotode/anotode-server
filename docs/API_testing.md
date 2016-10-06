So to test our API we use **POSTMAN**

Now that our Anotode server is ready with basic functionalities:	
1. Creating a User
2. login 
3. saving data. 
4. Viewing our data


### Creating a user:

send a `POST` request to `http://anotode.herokuapp.com/api/users/`

with parameters
-  email: <your email>
- password:<your password>


### Login 

Send a `POST` request to `http://anotode.herokuapp.com/api/login/` with your login credentials

![alt tag](https://raw.githubusercontent.com/boddu-manohar/anotode-server/tree/master/docs/git/1.png)
then you will receive a token. Copy that token.

![alt tag](https://raw.githubusercontent.com/boddu-manohar/anotode-server/tree/master/docs/git/2.png)

### Sending  your highlights to DB.

send a `POST` request to `http://anotode.herokuapp.com/api/highlights?token=<yourtoken>` and body with your **text** and **title** and **tags** as parametres

![alt tag](https://raw.githubusercontent.com/boddu-manohar/anotode-server/tree/master/docs/git/3.png)
#### To get list of all your data. 

send a `GET` request to `http://anotode.herokuapp.com/api/highlights?token=<yourtoken>`  

![alt tag](https://raw.githubusercontent.com/boddu-manohar/anotode-server/tree/master/docs/git/4.png)
