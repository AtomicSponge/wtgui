/*
 *
 */

//const { Gamepads } = require('gamepads')

//Gamepads.start()

/*
 *
 */
const WtGuiConfig = {
    canvas: '',

    renderer: {
        width: 0,
        height: 0
    }
}
exports.WtGuiConfig = WtGuiConfig

/*
 *
 */
const WtGui = {
    //
}
exports.WtGui = WtGui

/*
 *
 */
class WtGuiError extends Error {
    constructor(args) {
        var args = args || {}
    }
}

/*
 *
 */
class WtGuiMenu {
    constructor(args) {
        var args = args || {}

        if(args.width === undefined)
            throw new WtGuiError("Error: width undefined.")
        this.width = args.width
        if(args.height === undefined)
            throw new WtGuiError("Error: height undefined.")
        this.height = args.height

        this.something = args.something || true
    }
}
exports.WtGuiMenu = WtGuiMenu

/*
 *
 */
class WtGuiItem {
    //
}
exports.WtGuiItem = WtGuiItem

/*
 *
 */
class WtGuiButton extends WtGuiItem {
    //
}
exports.WtGuiButton = WtGuiButton

/*
 *
 */
class WtGuiLabel extends WtGuiItem {
    //
}
exports.WtGuiLabel = WtGuiLabel

/*
 *
 */
class WtGuiInput extends WtGuiItem {
    //
}
exports.WtGuiInput = WtGuiInput
