/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import fs from 'fs'
import path from 'node:path'

import { settings } from './WTGuiSettings.js'
import { WTGuiRenderer } from './WTGuiRenderer.js'
import { WTGuiMenu } from './WTGuiMenu.js'
import { WTGuiItem } from './items/WTGuiItem.js'
import { WTGuiError } from './WTGuiError.js'
import { AABB } from './algorithms.js'

interface data {
  configRan:boolean
  imageFiles:Array<{ id:string, file:HTMLImageElement }>
  audioFiles:Array<{ id:string, file:HTMLAudioElement }>
  menus:Array<WTGuiMenu>
  openedMenus:Array<WTGuiMenu>
  currentMenu:WTGuiMenu
  activeItem:WTGuiItem
}

/**
 * WTGui main object
 */
export class WTGui {
  static menuStorage = undefined  //  Storage for saving menu settings selection

  static #data:data = {
    configRan: false,            //  Flag to verify config runs once
    imageFiles: [],              //  Array of image files
    audioFiles: [],              //  Array of audio files
    menus: [],                   //  Array of available menus
    openedMenus: [],             //  Stack of opened menus
    currentMenu: <WTGuiMenu>{},  //  Current opened menu
    activeItem: <WTGuiItem>{}    //  Active menu item
  }

  constructor() { return false }  //  Don't allow direct construction

  static get data() { return WTGui.#data }

  /**
   * Configure canvas and start the gui
   */
  static startGui() {
    if(WTGui.#data.configRan) throw new WTGuiError(`WTGui is already running.`, WTGui.startGui)
    if(WTGui.menuStorage === undefined)
      throw new WTGuiError(`Please configure menu settings storage.`, WTGui.startGui)

    WTGuiRenderer.initialize()

    const canvas = <HTMLElement>document.getElementById('!@___wtgui_renderer_canvas_id___@!')
    window.addEventListener('keydown', WTGui.#events.onKeyDown, false)
    window.addEventListener('keyup', WTGui.#events.onKeyUp, false)

    canvas.addEventListener('mousedown', WTGui.#events.onMouseDown, false)
    canvas.addEventListener('mouseup', WTGui.#events.onMouseUp, false)
    canvas.addEventListener('mousemove', WTGui.#events.onMouseMove, false)
    canvas.addEventListener('wheel', WTGui.#events.onMouseWheel, false)

    /*canvas.addEventListener('touchstart', WTGui.#events.onTouchStart, false)
    canvas.addEventListener('touchend', WTGui.#events.onTouchEnd, false)
    canvas.addEventListener('touchcancel', WTGui.#events.onTouchCancel, false)
    canvas.addEventListener('touchmove', WTGui.#events.onTouchMove, false)
    canvas.addEventListener('scroll', WTGui.#events.onScroll, false)*/

    WTGui.#data.configRan = true
    WTGuiRenderer.start()
  }

  /**
   * Add an image
   * @param id Reference name for image
   * @param file Filename and path of image
   */
  static addImage = (id:string, file:string) => {
    if(WTGui.getImage(id) !== undefined)
      throw new WTGuiError(`Image ID '${id}' already exists.`, WTGui.addImage)
    if(!fs.existsSync(path.normalize(file)))
      throw new WTGuiError(`'${file}' does not exist.`, WTGui.addImage)
    const tempImg = new Image()
    tempImg.src = file
    WTGui.#data.imageFiles.push({ id: id, file: tempImg })
  }

  /**
   * Add multiple images at once
   * @param data An array of objects [ { id: , file: } ]
   */
  static addImages = (data:Array<{ id:string, file:string }>) => {
    data.forEach(item => { WTGui.addImage(item.id, item.file) })
  }

  /**
   * Get an image
   * @param id ID of image
   * @returns Image by ID reference
   */
  static getImage = (id:string) => {
    const tempImg = WTGui.#data.imageFiles.find(elm => elm.id === id)
    if(tempImg === undefined) return undefined
    return tempImg.file
  }

  /**
   * 
   * @param id 
   * @param file 
   */
  static addAudio = (id:string, file:string) => {
    if(WTGui.getAudio(id) !== undefined)
      throw new WTGuiError(`Audio ID '${id}' already exists.`, WTGui.addAudio)
    if(!fs.existsSync(path.normalize(file)))
      throw new WTGuiError(`'${file}' does not exist.`, WTGui.addAudio)
    const tempAudio = new Audio()
    tempAudio.src = file
    WTGui.#data.audioFiles.push({ id: id, file: tempAudio })
  }

  /**
   * 
   * @param data 
   */
  static addAudioFiles = (data:Array<{ id:string, file:string }>) => {
    data.forEach(item => { WTGui.addAudio(item.id, item.file) })
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  static getAudio = (id:string) => {
    const tempAudio = WTGui.#data.audioFiles.find(elm => elm.id === id)
    if(tempAudio === undefined) return undefined
    return tempAudio.file
  }

  /**
   * Add a new menu
   * @param menuObj Menu object to add
   */
  static addMenu = (menuObj:WTGuiMenu) => {
    if(!(menuObj instanceof WTGuiMenu))
      throw new WTGuiError(`Menu is not a valid 'WTGuiMenu' object.`, WTGui.addMenu)
    if(WTGui.getMenu(menuObj.id) !== undefined)
      throw new WTGuiError(`Menu ID '${menuObj.id}' already exists.`, WTGui.addMenu)
    WTGui.#data.menus.push(menuObj)
  }

  /**
   * Get a menu.
   * @param id ID of menu to get
   * @returns Menu object by ID
   */
  static getMenu = (id:string) => {
    return WTGui.#data.menus.find(elm => elm.id === id)
  }

  /**
   * Add an item to a menu
   * @param menuId ID of menu it add item to
   * @param itemObj Item object to add
   */
  static addItem = (menuId:string, itemObj:WTGuiItem) => {
    const menu = WTGui.getMenu(menuId)
    if(menu === undefined)
      throw new WTGuiError(`'${menuId}' - Menu does not exist.`, WTGui.addItem)
    menu.addItem(itemObj)
  }

  /**
   * Open a menu
   * @param menuId Menu ID to open
   */
  static openMenu = (menuId:string) => {
    const tempMenu = WTGui.getMenu(menuId)
    if(tempMenu === undefined)
      throw new WTGuiError(`'${menuId}' - Menu does not exist.`, WTGui.openMenu)
    WTGui.#data.openedMenus.push(tempMenu)
    WTGui.#data.currentMenu = WTGui.#data.openedMenus[(WTGui.#data.openedMenus.length - 1)]
    WTGui.#data.activeItem = WTGui.#data.currentMenu.selectableItems[0]
  }

  /**
   * Close one or all menus
   * @param closeAll True to close all menus, false to close the top menu
   */
  static closeMenu = (closeAll:boolean) => {
    if(closeAll) {
      WTGui.#data.openedMenus = []
      WTGui.#data.currentMenu = <WTGuiMenu>{}
    } else {
      WTGui.#data.openedMenus.pop()
      if(WTGui.#data.openedMenus.length === 0) WTGui.openMenu(settings.defaultMenu)
      else WTGui.#data.currentMenu = WTGui.#data.openedMenus[(WTGui.#data.openedMenus.length - 1)]
    }
  }

  /** Private gui actions */
  static #actions = {
    /** Store running timer function */
    scrollTimer: new NodeJS.Timeout(),

    /**
     * Timer function to scroll left
     */
    scrollLeft: () => { WTGui.#data.activeItem.onLeft() },

    /**
     * Timer function to scroll right
     */
    scrollRight: () => { WTGui.#data.activeItem.onRight() },

    /**
     * Move the active menu item up in the index
     * @returns 
     */
    menuItemUp: () => {
      let idx = WTGui.#data.currentMenu.selectableItems.findIndex(
        elm => elm === WTGui.#data.activeItem)
      if(idx > 0) {
        --idx
        WTGui.#data.activeItem = WTGui.#data.currentMenu.selectableItems[idx]
        return true
      }
      return false
    },

    /**
     * Move the active menu item down in the index
     * @returns 
     */
    menuItemDown: () => {
      let idx = WTGui.#data.currentMenu.selectableItems.findIndex(
        elm => elm === WTGui.#data.activeItem)
      if(idx < WTGui.#data.currentMenu.selectableItems.length - 1 && idx >= 0) {
        ++idx
        WTGui.#data.activeItem = WTGui.#data.currentMenu.selectableItems[idx]
        return true
      }
      return false
    },

    /**
     * Start scrolling through the menu item options
     * @param direction 
     */
    menuItemScrollStart: (direction:boolean) => {
      clearInterval(WTGui.#actions.scrollTimer)
      {(direction) ?
        WTGui.#actions.scrollTimer = setInterval(
          WTGui.#actions.scrollLeft, settings.scrollSpeed) :
        WTGui.#actions.scrollTimer = setInterval(
          WTGui.#actions.scrollRight, settings.scrollSpeed)}
    },

    /**
     * Stop scrolling through the menu item options
     */
    menuItemScrollStop: () => {
      clearInterval(WTGui.#actions.scrollTimer)
    },

    /**
     * Process menu item selection
     * @param event 
     */
    menuItemSelect: (event:Event) => {
      if(WTGui.#data.activeItem !== undefined) WTGui.#data.activeItem.onSelect(event)
    },

    /**
     * Menu cancel action
     */
    menuCancel: () => {
      //
    }
  }

  static #events = {
    /*
     * Key Down Events
     */
    onKeyDown: (event:KeyboardEvent) => {
      if(event.repeat) return
      Object.keys(settings.actionBindings.keys).forEach(action => {
        settings.actionBindings.keys[action].forEach(binding => {
          if(event.key.toUpperCase() === binding.toUpperCase())
            WTGui.#events.trigger.down(action, event)
        })
      })
    },

    /*
     * Key Up Events
     */
    onKeyUp: (event:KeyboardEvent) => {
      Object.keys(settings.actionBindings.keys).forEach(action => {
        settings.actionBindings.keys[action].forEach(binding => {
          if(event.key.toUpperCase() === binding.toUpperCase())
            WTGui.#events.trigger.up(action, event)
        })
      })
    },

    /*
     * Mouse Down Event
     */
    onMouseDown: (event:MouseEvent) => {
      const hitX = event.offsetX - WTGui.#data.currentMenu.posX
      const hitY = event.offsetY - WTGui.#data.currentMenu.posY
      //  See if the mouse clicked on anything
      const res:any = AABB(
        {
            posX: hitX,
            posY: hitY,
            width: settings.mouseSize,
            height: settings.mouseSize,
        },
        WTGui.#data.currentMenu.items
      )
      if(res !== undefined && res.canSelect) {
        WTGui.#data.activeItem = res
        if(res.scrollable) {
          (hitX - res.posX < res.width / 2) ?
            WTGui.#actions.menuItemScrollStart(true) :
            WTGui.#actions.menuItemScrollStart(false)
        }
        else res.onSelect(event, (hitX - res.posX), (hitY - res.posY))
      }
    },

    /*
     * Mouse Up Event
     */
    onMouseUp: (event:MouseEvent) => { WTGui.#actions.menuItemScrollStop() },

    /*
     * Mouse Move Event
     */
    onMouseMove: (event:MouseEvent) => {
      //  If the mouse is pointing at anything, make it the active item
      const res:any = AABB(
        {
          posX: event.offsetX - WTGui.#data.currentMenu.posX,
          posY: event.offsetY - WTGui.#data.currentMenu.posY,
          width: settings.mouseSize,
          height: settings.mouseSize,
        },
        WTGui.#data.currentMenu.items
      )
      if(res !== undefined && res.canSelect) {
        if(WTGui.#data.activeItem !== res) WTGui.#actions.menuItemScrollStop()
        WTGui.#data.activeItem = res
      }
    },

    /*
     * Mouse Wheel
     */
    onMouseWheel: (event:MouseEvent) => {
      event.preventDefault()
    },


    /* 
     * wip
     *
    onTouchStart: (event:TouchEvent) => {
      console.log(event)
      event.targetTouches.forEach((touch:Touch) => {
        console.log(touch)
        const hitX = 0
        const hitY = 0

        const res = AABB(
          {
            posX: touch.clientX - WTGui.#data.currentMenu.posX,
            posY: touch.clientY - WTGui.#data.currentMenu.posY,
            width: touch.radiusX,
            height: touch.radiusY,
          },
          WTGui.#data.currentMenu.items
        )
        if(res !== undefined && res.canSelect)
          res.onSelect(event)
      })
    },

    onTouchEnd: (event:TouchEvent) => {
      console.log(event)
    },

    onTouchCancel: (event:TouchEvent) => {
      console.log(event)
    },

    onTouchMove: (event:TouchEvent) => {
      console.log(event)
    },

    onScroll: (event:Event) => {
      console.log(event)
      //event.preventDefault()
    },
    */


    /*
     * wip
     *
    onButtonDown: (event:GamepadEvent) => {
      if(event.repeat) return
      Object.keys(settings.actionBindings.buttons).forEach(action => {
        settings.actionBindings.keys[action].forEach(binding => {
          if(event.gamepad === binding) WTGui.#events.trigger.down(action, event)
        })
      })
    },

    /*
     * wip
     *
    onButtonUp: (event:GamepadEvent) => {
      Object.keys(settings.actionBindings.buttons).forEach(action => {
        settings.actionBindings.keys[action].forEach(binding => {
          if(event.gamepad === binding) WTGui.#events.trigger.up(action, event)
        })
      })
    },
    */

    /*
     * Input triggers
     */
    trigger: {
      /*
       * Input on down triggers
       */
      down: (action:string, event:Event) => {
        switch(action) {
          case 'up':
            WTGui.#actions.menuItemUp()
            break
          case 'down':
            WTGui.#actions.menuItemDown()
            break
          case 'left':
            if(WTGui.#data.activeItem.scrollable)
              WTGui.#actions.menuItemScrollStart(true)
            break
          case 'right':
            if(WTGui.#data.activeItem.scrollable)
              WTGui.#actions.menuItemScrollStart(false)
            break
          case 'select':
            WTGui.#actions.menuItemSelect(event)
            break
          case 'cancel':
            WTGui.#actions.menuCancel()
            break
        }
      },

      /*
       * Input on up triggers
       */
      up: (action:string, event:Event) => {
        switch(action) {
          case 'left':
            WTGui.#actions.menuItemScrollStop()
            break
          case 'right':
            WTGui.#actions.menuItemScrollStop()
            break
        }
      }
    }
  }

  /**
   * Debug helper fuctions.
   */
  static debug = {
    /**
     * Log menu objects to console.
     */
    logMenus: () => {
      WTGui.#data.menus.forEach(menu => { console.log(JSON.parse(JSON.stringify(menu))) })
    },

    /**
     * Log opened menu stack to console.
     */
    logMenuStack: () => {
      WTGui.#data.openedMenus.forEach(menu => { console.log(JSON.parse(JSON.stringify(menu))) })
    },

    /**
     * Log image file list to console.
     */
    logImageFiles: () => {
      WTGui.#data.imageFiles.forEach(img => { console.log(JSON.parse(JSON.stringify(img))) })
    },

    /**
     * Log audio file list to console.
     */
    logAudioFiles: () => {
      WTGui.#data.audioFiles.forEach(audio => { console.log(JSON.parse(JSON.stringify(audio))) })
    }
  }
}
