import { dynamoDBClient } from "src/model";
import TodoService from "./service";

const todoService = new TodoService(dynamoDBClient());
export default todoService;