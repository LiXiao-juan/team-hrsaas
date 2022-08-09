import request from "@/utils/request";

/**
 * 获取区域列表
 * @returns 
 */
export const getRegionList = (params) => {
    return request({
      url: '/vm-service/region/search',
      method: "GET",
      params      
    });
};

/**
 * 新增区域
 * @param {*} data 
 * @returns 
 */
export const addRegion = (data) => {
  return request({
    url: '/vm-service/region',
    method: "post",
    data      
  });
};

/**
 * 获取区域详情
 * @param {*} data 
 * @returns 
 */
export const getEditRegion = (id) => {
  return request({
    url: `/vm-service/region/${id}`,        
  });
};

/**
 * 修改区域
 * @param {*} id 
 * @returns 
 */
export const editRegion = (id,regionName,remark) => {
  return request({
    url: `/vm-service/region/${id}`,
    method: "PUT",
    data:{
      regionName,remark
    }        
  });
};

/**
 * 删除区域
 * @param {*} id 
 * @returns 
 */
export const delRegion = (id) => {
  return request({
    url: `/vm-service/region/${id}`,
    method: "DELETE",
    
  });
};


/**
 * 查看详情
 * @param {*} id 
 * @returns 
 */
export const checkRegionList = (pageIndex,pageSize,regionId) => {
  return request({
    url: '/vm-service/node/search',    
    params:{
      pageIndex,
      pageSize,
      regionId
    }
  });
};


/**
 * 获取点位管理列表数据
 * @param {*} params 
 * @returns 
 */
export const getNodeList = (params) => {
  return request({
    url: '/vm-service/node/search',
    method: "GET",
    params      
  });
};

