import axios from 'axios';

const backendUrl = 'https://localhost:5001';

const isValidContentType = (contentType: string | undefined) => {
    if (!contentType) return false;

    return ['application/json', 'text/plain'].some((type) => contentType.includes(type));
};

export const getFromBackend = async (url: string) =>
    axios
        .get(backendUrl + url)
        .then((response) => {
            if (!isValidContentType(response.headers['content-type']))
                throw new Error('Unsupported content type: ' + response.headers['content-type']);

            return response.data;
        })
        .catch((e) => console.error('Failed to fetch GET:', e));

export const postToBackend = async (url: string, data: any) =>
    axios
        .post(backendUrl + url, data)
        .then((response) => {
            if (!isValidContentType(response.headers['content-type']))
                throw new Error('Unsupported content type: ' + response.headers['content-type']);

            return response.data;
        })
        .catch((e) => console.error('Failed to fetch POST:', e));
