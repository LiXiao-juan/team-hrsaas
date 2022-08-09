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
/**
 * 新增商品
 * @param {*} data
 * @returns
 */
export function getAddGoods(data) {
  return request({
    url: "/vm-service/sku",
    method: "POST",
    data,
  });
}
/**
 * 修改商品
 * @param {*} skuId 商品id
 * @param {*} data
 * @returns
 */
export function editGoods(skuId, data) {
  return request({
    url: "/vm-service/sku/" + skuId,
    method: "PUT",
    data,
  });
}
/**
 * 商品数据导入
 * @param {*} fileName 文件名
 * @returns
 */
export function getUpload(fileName) {
  return request({
    url: "/vm-service/sku/upload",
    method: "POST",
    fileName,
  });
}
