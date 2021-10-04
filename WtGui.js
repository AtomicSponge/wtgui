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
const arg_parser = (scope, data, args) => {
    args.forEach((arg) => {
        if(data[arg] === undefined)
            throw new WtGuiError(scope.toString(), `${arg} undefined.`)
        scope[arg] = data[arg]
    })
}

/*
 *
 */
class WtGuiMenu {
    constructor(args) {
        var args = args || {}
        arg_parser(this, args,
            [ 'pos_x', 'pos_y', 'width', 'height' ])

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
