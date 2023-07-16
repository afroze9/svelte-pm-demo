export type ErrorResponse = {
  message: string;
};

export type ValidationError = {
  attemptedValue: string;
  customState: string;
  errorCode: string;
  errorMessage: string;
  formattedMessagePlaceholderValues: PropertyError;
  propertyName: string;
  severity: number;
}

export type PropertyError = {
  propertyName: string;
  PropertyValue: string;
}

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

const ApiHelpers = {
  getAxiosConfig,
  getUrl,
  isErrorReponse
}

export default ApiHelpers