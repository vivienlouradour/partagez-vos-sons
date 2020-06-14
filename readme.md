# Partagez vos sons

## Goal

Get all posts from a Facebook Group.  
Use mongodb as data storage.  

## Deployment

Use docker-compose to deploy the stack : 
- clone the repo : `git clone https://github.com/vivienlouradour/partagez-vos-sons`
- Create a `.env` file using the `.env.example` template 
- Create a `.env` file in `webapp` folder using the `.env.development` template
- Run the stack : `docker-compose up (--build)`  

## API routes 

### List posts

`apiUrl/posts`  

#### Request params 

- `limit`: number of posts returned (between 5 and 50)
- `page`: page number (for pagination)
- `message`: filter posts returned by message
Example :  
`apiUrl/posts?limit=15&page=1&message=clip` : will return the first page of a maximum of 15 posts containing 'clip' in message field  

### Get single post by ID

`apiUrl/posts/:postId`

Example : 
̀`apiUrl/posts/1231321354_65487878`

### Get total amout of posts

`/posts/count`

### Scroll new facebook posts

`curl -X POST -H "Content-Type:application/json" http://localhost:8080/admin/scrollnewposts -d '{"auth_token":"API_ADMIN_TOKEN_HERE"}'`