import { get } from 'svelte/store';
import axios from 'axios';
import ApiHelpers, { type ErrorResponse } from './ApiHelpers'
import { auth0Client } from '../store';
import type { ProjectSummaryResponseModel } from './ProjectApi';

export type CompanySummaryResponseModel = {
  id: number;
  name: string;
  projectCount: number;
  tags: string[];
}

export type CompanyResponse = {
  id: number;
  name: string;
  projects: ProjectSummaryResponseModel[];
  tags: TagResponseModel[];
}

export type TagResponseModel = {
  id: number;
  name: string;
}

async function getCompanies(): Promise<CompanySummaryResponseModel[] | ErrorResponse> {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl('/company');
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.get<CompanySummaryResponseModel[]>(url, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      message: (e as any).toString()
    };
  }
}

async function getCompanyById(id: number): Promise<CompanyResponse | ErrorResponse> {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl(`/company/${id}`);
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.get<CompanyResponse>(url, config);
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
  getCompanyById
}

export default companyApi;