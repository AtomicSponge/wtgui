/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import { WTGui } from './WTGui.js'
import { settings } from './WTGuiSettings.js'
import { WTGuiMenu } from './WTGuiMenu.js'
import { WTGuiItem } from './items/WTGuiItem.js'
import { WTGuiError } from './WTGuiError.js'

export class WTGuiRenderer {
  static #initialized:boolean = false  //  Flag if the renderer was initialized
  //static #canvas_name:string = '___wtgui_renderer_canvas_id___'  //  Reference to the canvas ID

  static #mainCanvas:HTMLCanvasElement  //  Main 2d canvas
  //static #menuCanvas:HTMLCanvasElement  //  2d canvas for rendering menus
  static #ctx:CanvasRenderingContext2D  //  2d context for menu drawing

  static #fpsCalc:number = 0               //  Store timed func to calculate fps
  static #nextFrame:number = 0             //  Store the call to the animation frame
  static #drawFps:boolean = false          //  Flag for drawing fps counter
  static #fps:number = 0                   //  Store frame rate
  static #step:number = 0                  //  Used to calculate fps
  static #frameDelta:number = 0            //  Time in ms between frames
  static #lastRender:number = 0            //  Last render time
  static #bgAnimation:Function = () => {}  //  Background animation function

  constructor() { return false }  //  Don't allow direct construction

