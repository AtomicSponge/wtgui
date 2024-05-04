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
import { isEmptyObject } from './algorithms.js'

export class WTGuiRenderer {
  static #initialized:boolean = false  //  Flag if the renderer was initialized

  static #mainCanvas:HTMLCanvasElement  //  Main 2d canvas
  //static #menuCanvas:HTMLCanvasElement  //  2d canvas for rendering menus
  static #ctx:CanvasRenderingContext2D  //  2d context for menu drawing

  static #fpsCalc:number = 0               //  Store timed func to calculate fps
  static #nextFrame:number = 0             //  Store the call to the animation frame
  static #drawFps:boolean = false          //  Flag for drawing fps counter
  static #fps:number = 0                   //  Store frame rate
  static #step:number = 0                  //  Used to calculate fps
  static #lastRender:number = 0            //  Last render time
  static #frameDelta:number = 0            //  Time in ms between frames
  static #bgAnimation:Function = () => {}  //  Background animation function

  constructor() { return false }  //  Don't allow direct construction

  /**
   * Start the renderer
   * @throws Throws error if the canvas is not found
   * @throws Throws error if no menus were created
   */
  static start() {
    if(!WTGuiRenderer.#initialized) {
      const tempCanvas = <HTMLCanvasElement>document.getElementById('___wtgui_renderer_canvas_id___')
      if(tempCanvas === null)
        throw new WTGuiError(`Can't find canvas element!`, WTGuiRenderer.start)

      tempCanvas.setAttribute('width', `${document.documentElement.clientWidth}`)
      tempCanvas.setAttribute('height', `${document.documentElement.clientHeight}`)

      WTGuiRenderer.#mainCanvas = tempCanvas
      WTGuiRenderer.#mainCanvas.style.display = 'none'
      WTGuiRenderer.#ctx = <CanvasRenderingContext2D>WTGuiRenderer.#mainCanvas.getContext('2d', { willReadFrequently: true })

      const observer = new ResizeObserver(() => {
        const temp = WTGuiRenderer.#ctx.getImageData(0, 0, WTGuiRenderer.#mainCanvas.width, WTGuiRenderer.#mainCanvas.height)
        WTGuiRenderer.#mainCanvas.width = document.documentElement.clientWidth
        WTGuiRenderer.#mainCanvas.height = document.documentElement.clientHeight
        WTGuiRenderer.#ctx.putImageData(temp, 0, 0, 0, 0, WTGuiRenderer.#mainCanvas.width, WTGuiRenderer.#mainCanvas.height)
      })
      observer.observe(document.documentElement)

      WTGuiRenderer.#initialized = true
    }

    if(WTGui.data.openedMenus.length === 0 || isEmptyObject(WTGui.data.currentMenu))
      WTGui.openMenu(settings.defaultMenu)
    if(WTGui.data.openedMenus.length === 0 || isEmptyObject(WTGui.data.currentMenu))
      throw new WTGuiError(`No menus available!`, WTGuiRenderer.#render)

    WTGuiRenderer.#mainCanvas.style.display = 'block'
    WTGuiRenderer.#mainCanvas.focus()
    window.cancelAnimationFrame(WTGuiRenderer.#nextFrame)
    WTGuiRenderer.#lastRender = <number>document.timeline.currentTime
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
      throw new WTGuiError(`WTGui is already running!`, WTGuiRenderer.setBgAnimation)
    if(!(func instanceof Function))
      throw new WTGuiError(`Background animation must be a function!`, WTGuiRenderer.setBgAnimation)
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
   * @param menuItem 
   * @param currentMenu 
   */
  static #highlighter(menuItem:WTGuiItem, currentMenu:WTGuiMenu) {
    WTGuiRenderer.#ctx.fillStyle = 'rgb(255,255,0)'
    WTGuiRenderer.#ctx.fillRect(
      currentMenu.posX + (menuItem.posX - 10),
      currentMenu.posY + (menuItem.posY - 10),
      menuItem.width + 20, menuItem.height + 20)
  }

  /*
   * Render draw method
   */
  static #render() {
    if(WTGui.data.openedMenus.length === 0 || isEmptyObject(WTGui.data.currentMenu))
      WTGui.openMenu(settings.defaultMenu)

    const currentMenu = WTGui.data.currentMenu
    const ctx = WTGuiRenderer.#ctx

    //  Clear the renderer
    ctx.clearRect(0, 0, WTGuiRenderer.#mainCanvas.width, WTGuiRenderer.#mainCanvas.height)

    //  Run background animation function
    WTGuiRenderer.#bgAnimation(ctx, WTGuiRenderer.#frameDelta, WTGuiRenderer.#lastRender)

    //  Render the menu
    if(currentMenu.bgImage !== '') {
      {(currentMenu.scaleImg) ?
        ctx.drawImage(<ImageBitmap>WTGui.getImage(currentMenu.bgImage),
          currentMenu.posX + currentMenu.imgOffsetX,
          currentMenu.posY + currentMenu.imgOffsetY,
          currentMenu.width, currentMenu.height) :
        ctx.drawImage(<ImageBitmap>WTGui.getImage(currentMenu.bgImage),
          currentMenu.posX + currentMenu.imgOffsetX,
          currentMenu.posY + currentMenu.imgOffsetY)}
    } else {
      ctx.lineWidth = currentMenu.brWidth
      ctx.strokeStyle = currentMenu.brColor
      ctx.fillStyle = currentMenu.bgColor
      ctx.beginPath()
      ctx.roundRect(currentMenu.posX, currentMenu.posY,
        currentMenu.width, currentMenu.height, currentMenu.radius)
      ctx.stroke()
      ctx.fill()
    }

    //  Render active item highlighting
    if(!isEmptyObject(WTGui.data.activeItem))
      WTGuiRenderer.#highlighter(WTGui.data.activeItem, currentMenu)

    //  Render menu items
    currentMenu.items.forEach(elm => {
      if(elm.bgImage !== '') {
        {(elm.scaleImg) ?
          ctx.drawImage(<ImageBitmap>WTGui.getImage(elm.bgImage),
            elm.posX + elm.imgOffsetX,
            elm.posY + elm.imgOffsetY,
            elm.width, elm.height) :
          ctx.drawImage(<ImageBitmap>WTGui.getImage(elm.bgImage),
            elm.posX + elm.imgOffsetX,
            elm.posY + elm.imgOffsetY)}
      } else {
        ctx.lineWidth = elm.brWidth
        ctx.strokeStyle = elm.brColor
        ctx.fillStyle = elm.bgColor
        ctx.beginPath()
        ctx.roundRect(currentMenu.posX + elm.posX,
          currentMenu.posY + elm.posY,
          elm.width, elm.height, elm.radius)
        ctx.stroke()
        ctx.fill()
      }
    })

    //  Render FPS counter if enabled
    if(WTGuiRenderer.#drawFps) {
      ctx.font = settings.fpsFont
      ctx.fillStyle = settings.fpsColor
      ctx.textAlign = 'right'
      ctx.fillText(`${WTGuiRenderer.#fps}`, WTGuiRenderer.#mainCanvas.width, 12)
    }

    //  Update renderer info and request next frame
    if(WTGuiRenderer.#step === Number.MAX_VALUE) WTGuiRenderer.#step = 0
    WTGuiRenderer.#step++
    WTGuiRenderer.#frameDelta = <number>document.timeline.currentTime - WTGuiRenderer.#lastRender
    WTGuiRenderer.#lastRender = <number>document.timeline.currentTime
    WTGuiRenderer.#nextFrame = window.requestAnimationFrame(WTGuiRenderer.#render)
  }

  /**
   * Get the frames per second
   * @returns Frames per second
   */
  static get fps() { return WTGuiRenderer.#fps }
}
