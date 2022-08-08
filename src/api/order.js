import request from "@/utils/request";
/**
 * 订单管理
 * @returns
 */
export function getSearchOrder(params) {
  return request({
    url: "/order-service/order/search",
    method: "GET",
    params,
  });
}
