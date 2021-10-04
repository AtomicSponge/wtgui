/*
 *
 */

import Gamepads from 'gamepads'

Gamepads.start()

/*
 *
 */
export const WtGuiConfig = {
    canvas = ''
}

/*
 *
 */
export class WtGuiMenu {}

/*
 *
 */
class WtGuiItem {}

/*
 *
 */
export class WtGuiButton extends WtGuiItem {}

/*
 *
 */
export class WtGuiLabel extends WtGuiItem {}

/*
 *
 */
export class WtGuiInput extends WtGuiItem {}

/*
 *
 */
export default (
    WtGuiConfig,
    WtGuiMenu,
    WtGuiButton,
    WtGuiLabel,
    WtGuiInput
)
