import request from "@/utils/request";


/**
 *  获取设备列表
 * @param {*} params 
 * @returns 
 */
export const getVmList = (params) => {
  return request({
    url: "/vm-service/vm/search",
    method: "GET",
    params,
  });
};

// export const searchVmList = (params) => {
//   return request({
//     url: "/vm-service/vm/search",
//     method: "GET",
//     params,
//   });
// };


