import HYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./config";

const hyRequest = new HYRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})


// export const hyRequest2 = new HYRequest({
//     baseURL: 'http://codercba.com:1888/airbnb/api',
//     timeout: 8000,
//     interceptors: {
//         requestSuccessFn(config) {
//             console.log('单次请求成功');
//             return config
//         },
//         requestFailureFn(err) {
//             console.log('单次请求失败');
//         },
//         responseSuccessFn(res) {
//             console.log('单次响应成功');
//             return res
//         },
//         responseFailtureFn(err) {
//             console.log(err);
//         }
//     }
// })

export default hyRequest
