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
        if(data[arg] === undefined)
            throw new WtGuiError(`${arg} undefined.`)
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
        bgcolor: 'rgba(0,0,0,255)',
        canvas: 'WTGuiCanvas'
    }
    static #singleton = undefined

    #menus = []
    #openedMenus = []
    #renderer = {}

    #menuRunning = false
    #gameRunning = false

    /*
     *
     */
    constructor(args) {
        if(WtGui.#singleton === undefined) WtGui.#singleton = this 
        else return WtGui.#singleton
        var args = args || {}
        if(args.width !== undefined) WtGui.settings.width = args.width
        if(args.height !== undefined) WtGui.settings.height = args.height
        if(!(WtGui.settings.width > 0)) throw new WtGuiError(`width undefined.`)
        if(!(WtGui.settings.height > 0)) throw new WtGuiError(`height undefined.`)
        return WtGui.#singleton
    }

    /*
     *
     */
    #renderGui = () => {
        if(this.#openedMenus.length === 0) {
            if(this.#gameRunning) this.openMenu('game_menu')
            else this.openMenu('main_menu')
        }
        if(this.#openedMenus.length === 0) throw new WtGuiError(`No menus available.`)
        this.#openedMenus[(this.#openedMenus.length - 1)]
        const ctx = this.#getCanvas().getContext('2d')
        ctx.fillStyle = WtGui.settings.bgcolor
        ctx.fillRect(0, 0, WtGui.settings.width, WtGui.settings.height)
    }

    /*
     *
     */
    #configCanvas = () => {
        const canvas = this.#getCanvas()
        canvas.width = WtGui.settings.width
        canvas.height = WtGui.settings.height
    }

    /*
     *
     */
    #getCanvas = () => { return document.getElementById(WtGui.settings.canvas) }

    /*
     *
     */
    startRenderer = () => {
        this.#configCanvas()
        this.#renderer = setInterval(this.#renderGui(), 33)
        this.#menuRunning = true
    }

    /*
     *
     */
    stopRenderer = () => {
        clearInterval(this.#renderer)
        this.#menuRunning = false
    }

    /*
     *
     */
    isRunning = () => { return this.#menuRunning }

    /*
     *
     */
    addMenu = (menuObj) => {
        if(!(menuObj instanceof WtGuiMenu)) return false         //  Verify proper menu object
        if(this.getMenu(menuObj.id) !== undefined) return false  //  Verify menu does not exist
        this.#menus.push(menuObj)                                //  Add menu
        return true
    }

    /*
     *
     */
    getMenu = (menuId) => { return this.#menus.find(elm => elm.id === menuId) }

    /*
     *
     */
    addItem = (menuId, itemObj) => {
        if(!(itemObj instanceof WtGuiItem)) return false  //  Verify proper item object
        const menu = this.getMenu(menuId)
        console.log(menu)
        if(menu === undefined) return false               //  Verify menu exists
        //  Verify item does not already exist
        if(menu.items.find(elm => elm.id === itemObj.id) !== undefined) return false
        menu.items.push(itemObj)                          //  Add item
        return true
    }

    /*
     *
     */
    openMenu = (menuId) => {
        const tempMenu = this.getMenu(menuId)
        if(tempMenu === undefined) return false
        this.#openedMenus.push(tempMenu)
        return true
    }

    /*
     *
     */
    closeMenu = (bool) => { (bool) ? this.#openedMenus = [] : this.#openedMenus.pop() }
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
              'width', 'height' ])
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
