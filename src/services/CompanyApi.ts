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

export type CompanyRequest = {
  name: string;
  tags: string[];
}

export type UpdateCompanyRequest = {
  id: number;
  name: string;
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
    return {
      message: (e as any).toString()
    };
  }
}

async function createCompany(company: CompanyRequest) {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl(`/company`);
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.post<CompanyResponse>(url, company, config);
    return response.data;
  } catch (e) {
    return {
      message: (e as any).toString()
    };
  }
}

async function updateCompany(id: number, company: UpdateCompanyRequest) {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl(`/company/${id}`);
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.put<CompanyResponse>(url, company, config);
    return response.data;
  } catch (e) {
    return {
      message: (e as any).toString()
    };
  }
}

async function deleteCompany(id: number) {
  try {
    const token = await get(auth0Client).getTokenSilently();
    const url = ApiHelpers.getUrl(`/company/${id}`);
    const config = ApiHelpers.getAxiosConfig(token);
    const response = await axios.delete<CompanyResponse>(url, config);
    return response.data;
  } catch (e) {
    return {
      message: (e as any).toString()
    };
  }
}

const companyApi = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
}

export default companyApi;