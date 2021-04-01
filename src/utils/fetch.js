import {
    getPath
} from "./query";

const parseResponse = async (response) => {
    return await response.json()
};

export const getPlayers = async (params) => {
    return await client("api/players", params || {});
};

export const getTrainings = async (params) => {
    return await client("api/trainings", params || {});
};

export const client = async (path, {
    token,
    body,
    filter,
    expand,
    sort,
    top,
    ...customConfig
}) => {
    let url = getPath(path, {
        filter,
        expand,
        sort,
        top
    });

    const config = {
        method: body ? "POST" : "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        ...customConfig
    };

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        let response = await fetch(url, config);
        return await parseResponse(response);
    } catch (error) {
        throw new Error("Fetch failed");
    }
};