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
 * return promise
 */
export const getOrderAmount = (params) => {
  return request({
    url: "/order-service/report/orderAmount",
    params,
  });
};

/**
 * 获取一定时间范围之内的分成总数
 * @param {start,end}起始时间
 * return promise
 */
export const getTotalBill = (params) => {
  return request({
    url: "/order-service/report/totalBill",
    params,
  });
};

/**
 * 获取售货机补货次数
 * @param {*} :innerCode/:start/:end
 * return promise
 */
export const getSupplyCount = (params) => {
  return request({
    url: `/task-service/task/supplyCount/${params.innerCode}/${params.start}/${params.end}`,
  });
};

/**
 * 获取售货机维修次数
 * @param {*} :innerCode/:start/:end
 * return promise
 */
export const getRepairCount = (params) => {
  return request({
    url: `/task-service/task/repairCount/${params.innerCode}/${params.start}/${params.end}`,
  });
};

/**
 * 获取售货机商品销量
 * @param {*} :innerCode/:start/:end
 * return promise
 */
export const getSkuCollect = (params) => {
  return request({
    url: `/order-service/report/skuCollect/${params.innerCode}/${params.start}/${params.end}`,
  });
};

/**
 * 合作商搜索
 * @param {Object}
 * return promise
 */
export const getPartnerList = () => {
  return request({
    url: "/user-service/partner/search",
    params: {
      pageIndex: 1,
      pageSize: 100000,
    },
  });
};

/**
 * 获取一定日期范围之内的合作商分成汇总数据
 * @param {Object}
 * return promise
 */
export const getPartnerCollect = (params) => {
  return request({
    url: "/order-service/report/partnerCollect",
    params,
  });
};
