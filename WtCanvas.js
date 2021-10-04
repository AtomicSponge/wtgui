/* ****************************************
 *
 * Filename:  WtCanvas.js
 * 
 **************************************** */

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
const WtCanvas = {
    canvases = [],

    /*
     *
     */
    addCanvas: (name, width, height) => {
        //
    },

    /*
     *
     */
    removeCanvas: (name) => {
        //
    }
}
exports.WtCanvas = WtCanvas
