import request from '@/utils/request'

/**
 * 获取分类请求列表
 * @returns
 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}
