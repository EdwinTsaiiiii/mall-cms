// 开发环境：development
// 生产环境：production
// 测试环境：test

const BASE_URL = 'http://152.136.185.210:5000/'
const TIME_OUT = 10000

// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://coderwhy.org/dev'
// } else if (process.env.NODE_ENV === 'production') {
//   BASE_URL = 'http://coderwhy.org/prod'
// } else {
//   BASE_URL = 'http://coderwhy.org/test'
// }

export { BASE_URL, TIME_OUT }
