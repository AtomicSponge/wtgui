/* ****************************************
 *
 * Filename:  WtGui.js
 * 
 **************************************** */

//const { Gamepads } = require('gamepads')

//Gamepads.start()

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
const WtGui = {
    menu_active = true,
    game_running = false,

    renderer: {
        width: 0,
        height: 0,
        canvas: 'WTEMenuCanvas'
    },

    menus: [ { name: 'main_menu' }, { name: 'game_menu' } ],
    opened_menus: [],

    /*
     *
     */
    render: () => {
        //opened_menus[(opened_menus.length - 1)]
    },

    /*
     *
     */
    addMenu: (menu) => {
        //
    },

    /*
     *
     */
    openMenu: (name) => {
        opened_menus.push(name)
    },

    /*
     *
     */
    closeMenu: (arg) => {
        if(arg === 'all') opened_menus = []
        else opened_menus.pop()
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
