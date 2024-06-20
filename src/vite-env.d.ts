/// <reference types="vite/client" />

interface WTGuiOptions {
  gameTitle:string
  fontStyle?:string
  titleColor?:string
  borderColor?:string
  itemColor?:string
  focusColor?:string
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
type MainMenuDelay = 300
