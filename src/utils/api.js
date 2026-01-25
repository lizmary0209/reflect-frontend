const BASE_URL = "http://127.0.0.1:3001";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
};

const getHeaders = () => {
    const token = localStorage.getItem("jwt");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

export const getEntries = () => {
    return fetch(`${BASE_URL}/entries`, {
        headers: getHeaders(),
    }).then(checkResponse);
};

export const createEntry = (data) => {
    return fetch(`${BASE_URL}/entries`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    }).then(checkResponse);
};

export const getTodayQuote = () => {
    return fetch(`${BASE_URL}/quote/today`).then(checkResponse);
};