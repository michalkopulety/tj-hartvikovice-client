import { getPath } from "./query";

const parseResponse = async (response) => {
    return await response.json()
};

export const getPlayers = async (params) => {
    return await client("players", params || {});
};

export const getTrainings = async(params)=> {
    return await client("trainings", params || {});
};

export const client = async (path, {body, filter, expand, sort, ...customConfig}) => {
    let url = getPath(path, {filter, expand, sort});

    const config = {
        method: body ? "POST" : "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        ...customConfig
    };

    if (body) {
        config.body= JSON.stringify(body);
    }
    
    try {
        let response = await fetch(url, config);
        return await parseResponse(response);
    } catch(error) {
        throw new Error("Fetch failed");
    }
};