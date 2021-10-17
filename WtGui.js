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
     * Config this
     */
    static settings = {
        width: Number(0),
        height: Number(0),
        clearColor: 'rgba(0,0,0,0)',
        bgimage: {
            file: undefined
        }
    }

    /*
     * Read this
     */
    static info = {
        fps: () => { return WtGui.#data.fps },
        ticks: () => { return WtGui.#data.ticks }
    }

    /*
     * From here
     */
    static #data = {
        fps: Number(0),
        ticks: BigInt('0')
    }

    /*
     *
     */
    static #mouseCords = {
        pos_x: Number(0),
        pos_y: Number(0)
    }

    static #menus = []               //  Array of available menus
    static #openedMenus = []         //  Array of opened menus
    static #currentMenu = undefined  //  Current opened menu
    static #canvas = null            //  Reference to canvas
    static #gameRunning = false      //  Game is currently running

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
    static startRenderer = () => { WtGui.#renderer.start() }

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

            WtGui.#canvas.renderCanvas = document.createElement('canvas')
            WtGui.#configRan = true
        }

        WtGui.#canvas.width = WtGui.settings.width
        WtGui.#canvas.height = WtGui.settings.height
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
        fpsReset: null,
        rate: Number(0),

        /*
         *
         */
        start: () => {
            WtGui.#configWtGui()
            WtGui.#canvas.renderCanvas.width = WtGui.settings.width
            WtGui.#canvas.renderCanvas.height = WtGui.settings.height
            WtGui.#data.fps = 0
            WtGui.#data.ticks = 0n
            window.requestAnimationFrame(WtGui.#renderer.render)
            WtGui.#renderer.fpsReset = setInterval(() => {
                WtGui.#data.fps = WtGui.#renderer.rate
                WtGui.#renderer.rate = 0
            }, 1000)
        },

        /*
         *
         */
        render: () => {
            if(WtGui.#openedMenus.length === 0 || WtGui.#currentMenu === undefined) {
                if(WtGui.#gameRunning) WtGui.openMenu('game_menu')
                else WtGui.openMenu('main_menu')
            }
            if(WtGui.#currentMenu === undefined) throw new WtGuiError(`No menus available.`)
            const ctx = WtGui.#canvas.renderCanvas.getContext('2d')

            //  Clear the renderer
            ctx.fillStyle = WtGui.settings.clearColor
            ctx.fillRect(0, 0, WtGui.settings.width, WtGui.settings.height)

            //  Render the menu
            ctx.fillStyle = WtGui.#currentMenu.bgcolor
            ctx.fillRect(WtGui.#currentMenu.pos_x, WtGui.#currentMenu.pos_y,
                WtGui.#currentMenu.width, WtGui.#currentMenu.height)

            //  Render menu items
            WtGui.#currentMenu.items.forEach(elm => {
                ctx.fillStyle = elm.bgcolor
                ctx.fillRect(WtGui.#currentMenu.pos_x + elm.pos_x,
                    WtGui.#currentMenu.pos_y + elm.pos_y,
                    elm.width, elm.height)
            })

            WtGui.#canvas.getContext('2d').drawImage(WtGui.#canvas.renderCanvas, 0, 0)
            WtGui.#renderer.rate++
            WtGui.#data.ticks++
            window.requestAnimationFrame(WtGui.#renderer.render)
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
