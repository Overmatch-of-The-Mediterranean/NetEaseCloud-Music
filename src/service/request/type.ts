import { AxiosRequestConfig, AxiosResponse } from "axios";


interface HYInterceptors<T = AxiosResponse> { 
    requestSuccessFn?: (config:AxiosRequestConfig) => AxiosRequestConfig,
    requestFailureFn?: (err:any) => any,
    responseSuccessFn?: (res:T) => T,
    responseFailtureFn?: (err:any) => any 
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?:HYInterceptors<T>
 }