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
    }
    //static #singleton = undefined

    static #menus = []
    static #openedMenus = []
    static #renderer = {}
    static #canvas = null

    static #menuRunning = false
    static #gameRunning = false

    /*
     *
     */
    constructor() {
        //if(WtGui.#singleton === undefined) WtGui.#singleton = this 
        //return WtGui.#singleton
        return false
    }

    /*
     *
     */
    static #renderGui = () => {
        if(WtGui.#openedMenus.length === 0) {
            if(WtGui.#gameRunning) WtGui.openMenu('game_menu')
            else WtGui.openMenu('main_menu')
        }
        if(WtGui.#openedMenus.length === 0) throw new WtGuiError(`No menus available.`)
        //WtGui.#openedMenus[(WtGui.#openedMenus.length - 1)]
        const ctx = WtGui.#canvas.getContext('2d')
        ctx.fillStyle = WtGui.settings.bgcolor
        ctx.fillRect(0, 0, WtGui.settings.width, WtGui.settings.height)
    }

    /*
     *
     */
    static setCanvas = (canvas) => { WtGui.#canvas = canvas }

    /*
     *
     */
    static #configCanvas = () => {
        WtGui.#canvas.width = WtGui.settings.width
        WtGui.#canvas.height = WtGui.settings.height
    }

    /*
     *
     */
    static startRenderer = () => {
        WtGui.#configCanvas()
        WtGui.#renderer = setInterval(WtGui.#renderGui(), 33)
        WtGui.#menuRunning = true
    }

    /*
     *
     */
    static stopRenderer = () => {
        clearInterval(WtGui.#renderer)
        WtGui.#menuRunning = false
    }

    static printmenu = () => {
        console.log('menu:')
        console.log(WtGui.#menus)
    }

    /*
     *
     */
    static isRunning = () => { return WtGui.#menuRunning }

    /*
     *
     */
    static addMenu = (menuObj) => {
        if(!(menuObj instanceof WtGuiMenu)) return false          //  Verify proper menu object
        if(WtGui.getMenu(menuObj.id) !== undefined) return false  //  Verify menu does not exist
        WtGui.#menus.push(menuObj)                                //  Add menu
        return true
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
        return true
    }

    /*
     *
     */
    static closeMenu = (bool) => { (bool) ? WtGui.#openedMenus = [] : WtGui.#openedMenus.pop() }
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
