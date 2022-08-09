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

/**
 *  点位搜索
 * @param {*} params
 * @returns  Promise
 */
export const editVmList = (params) => {
  return request({
    url: "/vm-service/node/search",
    method: "GET",
    params,
  });
};

/**
 *  修改点位
 * @param {*} id
 * @param {*} nodeId
 * @returns
 */
export const editNode = (id, nodeId) => {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: "PUT",
  });
};

/**
 * 查询售货机策略
 * @param {*} code 设备编码
 * @returns  Promise
 */
export const getVmPolicy = (code) => {
  return request({
    url: `/vm-service/policy/vmPolicy/${code}`,
  });
};

/**
 *  取消策略
 * @param {*} innerCode 售货机编号
 * @param {*} policyId 策略Id
 * @returns  Promise
 */
export const delVmPolicy = (innerCode, policyId) => {
  return request({
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: "PUT",
  });
};

/**
 * 策略列表
 * @param {*} params innerCodeList	policyId
 * @returns  Promise
 */
export const getVmPolicyList = (params) => {
  return request({
    url: "/vm-service/policy",
    params,
  });
};


/**
 * 应用策略
 * @returns  Promise
 */
export const setVmPolicy = (data) => {
  return request({
    url: "/vm-service/vm/applyPolicy",
    method: "PUT",
    data
  });
};