// 浅拷贝，还可以通过object.assgin()  ...解构

// 深拷贝
// JSON.parse(JSON.stringify(object))。局限性：会忽略 undefined 会忽略 symbol 不能序列化函数 不能解决循环引用的对象（值的互相引用）
// 简易版深拷贝
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}
