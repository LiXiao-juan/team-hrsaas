import request from "@/utils/request";

/**
 * 人员搜索(列表页)
 * return promise
 */

export const getPersonnelList = (params) => {
  return request({
    url: "/user-service/user/search",
    params,
  });
};

/**
 * 区域列表
 * return promise
 */
export const getRegionList = (params) => {
  return request({
    url: "/vm-service/region/search",
    params,
  });
};

/**
 * 角色列表
 * return promise
 */
export const getRoleList = () => {
  return request({
    url: "/user-service/role",
  });
};

/**
 * 上传图片
 * return promise
 */
export const imgUpload = () => {
  return request({
    method: "POST",
    url: "/vm-service/sku/fileUpload",
  });
};
