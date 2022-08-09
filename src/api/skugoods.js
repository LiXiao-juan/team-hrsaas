import request from "@/utils/request";
/**
 * 商品类型搜索
 * @returns  Promise
 */
export function getGoodsApi(params) {
  return request({
    url: "/vm-service/skuClass/search",
    method: "GET",
    params,
  });
}
/**
 * 删除商品种类
 * @param {*} classId
 * @returns
 */
export function deleteGoods(classId) {
  return request({
    url: "/vm-service/skuClass/" + classId,
    method: "DELETE",
  });
}
/**
 * 修改商品类别
 * @param {*} classId 商品id
 * @param {*} className 商品类别名称
 * @returns
 */
export function editClass(classId, className) {
  return request({
    url: "/vm-service/skuClass/" + classId,
    method: "PUT",
    data: {
      className,
    },
  });
}
/**
 * 新增商品类别
 * @param {*} className 商品类别名称
 * @returns
 */
export function addClass(classId, className) {
  return request({
    url: "/vm-service/skuClass/" + classId,
    method: "POST",
    data: {
      className,
    },
  });
}
