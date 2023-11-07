import { jwtDecode } from 'jwt-decode'

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwidHlwZSI6MywiaWF0IjoxNjk5MDg5MDgzLCJleHAiOjE2OTkwOTI2ODN9.19ySkdZGNGtXFR16NvvhiRBfi_I3CaNFd2-8kKpVS08`;

/**
 * 纯函数（不依赖于本地上下文，仅通过参数来获取，返回计算逻辑）
 */
export const isLogin = (token) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    if (!decoded) return false
    // console.log(decoded);
    return decoded.exp * 1000 > Date.now()
}

/**
 * 校验token是否过期
 * @param {*} token 
 * @param {*} time 
 * @returns 
 */
export const isExpires = (token, time) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    if (!decoded) return false;

    return decoded.exp * 1000 < Date.now() + (time * 1000);
}

/**
 * 
 * @param {*} asyncReq 回调函数
 * @param {*} time 次数
 * @param {*} delay 延迟
 * @returns 
 */
export const retry = (asyncReq, time, delay) => {
    // 最总控制
    return new Promise((resolve, reject) => {
        let request = async function () {
            try {
                let result = await asyncReq()
                resolve(result)
            } catch (e) {
                // 判断是否满足次数
                if (time-- <= 0) {
                    return reject(time + '次重连失败...')
                }
                if (delay) {
                    setTimeout(() => {
                        request()
                    }, delay * 1000)
                } else {
                    request()
                }
            }
        }

        request()
    })
}