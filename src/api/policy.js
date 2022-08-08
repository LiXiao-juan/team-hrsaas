import request from "@/utils/request";
/**
 * 策略搜索
 * @returns  Promise
 */
export function getPolicyApi(params) {
  return request({
    url: "/vm-service/policy/search",
    method: "GET",
    params,
  });
}
/**
 * 新增策略
 * @param {String} data policyName策略名称 discount折扣比例数
 * @returns  Promise
 */
export function AddPolicyApi(data) {
  return request({
    url: "/vm-service/policy",
    method: "POST",
    data,
  });
}
/**
 * 删除策略
 * @param {String,Number} policyid 要删除的策略id
 * @returns  Promise
 */
export function DeletePolicyApi(policyId) {
  return request({
    url: "/vm-service/policy/" + policyId,
    method: "DELETE",
  });
}
/**
 * 修改策略
 * @param  {String,Number} policyid 要修改的策略id
 * @returns
 */
export function EditPolicyApi(policyId, policyName, discount) {
  return request({
    url: "/vm-service/policy/" + policyId,
    method: "PUT",
    data: {
      policyName,
      discount,
    },
  });
}
/**
 * 根据策略搜索售货机
 * @param {String,Number} policyid 策略id
 * @returns
 */
export function getVmList(policyId) {
  return request({
    url: "/vm-service/policy/vmList/" + policyId,
    method: "GET",
  });
}
