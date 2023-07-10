# 网易云项目

## 要点

 1. 二级路由使用懒加载，要在占位<Outlet/>的外层使用Suspense包裹，可以免除整体闪现的效果

    

 2. 通用样式的两种写法

    > 1.直接写class样式
    >
    > 2.使用主题
    >
    > ```typescript
    > const theme = {
    > color: {
    >  primary: '#C20C0C',
    >  ...
    > },
    > size: {},
    > mixin: {
    >  wrapv1: `
    >    width: 1100px;
    >    margin: 0 auto;
    >  `
    > }
    > }
    > 
    > export default theme
    > 
    > ```
    >
    > ```tsx
    > <ThemeProvider theme={theme}>
    >    <App />
    > </ThemeProvider>
    > ```



3.Class编程和TS结合

```react
type Iprops = ... // 声明props的类型
type IState = ... // 声明state的类型
Class demo2 extends PureComponent<Iprops, IState> {
	constructor (props:Iprops){
        this.state = ...
    }
}
   
```



4.webpack中开发环境和生产环境的区分

(1).手动区分

```typescript
export const BASE_URL = 'http://codercba.com.dev:9002'
export const BASE_URL = 'http://codercba.com.pro:9002'
```

(2).自动区分

```typescript
let BASE_URL
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://codercba.com.dev:9002'
} else {
  BASE_URL = 'http://codercba.com.pro:9002'
}
```

(3).在最外层通过配置文件(.env.development 和 .env.production)

```
REACT_APP_BASE_URL=http://codercba.com.dev:9002 //开发
REACT_APP_BASE_URL=http://codercba.com.pro:9002 // 生产
```

```typescript
可在react-app-env.d补充类型声明
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
    readonly REACT_APP_BASE_URL: string
  }
}
```



5.使用TS对Axios进行二次封装

```typescript
// 在index.ts文件中
import axios from "axios";
import type { AxiosInstance } from "axios";
import { HYRequestConfig } from "./type";


/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 * 
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
    instance: AxiosInstance

    constructor(config: HYRequestConfig) {
        this.instance = axios.create(config)
		
        // 全局拦截
        this.instance.interceptors.request.use(config => {
            console.log('全局请求成功');
            return config
        }, err => {
            console.log('全局请求失败');
            return err
        })
        this.instance.interceptors.response.use(res => {
            console.log('全局响应成功');
            return res.data
        }, err => {
            console.log('全局响应失败');
            return err
        })

		// 不同实例拦截	
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn
        )
        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailtureFn
        )

    }

    request<T = any>(config:HYRequestConfig<T>) {
        // 单个请求拦截
        if (config.interceptors?.requestSuccessFn) {
            config = config.interceptors?.requestSuccessFn(config)
        }

        return new Promise<T>((resolve, reject) => {
            this.instance.request<any,T>(config).then(res => {
                if (config.interceptors?.responseSuccessFn) {
                    res = config.interceptors?.responseSuccessFn(res)
                }
                resolve(res)
            },
                err => {
                    reject(err)
                }
            )
        })
    }

    get<T = any>(config:HYRequestConfig<T>) {
        return this.request({...config,method:'GET'})
    }

    post<T = any>(config: HYRequestConfig<T>) {
        return this.request({...config,method:'POST'})
    }

    delete<T = any>(config: HYRequestConfig<T>) {
        return this.request({...config,method:'DELETE'})
    }

    patch<T = any>(config: HYRequestConfig<T>) {
        return this.request({...config,method:'PATCH'})
    }

}


export default HYRequest
```

```typescript
// 在type.ts文件种
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
```



6.hooks类型封装

```typescript
type IRootType = ReturnType<typeof store.getState>
type IDispatchType = typeof store.dispatch

export const useAppSelector:TypedUseSelectorHook<IRootType> = useSelector
export const useAppDispatch:() => IDispatchType = useDispatch
export const shallowEqualApp = shallowEqual
```



7.跳转和超链接如何区分
