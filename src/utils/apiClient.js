const apiURL = process.env.BEON_API_URL;
const apiToken = process.env.EXTERNAL_API_KEY;

export async function client(endpoint, { data, token, headers: customHeaders, ...customConfig } = {}) {
    const config = {
        method: 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            'Content-type': data ? 'application/json' : undefined,
            'x-api-token': apiToken || '',
            ...customHeaders,
        },
        ...customConfig,
    };

    const url = apiURL + '/' + endpoint;

    return fetch(url, config).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
}
