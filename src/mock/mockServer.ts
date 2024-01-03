import Mock from "mockjs";
// @ts-ignore
import data from "./data/lianjia.json";

Mock.mock("/mock/datalist", { code: 200, data: data });
