/**
 * Creates a random number with 20 digits
 * @returns A random number
 */
export const generateId = ():string => {
  return `${Math.floor(Math.pow(10, 20) + Math.random() * (Math.pow(10, 20) - Math.pow(10, 20 - 1) - 1))}`
}
