/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

/**
 * Class for handling library errors
 * @extends Error
 */
export class WTGuiError extends Error {
  message:string
  code:Object
  exitCode:number

  /**
   * Constructs the WTGuiError class
   * @param message Error message
   * @param code Error code
   * @param {number} [exitCode=1] Exit code
   */
  constructor(message:string, code:Object, exitCode?:number) {
		super()

		this.name = this.constructor.name
    this.message = message
		this.code = code
		this.exitCode = exitCode || 1

    this.stack = new Error().stack
	}
}

/**
 * Class for handling menu item errors
 * @extends Error
 */
export class WTGuiMenuItemError extends Error {
  message:string
  code:Object
  exitCode:number

  /**
   * Constructs the WTGuiMenuItemError class
   * @param message Error message
   * @param code Error code
   * @param {number} [exitCode=1] Exit code
   */
  constructor(message:string, code:Object, exitCode?:number) {
		super()

		this.name = this.constructor.name
    this.message = message
		this.code = code
		this.exitCode = exitCode || 1

    this.stack = new Error().stack
	}
}

/**
 * Class for handling menu errors
 * @extends Error
 */
export class WTGuiMenuError extends Error {
  message:string
  code:Object
  exitCode:number

  /**
   * Constructs the WTGuiMenuError class
   * @param message Error message
   * @param code Error code
   * @param {number} [exitCode=1] Exit code
   */
  constructor(message:string, code:Object, exitCode?:number) {
		super()

		this.name = this.constructor.name
    this.message = message
		this.code = code
		this.exitCode = exitCode || 1

    this.stack = new Error().stack
	}
}

/**
 * Class for handling type errors
 * @extends Error
 */
export class WTGuiTypeError extends Error {
  message:string
  code:Object
  exitCode:number

  /**
   * Constructs the WTGuiMenuError class
   * @param message Error message
   * @param code Error code
   * @param {number} [exitCode=1] Exit code
   */
  constructor(message:string, code:Object, exitCode?:number) {
		super()

		this.name = this.constructor.name
    this.message = message
		this.code = code
		this.exitCode = exitCode || 1

    this.stack = new Error().stack
	}
}
