import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} params 
 * @returns 
 */
export const getVmTypeList = (params) => {
    return request({
      url: '/vm-service/vmType/search',
      method: "GET",
      params      
    });
};

/**
 * 删除类型
 * @param {*} id 
 * @returns 
 */
export const delVmTypeList = (id) => {
    return request({
      url: `/vm-service/vmType/${id}`,
      method: "DELETE",   
    });
};

/**
 * 添加设备类型
 * @param {*} data 
 * @returns 
 */
export const addVmTypeApi = (data) => {
    return request({
      url: '/vm-service/vmType',
      method: "POST",
      data      
    });
};

/**
 * 修改设备类型
 * @param {*} data 
 * @returns 
 */
export const editVmTypeApi = (data) => {
    return request({
      url: `/vm-service/vmType/${data.typeId}`,
      method: "PUT",
      data      
    });
};