  static initialize(canvas:HTMLCanvasElement, maindoc:HTMLElement) {
    if(WTGuiRenderer.#initialized)
      throw new WTGuiError(`WTGuiRenderer already initialized!`, WTGuiRenderer.initialize)

    canvas.setAttribute('width', `${maindoc.clientWidth}`)
    canvas.setAttribute('height', `${maindoc.clientHeight}`)

    WTGuiRenderer.#mainCanvas = canvas
    WTGuiRenderer.#mainCanvas.style.display = 'none'
    WTGuiRenderer.#ctx = <CanvasRenderingContext2D>WTGuiRenderer.#mainCanvas.getContext('2d')

    const observer = new ResizeObserver(() => {
      const temp = WTGuiRenderer.#ctx.getImageData(0, 0, WTGuiRenderer.#mainCanvas.width, WTGuiRenderer.#mainCanvas.height)
      WTGuiRenderer.#mainCanvas.width = maindoc.clientWidth
      WTGuiRenderer.#mainCanvas.height = maindoc.clientHeight
      WTGuiRenderer.#ctx.putImageData(temp, 0, 0, 0, 0, WTGuiRenderer.#mainCanvas.width, WTGuiRenderer.#mainCanvas.height)
    })
    observer.observe(maindoc)

    WTGuiRenderer.#initialized = true
  }

  /**
   * Start the renderer
   */
  static start() {
    WTGuiRenderer.#mainCanvas.style.display = 'block'
    WTGuiRenderer.#mainCanvas.focus()
    //WTGuiRenderer.#menuCanvas.width = settings.width
    //WTGuiRenderer.#menuCanvas.height = settings.height
    window.cancelAnimationFrame(WTGuiRenderer.#nextFrame)
    WTGuiRenderer.#nextFrame = window.requestAnimationFrame(WTGuiRenderer.#render)
  }

  /**
   * Stop the renderer
   */
  static stop() {
    WTGuiRenderer.#mainCanvas.style.display = 'none'
    window.cancelAnimationFrame(WTGuiRenderer.#nextFrame)
    WTGuiRenderer.#fps = WTGuiRenderer.#step = 0
    WTGuiRenderer.#frameDelta = WTGuiRenderer.#lastRender = 0
  }

  /**
   * Set the background animation function
   * @param func New animation function
   */
  static setBgAnimation(func:Function) {
    if(WTGui.data.initialized)
      throw new WTGuiError(`WTGui is already running.`, WTGuiRenderer.setBgAnimation)
    if(!(func instanceof Function))
      throw new WTGuiError(`Background animation must be a function.`, WTGuiRenderer.setBgAnimation)
    WTGuiRenderer.#bgAnimation = func
  }

  /**
   * Turn fps drawing on or off
   * @param toggle True to turn on, false to turn off
   */
  static drawFps(toggle:boolean) {
    if(toggle) {
      clearInterval(WTGuiRenderer.#fpsCalc)
      WTGuiRenderer.#fpsCalc = setInterval(() => {
        WTGuiRenderer.#fps = WTGuiRenderer.#step
        WTGuiRenderer.#step = 0
      }, 1000)
      WTGuiRenderer.#drawFps = true
    } else {
      WTGuiRenderer.#drawFps = false
      clearInterval(WTGuiRenderer.#fpsCalc)
    }
  }

  /**
   * 
   * @param ctx 
   * @param menuItem 
   * @param currentMenu 
   */
  static #highlighter(ctx:CanvasRenderingContext2D, menuItem:WTGuiItem, currentMenu:WTGuiMenu) {
    ctx.fillStyle = 'rgb(255,255,0)'
    ctx.fillRect(
      currentMenu.posX + (menuItem.posX - 10),
      currentMenu.posY + (menuItem.posY - 10),
      menuItem.width + 20, menuItem.height + 20)
  }

  /*
   * Render draw method
   */
  static #render() {
    if(WTGui.data.openedMenus.length === 0 || WTGui.data.currentMenu === undefined)
      WTGui.openMenu(settings.defaultMenu)
    if(WTGui.data.openedMenus.length === 0 || WTGui.data.currentMenu === undefined)
      throw new WTGuiError(`No menus available.`, WTGuiRenderer.#render)

    const currentMenu = WTGui.data.currentMenu
    const ctx = WTGuiRenderer.#ctx

    //  Clear the renderer
    ctx.fillStyle = settings.clearColor
    ctx.fillRect(0, 0, settings.width, settings.height)

    //  Run background animation function
    WTGuiRenderer.#bgAnimation()

    //  Render the menu
    if(!settings.debugMode && currentMenu.bgImage !== undefined) {
      {(currentMenu.scaleImg) ?
        ctx.drawImage(<HTMLImageElement>WTGui.getImage(currentMenu.bgImage),
          currentMenu.posX + currentMenu.imgOffsetX,
          currentMenu.posY + currentMenu.imgOffsetY,
          currentMenu.width, currentMenu.height) :
        ctx.drawImage(<HTMLImageElement>WTGui.getImage(currentMenu.bgImage),
          currentMenu.posX + currentMenu.imgOffsetX,
          currentMenu.posY + currentMenu.imgOffsetY)}
    } else {
      ctx.fillStyle = currentMenu.bgColor
      ctx.fillRect(currentMenu.posX, currentMenu.posY,
        currentMenu.width, currentMenu.height)
    }

    //  Render active item highlighting
    if(WTGui.data.activeItem !== undefined)
      WTGuiRenderer.#highlighter(WTGuiRenderer.#ctx, WTGui.data.activeItem, currentMenu)

    //  Render menu items
    currentMenu.items.forEach(elm => {
      if(!settings.debugMode && elm.bgImage !== undefined) {
        {(elm.scaleImg) ?
          ctx.drawImage(<HTMLImageElement>WTGui.getImage(elm.bgImage),
            elm.posX + elm.imgOffsetX,
            elm.posY + elm.imgOffsetY,
            elm.width, elm.height) :
          ctx.drawImage(<HTMLImageElement>WTGui.getImage(elm.bgImage),
            elm.posX + elm.imgOffsetX,
            elm.posY + elm.imgOffsetY)}
      } else {
        ctx.fillStyle = elm.bgColor
        ctx.fillRect(currentMenu.posX + elm.posX,
          currentMenu.posY + elm.posY,
          elm.width, elm.height)
      }
    })

    //  Render FPS counter if enabled
    if(WTGuiRenderer.#drawFps) {
      ctx.font = settings.fpsFont
      ctx.fillStyle = settings.fpsColor
      ctx.textAlign = 'right'
      ctx.fillText(`${WTGuiRenderer.#fps}`, settings.width, 12)
    }

    //  Update renderer info and request next frame
    WTGuiRenderer.#step++
    WTGuiRenderer.#frameDelta = Date.now() - WTGuiRenderer.#lastRender
    WTGuiRenderer.#lastRender = Date.now()
    WTGuiRenderer.#nextFrame = window.requestAnimationFrame(WTGuiRenderer.#render)
  }

  /**
   * Get the menu drawing context
   * @returns 2D drawing context
   */
  static get draw() { return WTGuiRenderer.#ctx }

  /**
   * Get the frames per second
   * @returns Frames per second
   */
  static get fps() { return WTGuiRenderer.#fps }

  /**
   * Get the frame delta time
   * @returns Time between drawn frames
   */
  static get frameDelta() { return WTGuiRenderer.#frameDelta }

  /**
   * Get the last rendering time
   * @returns Time last frame was drawn
   */
  static get lastRender() { return WTGuiRenderer.#lastRender }
}
