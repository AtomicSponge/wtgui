/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

/**
 * Test for valid rgb(a)/hsl(a)
 * @param str String to test
 * @returns True if valid rgb(a)/hsl(a), else false
 */
export function testRgb(str:string) {
  return /^(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$/i.test(str)
}

/**
 * Test for alphabetic charecters
 * @param str String to test
 * @returns True if the string is only alpha, else false
 */
export function testAlpha(str:string) {
  return /^[A-Za-z]+$/g.test(str)
}

/**
 * Test for numeric charecters
 * @param str String to test
 * @returns True if the string is only numeric, else false
 */
export function testNumeric(str:string) {
  return /^\d+$/g.test(str)
}

/**
 * Test for alphabetic and numeric charecters
 * @param str String to test
 * @returns True if the string is only alpha and numeric, else false
 */
export function testAlphaNumeric(str:string) {
  return /^[a-zA-Z0-9]+$/g.test(str)
}

/**
 * AABB Algorithm
 * @param test Object to test
 * @param collection Collection of objects to test against
 * @returns Returns the first object collided, else undefined
 */
export function AABB(test:any, collection:Array<any>) {
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
