import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "../model/Todo";

export default class TodoService {
    // Inject DocumentClient into TodosService and create a global variable for our table name
    private Tablename: string = "TodosTable2" ; 

    constructor(private docClient: DocumentClient) {}

    // create getAllTodos method

   async getAllTodos(): Promise<Todo[]> {
    const todos = await this.docClient.scan({
        TableName: this.Tablename
    }).promise()
    return todos.Items as Todo[];
   }

   // createTodo method which will add new to-do list items 

  async createTodo(todo: Todo): Promise<Todo> {
    await this.docClient.put({
        TableName: this.Tablename,
        Item: todo
    }).promise()
    return todo as Todo;
  }

  // getTodo that takes todo Id as and arguement and returns the specific todo

 async getTodo(id:string): Promise<any> {
    const todo = await this.docClient.get({
        TableName:this.Tablename,
        Key: {
            todosId: id
        }
    }).promise()
    
    if (!todo.Item) {
        throw new Error("Id does not exit");
    }
    return todo.Item as Todo;
 }

 // function to update our items in the database
 async updateTodo(id:string, todo: Partial<Todo>): Promise<Todo> {
    const updated = await this. docClient
        .update({
            TableName: this.Tablename,
            Key: {todosId: id},
            UpdateExpression: "set #status = :status",
            ExpressionAttributeNames: {"#status": "status"},
            ExpressionAttributeValues: {"status": true},
            ReturnValues: "ALL_NEW"
        }).promise();
    return updated.Attributes as Todo;
 }

 // deleteTodo method
async deleteTodo(id:string): Promise<any> {
    return await this.docClient.delete({
        TableName: this.Tablename,
        Key: {
            todosId: id
        }
    }).promise()
}

}