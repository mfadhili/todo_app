Initialize a new serverless project
`serverless create --template aws-nodejs-typescript --path todo1`

Delete `Hello` function folder

install packages 
`npm install`

install `uuid` 

`npm install uuid --save `


## Configure our project

create folder 
- *src/Models* for defining our schema and commecting to our database
- *src/Service* our business handler functions
- *src/functions/todo* our functions

`mkdir src/model src/Service src/functions/todo `

## Connect to DynamoDB

create index.ts in src/model 

## Create our Model

create a model Todo.ts in the src/model

## Create our services 

create the service  file servie.ts in src/services followed by index.ts to export an instance of the TodoService

## Create Lambda Functions
create handler.ts file in /src/functions/todo
import APIGatewayProxy event and result and formatJSONResponse to return JSON-formated response to client side
