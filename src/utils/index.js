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
    console.log('响应时间', decoded.exp * 1000)
    console.log('预计过期时间', Date.now() + (time * 1000))
    return decoded.exp * 1000 < Date.now() + (time * 1000);
}

/**
 * 获取token信息
 * @param {*} token 
 * @returns 
 */
export const getTokenValue = token => {
    return jwtDecode(token);
}

/**
 * 
 * @param {*} asyncReq 请求
 * @param {*} time 次数
 * @param {*} delay 延迟
 * @returns 
 */
export const retry = (asyncReq, time, delay) => {
    // 最终控制
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

// 深拷贝
const OBJ_TYPE = '[object Object]'
export const deepClone = function deepClone(obj, functionNeedCopy) {
    const map = new WeakMap(); // 全局Map 缓存同一个对象时出现的问题
    let inner = function (obj, functionNeedCopy) {
        if (typeof obj !== 'object' || obj === null) {
            if (typeof obj === 'function' && functionNeedCopy) {
                let str = obj.toString()
                let paramsReg = /\(|\)/; //  '(1,2,3)'
                let paramsArr = str.split(paramsReg); // 参数'1,2,3'
                let params = paramsArr[1].split(','); // [1,2,3]
                const pattern = /function\s*\([^)]*\)\s*{([\s\S]*)}/;
                const match = str.match(pattern); // [1]是函数体
                params.push(match[1]); // 参数中函数体字符串在最后一个
                // console.log(str,'函数体');
                let fn = new Function(...params);
                console.log('new Function API params:', params);
                return fn;
            }
            return obj; // 1,'str','fales'
        }

        if (map.has(obj)) {
            // 处理过
            return map.get(obj);
        }
        var params;
        if (obj instanceof Date || obj instanceof RegExp) {
            params = obj;
        }
        // 对象上都有constructor属性,指向自身的构造函数
        var tmp = new obj.constructor(params);
        map.set(obj, tmp);
        // 缓存值
        if (obj instanceof Map) {
            obj.forEach((value, key) => {
                tmp.set(inner(key, functionNeedCopy), inner(value, functionNeedCopy));
            })
        } else if (obj instanceof Set) {

            obj.forEach(value => {
                tmp.add(inner(value, functionNeedCopy));
            })
        } else if (obj instanceof Array || Object.prototype.toString.call(obj) === OBJ_TYPE) {
            // 数组和对象
            for (var key in obj) {
                tmp[key] = inner(obj[key], functionNeedCopy);
            }
        } else if (obj instanceof RegExp || obj instanceof Date) { }
        else {
            // 暂时无效, 为了排除遗留未处理的类型
            throw new Error('不支持的类型' + Object.prototype.toString.call(obj))
        }
        return tmp;
    }
    return inner(obj, functionNeedCopy);
}

// 在一定时间只执行一次用户的操作，不满足 顺延时间
export const debounce = function (fn, wait) {
    let timer;
    return function () {
        // 1秒内再次调用,就先清空
        clearTimeout(timer)
        timer = setTimeout(() => {
            // 1秒后执行
            fn.call(this, arguments)
        }, wait);
    }
}

// 节流 一定时间内，就执行一次
export const throttle = function throttle(fn, wait) {
    let lock = true;
    return function () {
        if (!lock) return;
        lock = false;
        setTimeout(() => {
            fn.call(this, arguments);
            lock = true;
        }, wait)
    }
}

export const formatDate = function (str) {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export async function downloadByTag(blob, fileName) {
    // 1. 创建a标签
    const tagA = document.createElement('a');
    // 1.5. 用blob生成内存中的临时url
    const memoryUrl = window.URL.createObjectURL(blob);
    console.log('memoryUrl:', memoryUrl)
    // 2. download：fileName 和 href属性：blob的url
    tagA.href = memoryUrl;
    tagA.download = fileName;
    tagA.style.display = 'none'; // 避免回流
    // 3. 不影响用户体验的插入DOM
    document.body.appendChild(tagA);
    // 4. 模拟用户点击
    tagA.click();
    // 5. 释放临时url的内存指向
    window.URL.revokeObjectURL(memoryUrl);
    // 6. a删除DOM
    document.body.removeChild(tagA);
}