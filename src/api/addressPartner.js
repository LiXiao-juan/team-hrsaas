import request from "@/utils/request";

/**
 * 获取合作商列表
 * @returns 
 */
 export const getPartnerList = (params) => {
    return request({
      url: '/user-service/partner/search',
      method: "GET",
      params      
    });
};

/**
 * 添加合作商
 * @param {*} data 
 * @returns 
 */
export const addPartnerItemApi = (data) => {
    return request({
      url: '/user-service/partner',
      method: "POST",
      data    
    });
};

/**
 * 删除合作商
 * @param {*} id 
 * @returns 
 */
export const delPartnerItemApi = (id) => {
    return request({
      url: `/user-service/partner/${id}`,
      method: "DELETE",      
    });
};


/**
 * 修改合作商
 * @param {*} data 
 * @returns 
 */
export const editPartnerItemApi = (data) => {
    return request({
      url: `/user-service/partner/${data.id}`,
      method: "PUT",
      data    
    });
};

/**
 * 重置密码
 * @param {*} id 
 * @returns 
 */
export const restPartnerItemApi = (id) => {
    return request({
      url: `/user-service/partner/resetPwd/${id}`,
      method: "PUT",      
    });
};