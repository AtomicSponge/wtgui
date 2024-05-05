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

interface bgAnimation {
  animate(ctx:CanvasRenderingContext2D, frameDelta:number, lastRender:number):void
}

export class WTGuiRenderer {
  static #initialized:boolean = false  //  Flag if the renderer was initialized

  static #mainCanvas:HTMLCanvasElement      //  Main canvas
  static #mainCtx:CanvasRenderingContext2D  //  Main rendering context
  static #bgCanvas:HTMLCanvasElement        //  Background canvas
  static #bgCtx:CanvasRenderingContext2D    //  Background rendering context
  static #menuCanvas:HTMLCanvasElement      //  Menu canvas
  static #menuCtx:CanvasRenderingContext2D  //  Menu rendering context

  static #menuPosX:number = 0               //  Menu offset possition X
  static #menuPosY:number = 0               //  Menu offset possition Y

  static #fpsCalc:number = 0                //  Store timed func to calculate fps
  static #nextFrame:number = 0              //  Store the call to the animation frame
  static #drawFps:boolean = false           //  Flag for drawing fps counter
  static #fps:number = 0                    //  Store frame rate
  static #step:number = 0                   //  Used to calculate fps
  static #lastRender:number = 0             //  Last render time
  static #frameDelta:number = 0             //  Time in ms between frames

  static #bgAnimation:bgAnimation = {animate() {}}  //  Background animation object

  constructor() { return false }  //  Don't allow direct construction

  /**
   * Start the renderer
   * @throws Throws error if the canvas is not found
   * @throws Throws error if menu view size is not set
   * @throws Throws error if no menus were created
   */
  static start() {
    if(!WTGuiRenderer.#initialized) {
      const tempCanvas = <HTMLCanvasElement>document.getElementById('___wtgui_renderer_canvas_id___')
      if(tempCanvas === null)
        throw new WTGuiError(`Can't find canvas element!`, WTGuiRenderer.start)

      tempCanvas.setAttribute('width', `${document.documentElement.clientWidth}`)
      tempCanvas.setAttribute('height', `${document.documentElement.clientHeight}`)

      //  Configure main canvas & context
      WTGuiRenderer.#mainCanvas = tempCanvas
      WTGuiRenderer.#mainCanvas.style.display = 'none'
      WTGuiRenderer.#mainCtx = <CanvasRenderingContext2D>WTGuiRenderer.#mainCanvas.getContext('2d')

      //  Configure background canvas & context
      WTGuiRenderer.#bgCanvas = document.createElement('canvas')
      WTGuiRenderer.#bgCanvas.width = document.documentElement.clientWidth
      WTGuiRenderer.#bgCanvas.height = document.documentElement.clientHeight
      WTGuiRenderer.#bgCtx = <CanvasRenderingContext2D>WTGuiRenderer.#bgCanvas.getContext('2d')

      //  Configure menu canvas & context
      if(settings.viewWidth === 0 || settings.viewHeight === 0)
        throw new WTGuiError(`Must define menu view size!`, WTGuiRenderer.start)
      WTGuiRenderer.#menuCanvas = document.createElement('canvas')
      WTGuiRenderer.#menuCanvas.width = settings.viewWidth
      WTGuiRenderer.#menuCanvas.height = settings.viewHeight
      WTGuiRenderer.#menuCtx = <CanvasRenderingContext2D>WTGuiRenderer.#menuCanvas.getContext('2d')

      //  Calculate the menu X/Y position offsets
      WTGuiRenderer.#menuPosX = (WTGuiRenderer.#mainCanvas.width - WTGuiRenderer.#menuCanvas.width) / 2
      WTGuiRenderer.#menuPosY = (WTGuiRenderer.#mainCanvas.height - WTGuiRenderer.#menuCanvas.height) / 2

      const observer = new ResizeObserver(() => {
        WTGuiRenderer.#mainCanvas.width = WTGuiRenderer.#bgCanvas.width = document.documentElement.clientWidth
        WTGuiRenderer.#mainCanvas.height = WTGuiRenderer.#bgCanvas.height = document.documentElement.clientHeight
        WTGuiRenderer.#menuPosX = (WTGuiRenderer.#mainCanvas.width - WTGuiRenderer.#menuCanvas.width) / 2
        WTGuiRenderer.#menuPosY = (WTGuiRenderer.#mainCanvas.height - WTGuiRenderer.#menuCanvas.height) / 2
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
   * Set the background animation object
   * @param obj New animation object
   */
  static setBgAnimation(obj:bgAnimation) {
    if(WTGui.data.initialized)
      throw new WTGuiError(`WTGui is already running!`, WTGuiRenderer.setBgAnimation)
    if(!(obj instanceof Object))
      throw new WTGuiError(`Background animation must be an object!`, WTGuiRenderer.setBgAnimation)
    WTGuiRenderer.#bgAnimation = obj
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
    WTGuiRenderer.#mainCtx.fillStyle = 'rgb(255,255,0)'
    WTGuiRenderer.#mainCtx.fillRect(
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

    WTGuiRenderer.#mainCtx.clearRect(0, 0, WTGuiRenderer.#bgCanvas.width, WTGuiRenderer.#bgCanvas.height)

    //  Run background animation function
    WTGuiRenderer.#bgCtx.clearRect(0, 0, WTGuiRenderer.#bgCanvas.width, WTGuiRenderer.#bgCanvas.height)
    WTGuiRenderer.#bgAnimation.animate(WTGuiRenderer.#bgCtx, WTGuiRenderer.#frameDelta, WTGuiRenderer.#lastRender)
    WTGuiRenderer.#mainCtx.drawImage(WTGuiRenderer.#bgCanvas, 0, 0)

    const currentMenu = WTGui.data.currentMenu
    const ctx = WTGuiRenderer.#menuCtx
    ctx.clearRect(0, 0, WTGuiRenderer.#menuCanvas.width, WTGuiRenderer.#menuCanvas.height)

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

    //  Draw the rendered menu to the main context
    WTGuiRenderer.#mainCtx.drawImage(WTGuiRenderer.#menuCanvas, WTGuiRenderer.#menuPosX, WTGuiRenderer.#menuPosY)

    //  Render FPS counter if enabled
    if(WTGuiRenderer.#drawFps) {
      WTGuiRenderer.#mainCtx.font = settings.fpsFont
      WTGuiRenderer.#mainCtx.fillStyle = settings.fpsColor
      WTGuiRenderer.#mainCtx.textAlign = 'right'
      WTGuiRenderer.#mainCtx.fillText(`${WTGuiRenderer.#fps}`, WTGuiRenderer.#mainCanvas.width, 12)
    }

    //  Update renderer info and request next frame
    if(WTGuiRenderer.#step === Number.MAX_VALUE) WTGuiRenderer.#step = 0
    WTGuiRenderer.#step++
    WTGuiRenderer.#frameDelta = <number>document.timeline.currentTime - WTGuiRenderer.#lastRender
    WTGuiRenderer.#lastRender = <number>document.timeline.currentTime
    WTGuiRenderer.#nextFrame = window.requestAnimationFrame(WTGuiRenderer.#render)
  }

  /** Get the width of the renderer */
  static get width() { return WTGuiRenderer.#mainCanvas.width }
  /** Get the height of the renderer */
  static get height() { return WTGuiRenderer.#mainCanvas.height }
  /** Get the frames per second */
  static get fps() { return WTGuiRenderer.#fps }
  /** Get the menu X offset position  */
  static get menuPosX() { return WTGuiRenderer.#menuPosX }
  /** Get the menu Y offset position  */
  static get menuPosY() { return WTGuiRenderer.#menuPosY }
}
