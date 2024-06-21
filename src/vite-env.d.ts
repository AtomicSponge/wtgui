/// <reference types="vite/client" />

/** Options for WTGui */
interface WTGuiOptions {
  /** Game title */
  gameTitle:string
  /** Fonst style in CSS */
  fontStyle?:string
  /** Title color in CSS */
  titleColor?:string
  /** Border color in CSS */
  borderColor?:string
  /** Item color in CSS */
  itemColor?:string
  /** Focus color in CSS */
  focusColor?:string
  /** Main menu name */
  mainMenuRoute?:string
  /** Main menu scaling */
  defaultScale?:number
}

interface GamepadAPI {
  controller:Gamepad | undefined
  buttons:Array<string>
  buttonsCache:Array<string>
  buttonsStatus:Array<string>
  axesStatus:Array<string>
  connect:(event:any)=>void
  disconnect:()=>void
  update:()=>Array<string> | undefined
  buttonPressed:()=>void
}

/** Animation time equal to CSS value */
type MsgBoxZoomTime = 300
type MenuDelay = 300
