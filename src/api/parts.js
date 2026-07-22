import api from "./axios";

export const getParts = () => {
    return api.get("parts/");
};

export const getPart = (id) => {
    return api.get(`parts/${id}/`);
};