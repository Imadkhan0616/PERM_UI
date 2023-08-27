import axios from "axios";

const notAuthorizedURL = ['login', 'applicationparam'];
const baseUrl = 'http://localhost:5000/api';

export const getAsync = async (url, requestHeaders) => {

    let headers = mergeHeaders(requestHeaders, url);

    const response = await axios.get(`${baseUrl}/${url}`, { headers });

    return response.data;
};

export const postAsync = async (url, requestBody, requestHeaders = null) => {

    let headers = mergeHeaders(requestHeaders, url);

    const response = await axios.post(`${baseUrl}/${url}`, requestBody, { headers });

    return response.data;
}

export const putAsync = async (url, requestBody, requestHeaders = null) => {

    let headers = mergeHeaders(requestHeaders, url);

    const response = await axios.put(`${baseUrl}/${url}`, requestBody, { headers });

    return response.data;
}

export const deleteAsync = async (url, requestBody, requestHeaders = null) => {

    let headers = mergeHeaders(requestHeaders, url);

    const data = requestBody;

    const response = await axios.delete(`${baseUrl}/${url}`, {
        headers,
        data,
    });

    return response.data;
}

function mergeHeaders(requestHeaders, url) {
    let headers = {};

    if (notAuthorizedURL.includes(url.toLowerCase())) {
        const tenantHeader = { 'TenantID': localStorage.getItem('tenantID') };
        headers = {
            ...tenantHeader
        }
    }
    else {
        const authorizationHeader = { 'Authorization': localStorage.getItem('token') };
        headers = {
            ...authorizationHeader
        }
    }

    return { ...requestHeaders, ...headers };
}