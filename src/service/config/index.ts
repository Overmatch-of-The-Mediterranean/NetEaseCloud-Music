// 第一种方式手动切换
// export const BASE_URL = 'http://codercba.com.dev:9002'
// export const BASE_URL = 'http://codercba.com.pro:9002'

export const BASE_URL = 'http://codercba.com:9002'
export const TIME_OUT = 10000

// 第二种方式自动切换

// let BASE_URL
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://codercba.com.dev:9002'
// } else {
//   BASE_URL = 'http://codercba.com.pro:9002'
// }


// 第三种方式：通过配置文件
console.log(process.env.REACT_APP_BASE_URL,1111);



