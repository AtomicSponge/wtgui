/*
 *
 */

//const { Gamepads } = require('gamepads')

//Gamepads.start()

/*
 *
 */
const WtGuiConfig = {
    canvas: ''
}
exports.WtGuiConfig = WtGuiConfig

/*
 *
 */
class WtGuiMenu {}
exports.WtGuiMenu = WtGuiMenu

/*
 *
 */
class WtGuiItem {}

/*
 *
 */
class WtGuiButton extends WtGuiItem {}
exports.WtGuiButton = WtGuiButton

/*
 *
 */
class WtGuiLabel extends WtGuiItem {}
exports.WtGuiLabel = WtGuiLabel

/*
 *
 */
class WtGuiInput extends WtGuiItem {}
exports.WtGuiInput = WtGuiInput
