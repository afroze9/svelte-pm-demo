import axios from "axios";
import { get } from "svelte/store";
import { auth0Client } from "../store";
import ApiHelpers, { type ErrorResponse } from "./ApiHelpers";

export type CreateTodoItemRequest = {
  title: string;
  description: string;
  assignedTo?: string;
}

export type TodoItem = {
  id: number;
  title: string;
  description: string;
  assignedToId: string;
  isCompleted: boolean;
}

export type UpdateTodoItemModel = {
  markComplete: boolean;
  assignedToId: string;
}

async function createTask(projectId: number, todo: CreateTodoItemRequest): Promise<TodoItem | ErrorResponse> {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl(`/project/${projectId}/todo`);
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.post<TodoItem>(url, todo, config);
    return response.data;
  } catch (e) {
    return {
      message: (e as any).toString()
    };
  }
}

async function updateTodo(id: number, todo: UpdateTodoItemModel): Promise<TodoItem | ErrorResponse> {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl(`/todo/${id}`);
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await await axios.put<TodoItem>(url, todo, config);
    return response.data;
  } catch (e) {
    return {
      message: (e as any).toString()
    };
  }
}

const taskApi = {
  createTask,
  updateTodo
}

export default taskApi;