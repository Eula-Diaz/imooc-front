import request from '@/utils/request.js'

/**
 * 获取图片数据列表
 * @param params
 * @returns {Promise<AxiosResponse<any>> | *}
 */
export const getPexelsList = (params) => {
  return request({
    url: '/pexels/list',
    params
  })
}
