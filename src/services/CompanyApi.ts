import { get } from 'svelte/store';
import { auth } from '../auth/authService';
import axios from 'axios';

export type ErrorResponse = {
  message: string;
};

export type CompanySummaryResponseModel = {
  id: number;
  name: string;
  projectCount: number;
  tags: string[];
}

const { auth0Client } = auth;
const baseUrl = 'https://localhost:7068/api/v1';

function getAxiosConfig(token: string) {
  return {
    headers: {
      "content-type": "application/json",
      'Authorization': `bearer ${token}`
    },
  };
}

function getUrl(path: string) {
  return `${baseUrl}${path}`;
}

function isErrorReponse(x: any): x is ErrorResponse {
  return (x as ErrorResponse).message !== undefined;
}

async function getCompanies(): Promise<CompanySummaryResponseModel[] | ErrorResponse> {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = getUrl('/company');
    const config = getAxiosConfig(token);
    const response = await axios.get<CompanySummaryResponseModel[]>(url, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      message: (e as any).toString()
    };
  }
}

const companyApi = {
  getCompanies,
  isErrorReponse
}

export default companyApi;