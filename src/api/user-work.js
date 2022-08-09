import request from "@/utils/request";

/**
 * 获取工作量列表
 * @param {*} params
 * @returns promise
 */
export const getUserWorkList = (params) => {
  return request({
    url: "/user-service/user/searchUserWork",
    params,
  });
};
