const BASE_URL = "";

const DEMO_EMAIL = "reviewer@reflect.app";
const DEMO_PASSWORD = "Reflect123!";
const DEMO_TOKEN = "demo-token";

const checkResponse = async (res) => {
    const data = await res.json().catch(() => null);

    if (res.ok) {
        return data;
    }

    const message =
    data?.message ||
    data?.error ||
    `Error: ${res.status}`;

    return Promise.reject(message);
};

const getToken = () => localStorage.getItem("jwt");

export const setToken = (token) => {
    localStorage.setItem("jwt", token);
};

export const clearToken = () => {
    localStorage.removeItem("jwt");
};

const getHeaders = (needsAuth = true) => {
    const headers = {
        "Content-Type": "application/json",
    };

    if (needsAuth) {
        const token = getToken();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    return headers;
};

export const register = ({ name, email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify({ name, email, password }),
    }).then(checkResponse);
};

export const login = ({ email, password }) => {
if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    setToken(DEMO_TOKEN);
    return Promise.resolve({ token: DEMO_TOKEN });
}

    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
};

export const getCurrentUser = () => {
const token = getToken();

if (token === DEMO_TOKEN) {
    return Promise.resolve({
        name: "Reflect Reviewer",
        email: DEMO_EMAIL,
        avatar: "https://i.pravatar.cc/150?img=32",
    });
}

    return fetch(`${BASE_URL}/users/me`, {
        headers: getHeaders(true),
    }).then(checkResponse);
};

export const getEntries = () => {
const token = getToken();

if (token === DEMO_TOKEN) {
    return Promise.resolve([
        {
            _id: "1",
            title: "Welcome to Reflect 🌿",
            body: "This is a demo journal entry for review purposes.",
            mood: "peaceful",
            createdAt: new Date().toISOString(),
        },
    ]);
}

    return fetch(`${BASE_URL}/entries`, {
        headers: getHeaders(true),
    }).then(checkResponse);
};

export const createEntry = (data) => {
    return fetch(`${BASE_URL}/entries`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(data),
    }).then(checkResponse);
};

export const deleteEntry = (id) => {
    return fetch(`${BASE_URL}/entries/${id}`, {
        method: "DELETE",
        headers: getHeaders(true),
    }).then(checkResponse);
};

export const updateEntry = (id, data) => {
    return fetch(`${BASE_URL}/entries/${id}`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify(data),
    }).then(checkResponse);
};

export const getTodayQuote = () => {
const token = getToken();

if (token === DEMO_TOKEN) {
    return Promise.resolve({
        text: "Be still, and know that I am God.",
        author: "Psalm 46:10",
    });
}

    return fetch(`${BASE_URL}/quote/today`).then(checkResponse);
};