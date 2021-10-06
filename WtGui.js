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

    #menus = [ { name: 'main_menu' }, { name: 'game_menu' } ]
    #opened_menus = []
    #renderer

    #menus_active = true
    #game_running = false

    /*
     *
     */
    constructor(args) {
    }

    /*
     *
     */
    #renderGui = () => {
        this.#opened_menus[(this.#opened_menus.length - 1)]
        //this.#ctx
    }

    /*
     *
     */
    #configCanvas = () => {
        const canvas = document.getElementById(WtGui.settings.canvas)
        canvas.width = WtGui.settings.width
        canvas.height = WtGui.settings.height
    }

    /*
     *
     */
    startRenderer = () => {
        this.#configCanvas()
        this.#renderer = setInterval(this.#renderGui(), 30)
    }

    /*
     *
     */
    stopRenderer = () => {
        clearInterval(this.#renderer)
    }

    /*
     *
     */
    addMenu = (name) => {
        //
    }

    /*
     *
     */
    addItem = (name, item) => {
        //
    }

    /*
     *
     */
    openMenu = (name) => {
        this.#opened_menus.push(name)
    }

    /*
     *
     */
    closeMenu = (bool) => {
        (bool) ? this.#opened_menus = [] : this.#opened_menus.pop()
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
