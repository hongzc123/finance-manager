import { jwtDecode } from 'jwt-decode'

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwidHlwZSI6MywiaWF0IjoxNjk5MDg5MDgzLCJleHAiOjE2OTkwOTI2ODN9.19ySkdZGNGtXFR16NvvhiRBfi_I3CaNFd2-8kKpVS08`;

/**
 * 纯函数（不依赖于本地上下文，仅通过参数来获取，返回计算逻辑）
 */
export const isLogin = (token) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    if (!decoded) return false
    console.log(decoded);
    return decoded.exp * 1000 > Date.now()
}