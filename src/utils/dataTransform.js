export function transfer(data){
    // 如果是请求文件
    if (data instanceof Blob)return data;
    // 字符串才解析
    let resData = JSON.parse(data);
    // 兼容menu 不能向下处理
    if (Array.isArray(resData))return resData;

    let tmp = resData;
    let pager = {}
    while(tmp.data) {
      tmp = tmp.data; // 指针下移
      // 判断如果下一次tmp.data是数组,就是倒数第二
      if (Array.isArray(tmp?.data?.data)) {
        pager = {
          size:tmp.size,
          rows:tmp.rows,
          pages:tmp.pages
        }
      }
    }
    // tmp.data 没有了.. 最底层
    if (Array.isArray(tmp)) {
        resData.list = tmp; 
    } else {
        resData.data = tmp;
    }
    Object.assign(resData,{pager});
    return resData;
  }