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

/**
 * 获取用户工作量(工单统计)
 * @param {*} params
 * @returns promise
 */
export const getUserWorkTime = (params) => {
  return request({
    url: "/task-service/task/userWork",
    params,
  });
};
