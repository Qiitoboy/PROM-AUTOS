import api from "./axios";


export const getCars = () => {
    return api.get("cars/");
};


export const getNewCars = () => {
    return api.get("cars/?condition=new");
};


export const getUsedCars = () => {
    return api.get("cars/?condition=used");
};


export const getCar = (id) => {
    return api.get(`cars/${id}/`);
};