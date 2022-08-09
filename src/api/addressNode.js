import request from "@/utils/request";

/**
 * 获取所在区域下拉列表数据
 * @param {*} params 
 * @returns 
 */
export const getNodeRegionList = (pageIndex,pageSize) => {
    return request({
      url: '/vm-service/region/search',
      method: "GET",
      params:{
        pageIndex,
        pageSize
      }      
    });
};

/**
 * 获取商圈类型下拉列表
 * @returns 
 */
export const getBusinessTypeList = () => {
    return request({
      url: '/vm-service/businessType',
      method: "GET",      
    });
};

/**
 * 获取合作商下拉列表
 * @param {*} pageIndex 
 * @param {*} pageSize 
 * @returns 
 */
export const getOwnerNameList = (pageIndex,pageSize) => {
    return request({
      url: '/user-service/partner/search',
      method: "GET",
      params:{
        pageIndex,
        pageSize
      }      
    });
};

/**
 * 新增点位
 * @param {*} data 
 * @returns 
 */
export const addNodeApi = (data) => {
    return request({
      url: '/vm-service/node',
      method: "post",
      data      
    });
};

/**
 * 删除点位
 * @param {*} id 
 * @returns 
 */
export const delNodeApi = (id) => {
    return request({
      url: `/vm-service/node/${id}`,
      method: "DELETE",          
    });
};

/**
 * 点位搜索
 * @param {*} id 
 * @returns 
 */
export const searchNodeApi = (params) => {
    return request({
      url: `/vm-service/node/search`,
      params   
    });
};

/**
 * 编辑点位
 * @param {*} data 
 * @returns 
 */
export const editNodeApi = (data) => {
    return request({
      url: `/vm-service/node/${data.id}`,
      method:"PUT",
      data    
    });
};

/**
 * 查看详情
 * @param {*} id 
 * @returns 
 */
export const checkNodeApi = (id) => {
    return request({
      url: `/vm-service/node/vmList/${id}`,      
    });
};
