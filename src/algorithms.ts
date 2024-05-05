/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

/**
 * Regex that tests for hex
 * @param str String to test
 * @returns True if valid, else false
 */
export const testHex = (str:string) => {
  return /^#[0-9a-f]{3,4}([0-9a-f]{3,4})?$/i.test(str)
}

/**
 * Test for valid rgb(a)/hsl(a)
 * @param str String to test
 * @returns True if valid rgb(a)/hsl(a), else false
 */
export const testRgb = (str:string) => {
  str = str.replace(/,\s+/g, ',')
  return /^(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$/i.test(str)
}

/**
 * Test for valid pixel format (NNpx)
 * @param str String to test
 * @returns True if valid pixel format, else false
 */
export const testPixel = (str:string) => {
  return /^([0-9]+)px$/i.test(str)
}

/**
 * Test for alphabetic charecters
 * @param str String to test
 * @returns True if the string is only alpha, else false
 */
export const testAlpha = (str:string) => {
  return /^[A-Za-z]+$/g.test(str)
}

/**
 * Test for numeric charecters
 * @param str String to test
 * @returns True if the string is only numeric, else false
 */
export const testNumeric = (str:string) => {
  return /^\d+$/g.test(str)
}

/**
 * Test for alphabetic and numeric charecters
 * @param str String to test
 * @returns True if the string is only alpha and numeric, else false
 */
export const testAlphaNumeric = (str:string) => {
  return /^[a-zA-Z0-9]+$/g.test(str)
}

/**
 * Test if an object is empty
 * @param obj Object to test
 * @returns True if empty, else false
 */
export const isEmptyObject = (obj:Object) => {
  for(let _i in obj) return false
  return true
}

/**
 * Axis Aligned Bounding Box Algorithm
 * @param test Object to test
 * @param collection Collection of objects to test against
 * @returns Returns the first object collided, else undefined
 */
export const AABB = (
    test:{ posX:number, posY:number, width:number, height:number },
    collection:Array<{ posX:number, posY:number, width:number, height:number }>) => {
  if(!(test instanceof Object)) return undefined
  if(!(collection instanceof Array)) return undefined
  let res = undefined
  collection.some((elm) => {
    if(
      test.posX < elm.posX + elm.width &&
      test.posX + test.width > elm.posX &&
      test.posY < elm.posY + elm.height &&
      test.posY + test.height > elm.posY
    ) {
      res = elm
      return true
    } else return false
  })
  return res
}
