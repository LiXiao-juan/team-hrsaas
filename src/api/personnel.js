import request from "@/utils/request";

/**
 * 人员搜索(列表页)
 * return promise
 */

export const getPersonnelList = (params) => {
  return request({
    url: "/user-service/user/search",
    params,
  });
};
