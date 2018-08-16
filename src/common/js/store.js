/**
 * Created by healer on 2018/8/16.
 */

/**
 * @Description:
 * @param id
 * @param key;键
 * @param value: 值
 * @return:
 * @throw:
 * @Author: healer
 * @Date: 2018-08-16
*/
export function saveToLocal (id, key, value) {
  let seller = localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller)[id];
    if (!seller[id]) {
       seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage._seller_ = JSON.stringify(seller);
};

/**
 * @Description:
 * @param id
 * @param key
 * @param def:默认值
 * @return:
 * @throw:
 * @Author: healer
 * @Date: 2018-08-16
 */
export function loadFormLocal (id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
