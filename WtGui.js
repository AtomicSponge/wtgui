/* ****************************************
 *
 * Filename:  WtGui.js
 * 
 **************************************** */

const { Gamepads } = require('gamepads')

/*
 *
 */
class WtGuiError extends Error {
    constructor(message) {
        super(message)
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, WtGuiError);
        }
    }
}
exports.WtGuiError = WtGuiError

/*
 *
 */
const argParser = (scope, data, args) => {
    args.forEach((arg) => {
        if(data[arg] === undefined) throw new WtGuiError(`${arg} undefined.`)
        scope[arg] = data[arg]
    })
}

/*
 *
 */
class WtGui {
    /*
     *
     */
    static settings = {
        width: 0,
        height: 0,
        bgcolor: 'rgba(0,0,0,0)',
        bgimage: {
            file: undefined
        }
    }

    /*
     *
     */
    static #mouseCords = {
        pos_x: 0,
        pos_y: 0
    }

    static #menus = []           //  Array of available menus
    static #openedMenus = []     //  Array of opened menus
    static #currentMenu = null   //  Current opened menu
    static #canvas = null        //  Reference to canvas
    static #ctx = null           //  Reference to canvas contex
    static #menuRunning = false  //  Menu system currently running
    static #gameRunning = false  //  Game is currently running

    /*
     * Don't allow direct construction
     */
    constructor() { return false }

    /*
     *
     */
    static setCanvas = (canvas) => { WtGui.#canvas = canvas }

    /*
     *
     */
    static #configRan = false
    static #configWtGui = () => {
        if(!WtGui.#configRan) {
            WtGui.#canvas.addEventListener('mousedown', WtGui.#events.onMouseDown, false)
            WtGui.#canvas.addEventListener('mouseup', WtGui.#events.onMouseUp, false)
            WtGui.#canvas.addEventListener('mousemove', WtGui.#events.onMouseMove, false)

            WtGui.#canvas.addEventListener("touchstart", WtGui.#events.onTouchStart, false)
            WtGui.#canvas.addEventListener("touchend", WtGui.#events.onTouchEnd, false)
            WtGui.#canvas.addEventListener("touchcancel", WtGui.#events.onTouchCancel, false)
            WtGui.#canvas.addEventListener("touchmove", WtGui.#events.onTouchMove, false)

            window.addEventListener('keydown', WtGui.#events.onKeyDown, false)
            window.addEventListener('keyup', WtGui.#events.onKeyUp, false)

            WtGui.#configRan = true
        }

        WtGui.#canvas.width = WtGui.settings.width
        WtGui.#canvas.height = WtGui.settings.height

        WtGui.#ctx = WtGui.#canvas.getContext('2d')
    }

    /*
     *
     */
    static isRunning = () => { return WtGui.#menuRunning }

    /*
     *
     */
    static startRenderer = () => {
        WtGui.#renderer.start()
    }

    /*
     *
     */
    static stopRenderer = () => {
        WtGui.#renderer.stop()
    }

    /*
     *
     */
    static addMenu = (menuObj) => {
        if(!(menuObj instanceof WtGuiMenu)) {                     //  Verify proper menu object
            menuObj = WtGui.#buildMenu(menuObj)                   //  Try to build menu
            if(!(menuObj instanceof WtGuiMenu)) return false      //  Fail if still not a menu
        }
        if(WtGui.getMenu(menuObj.id) !== undefined) return false  //  Verify menu does not exist
        WtGui.#menus.push(menuObj)                                //  Add menu
        return true
    }

    /*
     *
     */
    static #buildMenu = (menuObj) => {
        return menuObj
    }

    /*
     *
     */
    static getMenu = (menuId) => { return WtGui.#menus.find(elm => elm.id === menuId) }

    /*
     *
     */
    static addItem = (menuId, itemObj) => {
        if(!(itemObj instanceof WtGuiItem)) return false  //  Verify proper item object
        const menu = WtGui.getMenu(menuId)
        if(menu === undefined) return false               //  Verify menu exists
        //  Verify item does not already exist
        if(menu.items.find(elm => elm.id === itemObj.id) !== undefined) return false
        menu.items.push(itemObj)                          //  Add item
        return true
    }

    /*
     *
     */
    static openMenu = (menuId) => {
        const tempMenu = WtGui.getMenu(menuId)
        if(tempMenu === undefined) return false
        WtGui.#openedMenus.push(tempMenu)
        WtGui.#currentMenu = WtGui.#openedMenus[(WtGui.#openedMenus.length - 1)]
        return true
    }

    /*
     *
     */
    static closeMenu = (bool) => {
        if(bool) {
            WtGui.#openedMenus = []
            if(WtGui.#gameRunning) return // go back to game
            else WtGui.openMenu('main_menu')
        } else {
            WtGui.#openedMenus.pop()
            if(WtGui.#openedMenus.length === 0) {
                if(WtGui.#gameRunning) return // go back to game
                else WtGui.openMenu('main_menu')
            }
            WtGui.#currentMenu = WtGui.#openedMenus[(WtGui.#openedMenus.length - 1)]
        }
    }

    /*
     *
     */
    static #renderer = {
        renderFunc: null,

        start: () => {
            WtGui.#configWtGui()
            WtGui.stopRenderer()
            this.renderFunc = setInterval(this.render, 33)
            WtGui.#menuRunning = true
        },
    
        /*
         *
         */
        stop: () => {
            clearInterval(this.renderFunc)
            WtGui.#menuRunning = false
        },

        /*
         *
         */
        render: () => {
            if(WtGui.#openedMenus.length === 0) {
                if(WtGui.#gameRunning) WtGui.openMenu('game_menu')
                else WtGui.openMenu('main_menu')
            }
            if(WtGui.#openedMenus.length === 0) throw new WtGuiError(`No menus available.`)

            //  Render the background
            WtGui.#ctx.fillStyle = WtGui.settings.bgcolor
            WtGui.#ctx.fillRect(0, 0, WtGui.settings.width, WtGui.settings.height)

            //  Render the menu
            WtGui.#ctx.fillStyle = WtGui.#currentMenu.bgcolor
            WtGui.#ctx.fillRect(WtGui.#currentMenu.pos_x, WtGui.#currentMenu.pos_y,
                WtGui.#currentMenu.width, WtGui.#currentMenu.height)

            //  Render menu items
            WtGui.#currentMenu.items.forEach(elm => {
                WtGui.#ctx.fillStyle = elm.bgcolor
                WtGui.#ctx.fillRect(WtGui.#currentMenu.pos_x + elm.pos_x,
                    WtGui.#currentMenu.pos_y + elm.pos_y,
                    elm.width, elm.height)
            })
        }
    }

    /*
     *
     */
    static #events = {
        /*
         *
         */
        onMouseDown: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onMouseUp: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onMouseMove: (event) => {
            WtGui.#mouseCords.pos_x = 0
            WtGui.#mouseCords.pos_y = 0
        },

        /*
         *
         */
        onTouchStart: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onTouchEnd: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onTouchCancel: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onTouchMove: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onKeyDown: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onKeyUp: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onButtonDown: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onButtonUp: (event) => {
            //alert(event)
        }
    }

    /*
     *
     */
    static tests = {
        printMenu: () => {
            console.log('menu:')
            console.log(WtGui.#menus)
        }
    }
}
exports.WtGui = WtGui

/*
 *
 */
class WtGuiMenu {
    /*
     *
     */
    constructor(args) {
        var args = args || {}
        argParser(this, args,
            [ 'id', 'title',
              'pos_x', 'pos_y',
              'width', 'height' ])
        this.items = []
        this.bgimage = args.bgimage || undefined
        this.bgcolor = args.bgcolor || 'rgb(0,0,0)'
        this.fgcolor = args.fgcolor || 'rgb(255,255,255)'
    }
}
exports.WtGuiMenu = WtGuiMenu

/*
 *
 */
class WtGuiItem {
    /*
     *
     */
    constructor(args) {
        var args = args || {}
        argParser(this, args,
            [ 'id', 'title',
              'pos_x', 'pos_y',
              'width', 'height'])
        this.bgcolor = args.bgcolor || 'rgb(255,0,0)'
        this.fgcolor = args.fgcolor || 'rgb(255,255,255)'
    }
}
exports.WtGuiItem = WtGuiItem

/*
 *
 */
class WtGuiButton extends WtGuiItem {
    /*
     *
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiButton = WtGuiButton

/*
 *
 */
class WtGuiLabel extends WtGuiItem {
    /*
     *
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiLabel = WtGuiLabel

/*
 *
 */
class WtGuiInput extends WtGuiItem {
    /*
     *
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiInput = WtGuiInput
