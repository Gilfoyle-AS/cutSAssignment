# **Cutshort backend assignment**

# File details
1. Run server.js file with nodemon (using nodemon.json to emulate environment variables)
2. cutshort.postman_collection.json has postman collection of all the requests
3. use /login route to get authentication token and send Authentication: Bearer {token} key value pair in the headers of all subsequent requests (protected routes)

## **Objective of the assignment**

Build a social media app with todo lists.

## **The deliverables**

1.  User can sign up and login using JWT token - /user , /login
    
2.  User can create multiple Todos and manage them (Delete, Edit, Mark as Complete) - /todo, /todo/:id
    
3.  User can create posts
    

	a.  Posts will accept only text - /post/:id, /posts
    
	b.  Posts can have one or multiple comments
    

4.  User can query other users and view their details
    
	a.  They can comment on other users’ posts
    
	b.  They can ONLY view other users’ todos
    

