/**
 * Creates a random number for use in Ids
 * @returns A random number as a string
 */
export const generateId = ():string => {
  return `${Math.floor(Math.pow(10, 20) + Math.random() * (Math.pow(10, 20) - Math.pow(10, 20 - 1) - 1))}`
}
