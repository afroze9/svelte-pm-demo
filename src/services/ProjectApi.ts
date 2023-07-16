import { get } from 'svelte/store';
import axios from 'axios';
import ApiHelpers, { type ErrorResponse } from './ApiHelpers'
import { auth0Client } from '../store';

export type ProjectResponse = {
  id: number;
  companyId: number;
  name: string;
  todoItems: TodoItem[];
  priority: Priority;
}

export type ProjectSummaryResponseModel = {
  id: number;
  companyId: number;
  name: string;
  taskCount: number;
}

export type UpdateProjectRequest = {
  id: number;
  companyId: number;
  name: string;
  priority: Priority;
}

export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 3,
}

export type TodoItem = {
  id: number;
  title: string;
  description: string;
  assignedToId: string;
  isCompleted: boolean;
}

async function getProjects(): Promise<ProjectResponse[] | ErrorResponse> {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl('/project');
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.get<ProjectResponse[]>(url, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      message: (e as any).toString()
    };
  }
}

async function getProjectById(id: number): Promise<ProjectResponse | ErrorResponse> {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl(`/project/${id}`);
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.get<ProjectResponse>(url, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      message: (e as any).toString()
    };
  }
}

async function updateProject(id: number, company: UpdateProjectRequest): Promise<ProjectResponse | ErrorResponse> {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl(`/project/${id}`);
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.put<ProjectResponse>(url, company, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      message: (e as any).toString()
    };
  }
}

const projectApi = {
  getProjects,
  getProjectById,
  updateProject
}

export default projectApi;