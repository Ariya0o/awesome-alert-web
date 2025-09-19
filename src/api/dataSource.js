import service from "../utils/request";

export const getDataSource = () => {
    const url = `/v1/datasource/list`;
    return service.get(url);
};

export const testDataSource = (data) => {
    const url = `/v1/datasource/test`;
    return service.post(url, data);
};
