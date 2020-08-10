import request from "./../utils/request.js";
/**
 * 获取分类列表
 * 
*/
export function getCategoryList(){
  return request.get('category', {}, { noAuth:true})
}

/**
 * 参数配置
 * 
*/
export function getConfig(){
  return request.get('setting', { id: 1 }, { noAuth:true})
}