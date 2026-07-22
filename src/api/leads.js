import api from "./axios";

export const createLead = (leadData) => {
    return api.post("leads/", leadData);
};