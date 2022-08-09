import request from "@/utils/request";
/**
 * 商品搜索
 * @param {*} params
 * @returns
 */
export function getGoodsType(params) {
  return request({
    url: "/vm-service/sku/search",
    method: "GET",
    params,
  });
}
