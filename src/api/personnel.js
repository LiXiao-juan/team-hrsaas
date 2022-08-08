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

/**
 * 新增人员
 * return promise
 */
export const addPersonnel = (data) => {
  return request({
    method: "POST",
    url: "/user-service/user",
  });
};

/**
 * 获取用户基本信息
 * return promise
 */
export const getPersonnel = (id) => {
  return request({
    method: "GET",
    url: `/user-service/user/${id}`,
  });
};

/**
 * 修改人员
 * return promise
 */
export const editPersonnel = (id) => {
  return request({
    method: "PUT",
    url: `/user-service/user/${id}`,
  });
};

/**
 * 删除人员
 * return promise
 */
export const delPersonnel = (id) => {
  return request({
    method: "DELETE",
    url: `/user-service/user/${id}`,
  });
};
