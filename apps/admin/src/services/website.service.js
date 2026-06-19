import api from "./api";

export const getWebsites = async () => {

    const response = await api.get(
        "/websites"
    );

    return response.data;

};

export const createWebsite = async (website) => {

    const response = await api.post(
        "/websites",
        website
    );

    return response.data;

};
