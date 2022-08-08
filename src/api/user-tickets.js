import request from "@/utils/request";


/**
 *  获取运营人员
 * @param {*} innerCode 
 * @returns 
 */
export const getOperatorList = (innerCode) => {
  return request({
    url: `/user-service/user/operatorList/${innerCode}`,
    method: "GET",
  });
};

