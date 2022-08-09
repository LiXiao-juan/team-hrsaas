import request from "@/utils/request";

/**
 * 获取当时工单汇总信息(人员统计头部信息)
 * @param {start,end}
 * return promise
 */
export const getTaskReportInfo = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`,
  });
};
