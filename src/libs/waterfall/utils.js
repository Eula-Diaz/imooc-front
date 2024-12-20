/**
 * 从 itemElement 中抽离所有的 imgElements
 */
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 生成所有图片链接数组
 * @param imgElements
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src
  })
}

/**
 * 监听图片数组加载完成
 */
export const onComplateImgs = (imgs) => {
  // promise 集合
  const promiseAll = []
  // 循环 imgs, 构建 promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      // 处理 img 的加载情况
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve(imageObj)
      }
    })
  })
  return Promise.all(promiseAll)
}

/**
 * 返回列高对象中最小高度
 * @param columnHeightObj
 * @returns {number}
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中最大高度
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
/**
 * 返回列高对象中最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  // 拿到最小的高度
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find(
    (key) => columnHeightObj[key] === minHeight
  )
}
