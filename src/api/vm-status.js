import request from "@/utils/request";

/**
 * 获取一定时间范围之内的订单总数
 * @param {start,end}
 * return promise
 */
export const getOrderCount = (params) => {
  return request({
    url: "/order-service/report/orderCount",
    params,
  });
};

/**
 * 获取一定时间范围之内的收入
 * @param {start,end}起始时间
 * return params
 */
export const getOrderAmount = (params) => {
  return request({
    url: "/order-service/report/orderAmount",
    params,
  });
};

/**
 * 获取售货机补货次数
 * @param {*} :innerCode/:start/:end
 * return params
 */
export const getSupplyCount = (params) => {
  return request({
    url: `/task-service/task/supplyCount/${params.innerCode}/${params.start}/${params.end}`,
  });
};

/**
 * 获取售货机维修次数
 * @param {*} :innerCode/:start/:end
 * return params
 */
export const getRepairCount = (params) => {
  return request({
    url: `/task-service/task/repairCount/${params.innerCode}/${params.start}/${params.end}`,
  });
};

/**
 * 获取售货机商品销量
 * @param {*} :innerCode/:start/:end
 * return params
 */
export const getSkuCollect = (params) => {
  return request({
    url: `/order-service/report/skuCollect/${params.innerCode}/${params.start}/${params.end}`,
  });
};
