import request from "@/utils/request";

/**
 *  获取工单列表
 * @param {*} params
 * @returns
 */
export const getTasksList = (params) => {
  return request({
    url: "/task-service/task/search",
    method: "GET",
    params,
  });
};

/**
 *  获取工单类型
 * @param {Number} alertValue
 * @returns
 */
export const getTaskType = (alertValue) => {
  return request({
    url: "/task-service/taskType/list",
    method: "GET",
    params: {
      alertValue,
    },
  });
};

/**
 *  获取预警值
 * @returns  Promise
 */
export const getSupplyAlertValue = () => {
  return request({
    url: "/task-service/task/supplyAlertValue",
    method: "GET",
  });
};

/**
 *  设置预警值
 * @param {Number} alertValue
 * @returns  Promise
 */
export const setSupplyAlertValue = (alertValue) => {
  return request({
    url: "/task-service/task/autoSupplyConfig",
    method: "POST",
    data: {
      alertValue,
    },
  });
};

/**
 *  创建工单
 * @param {*} data
 * @returns
 */
export const createTask = (data) => {
  return request({
    url: "/task-service/task/create",
    method: "POST",
    data,
  });
};

/**
 *  删除订单
 * @param {*} data
 * @returns
 */
export const delTask = (data) => {
  return request({
    url: `/task-service/task/cancel/${data.taskId}`,
    method: "POST",
    data,
  });
};

/**
 *  补货详情
 * @param {*} taskId
 * @returns
 */
export const getTaskDetails = (taskId) => {
  return request({
    url: `vm-service/channel/channelList/${taskId}`,
  });
};
