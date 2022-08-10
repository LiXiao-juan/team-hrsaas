import request from "@/utils/request";

/**
 * 获取一定日期范围之内的合作商分成汇总数据
 * @param {Object} params
 * @returns promise
 */
export function getpartnercollect(params) {
  return request({
    url: "/order-service/report/partnerCollect",
    params,
  });
}

/**
 * 获取一定时间范围之内的分成总数
 * @param {Object} params
 * @returns
 */
export function gettotalBill(params) {
  return request({
    url: "/order-service/report/totalBill",
    params,
  });
}

/**
 * 获取一定时间范围之内的收入
 * @param {Object} params
 * @returns
 */
export function getorderAmount(params) {
  return request({
    url: "/order-service/report/orderAmount",
    params,
  });
}

/**
 * 获取一定时间范围之内的订单总数
 * @param {Object} paramss
 *  @returns
 */
export function getorderCount(params) {
  return request({
    url: "/order-service/report/orderCount",
    params,
  });
}
