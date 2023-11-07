export const retryResFn = request => {
    return (response) => {
        console.log('请求超时...', response)
        // return response;
        return Promise.reject(response)
    };
}