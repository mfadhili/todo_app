import { APIGatewayAuthorizerResult, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway"; // return JSON format to response client side
import { middyfy } from "@libs/lambda"; // to handle middleware 
import { v4 } from "uuid"; //for generating random strings 
import TodoService from "../../Service/service";
import todoService from "src/Service";
import { eventNames } from "process";

// getAllTodos lambda function. Warped inside middyfy to perform all middleware tasks
export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const todo = await todoService.getAllTodos();
    return formatJSONResponse({
        todo
    })
})


// CreateTodo lab=mbda function listining to APIGatewayProxyEvent to get data in request body
// following that well get title and description form the request body 
export const createTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const todo = await todoService.createTodo({
            todosId: id,
            title: event.body.title,
            description: event.body.description,
            createdAt: new Date().toISOString(),
            status: false
        })
        return formatJSONResponse({
            todo
        });
    }catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        })
    }
})

// getTodo function that uses getTodo resource. obtaining the todoId from the equest parameter using the pathParameters event, we return the todo iten.

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try{
        const todo = await todoService.getTodo(id)
        return formatJSONResponse({todo, id});
    }
    catch(e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

// updateTodo Lambda function

export const updateTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todoService.updateTodo(id, {status: event.body.status })
        return formatJSONResponse({
            todo, id
        });
    }catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        })
    }
})

// Update delete lamba function
export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todoService.deleteTodo(id)
        return formatJSONResponse({
            todo, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})
