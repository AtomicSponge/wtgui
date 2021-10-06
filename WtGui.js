/* ****************************************
 *
 * Filename:  WtGui.js
 * 
 **************************************** */

const { Gamepads } = require('gamepads')

/*
 *
 */
const WtGuiError = (location, message) => {
    this.name = 'WtGuiError'
    this.message = `${location}\n${message}`
    this.stack = (new Error()).stack
}
WtGuiError.prototype = new Error
exports.WtGuiError = WtGuiError

/*
 *
 */
const argParser = (scope, data, args) => {
    args.forEach((arg) => {
        if(data[arg] === undefined)
            throw new Error(`${arg} undefined.`)
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
        canvas: 'WTGuiCanvas'
    }
    static #singleton = undefined

    #menus = [ { name: 'main_menu', title: 'Main Menu', items: [] },
               { name: 'game_menu', title: 'Game Menu', items: [] } ]
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
        if(!(WtGui.settings.width > 0)) throw new Error(`width undefined.`)
        if(!(WtGui.settings.height > 0)) throw new Error(`height undefined.`)
        return WtGui.#singleton
    }

    /*
     *
     */
    #renderGui = () => {
        this.#openedMenus[(this.#openedMenus.length - 1)]
        //this.#ctx
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
    #getCanvas = () => {
        return document.getElementById(WtGui.settings.canvas)
    }

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
    addMenu = (name, title) => {
        if(this.getMenu(name) !== undefined) return false
        this.#menus.push({ name: name, title: title, items: [] })
        return true
    }

    /*
     *
     */
    getMenu = (name) => {
        return this.#menus.find((elm) => { elm.name === name })
    }

    /*
     *
     */
    addItem = (name, item) => {
        const menu = this.getMenu(name)
        if(menu === undefined) return false
        menu.items.push(item)
        return true
    }

    /*
     *
     */
    openMenu = (name) => {
        if(this.getMenu(name) === undefined) return false
        this.#openedMenus.push(this.getMenu(name))
        return true
    }

    /*
     *
     */
    closeMenu = (bool) => {
        (bool) ? this.#openedMenus = [] : this.#openedMenus.pop()
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
            [ 'pos_x', 'pos_y',
              'width', 'height' ])
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
            [ 'pos_x', 'pos_y',
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
