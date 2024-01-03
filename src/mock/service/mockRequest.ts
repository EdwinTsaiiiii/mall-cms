import axios from "axios";

const mockRequest = axios.create({
  baseURL: "/mock",
  timeout: 10000
});

export const reqMockDataList = () => mockRequest.get("/datalist");
