import request from "./../utils/request.js";
/**
 * 获取分类列表
 * 
*/
export function getCategoryList(){
  return request.get('category', {}, { noAuth:true})
}