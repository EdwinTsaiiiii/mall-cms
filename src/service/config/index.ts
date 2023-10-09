let BASE_URL = "http://121.37.196.89:8880/";

// 区分开发环境和生产环境
// if (import.meta.env.NODE === "development") {
//   BASE_URL = "http://coderwhy.org/dev";
// } else if (import.meta.env.NODE === "production") {
//   BASE_URL = "http://coderwhy.org/prod";
// } else {
//   BASE_URL = "http://coderwhy.org/test";
// }

const TIME_OUT = 10000;
export { BASE_URL, TIME_OUT };
