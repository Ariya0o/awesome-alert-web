import service from "../utils/request";

export const getDataSource = () => {
    const url = `/v1/datasource/list`;
    return service.get(url);
};