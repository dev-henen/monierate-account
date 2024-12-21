export function basicAuth(method: string, body: any) {

    const request: any = {
        headers: {
            "Content-Type": "application/json",
        },
        method: method,
    }
    if (body.user_token) {
        request.headers['user_token'] = `${body.user_token}`;
        delete body.user_token;
    }

    if (method != 'GET') {
        request.body = JSON.stringify(body);
    }

    return request;
}

export function getAccountEndpoint(endpoint: string) {
    let apiUrl = 'https://monierate-account-api.onrender.com/core';

    return `${apiUrl}${endpoint}`;
}