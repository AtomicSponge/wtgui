/** ****************************************
 *
 * Filename:  WtGui.js
 * 
 * @author Matthew Evans
 * @version 0.0.1
 * @see README.me
 * 
 **************************************** */

/**
 * Custom error object
 */
class WtGuiError extends Error {
    /**
     * Create a new WtGuiError
     * @param {*} message 
     */
    constructor(message) {
        super(message)
        if(Error.captureStackTrace)
            Error.captureStackTrace(this, WtGuiError)
    }
}
exports.WtGuiError = WtGuiError

/**
 * Parse required arguments.
 * @param {*} scope The scope (this).
 * @param {*} data Data to parse.
 * @param {*} args Arguments to parse for.
 */
const argParser = (scope, data, args) => {
    args.forEach((arg) => {
        if(data[arg] === undefined) throw new WtGuiError(`${arg} undefined.`)
        scope[arg] = data[arg]
    })
}

/*
 *
 */
class WtGui {
    constructor() { return false }  //  Don't allow direct construction

    /*
     * Module settings
     */
    static settings = {
        width: Number(0),
        height: Number(0),
        defaultFont: '12px Arial',
        clearColor: 'rgb(255,255,255)',  //
        defaultMenu: 'main_menu'         //  Default menu to use
    }

    /*
     * Module info
     */
    static info = {
        get fps() { return WtGui.#renderer.fps },
        get frameDelta() { return WtGui.#renderer.frameDelta },
        get mousePosX() { return WtGui.#data.mouseCords.posX },
        get mousePosY() { return WtGui.#data.mouseCords.posY }
    }

    /*
     * Gui Data
     */
    static #data = {
        mouseCords: {
            posX: Number(0),
            posY: Number(0)
        }
    }

    static #canvas = {}        //  Reference to canvas
    static #configRan = false  //  Flag to verify config runs once

    /**
     * Configure canvas
     * @param {*} canvas 
     */
    static startGui = (canvas) => {
        if(WtGui.#configRan) throw new WtGuiError(`WtGui is already running.`)
        if(!(canvas instanceof HTMLCanvasElement))
            throw new WtGuiError(`${canvas} is not a HTMLCanvasElement`)
        WtGui.#canvas = canvas

        if(WtGui.settings.width < 1 || WtGui.settings.height < 1)
            throw new WtGuiError(`Must define a width and height`)
        WtGui.#canvas.width = WtGui.settings.width
        WtGui.#canvas.height = WtGui.settings.height

        WtGui.#canvas.addEventListener('mousedown', WtGui.#events.onMouseDown, false)
        WtGui.#canvas.addEventListener('mouseup', WtGui.#events.onMouseUp, false)
        WtGui.#canvas.addEventListener('mousemove', WtGui.#events.onMouseMove, false)

        WtGui.#canvas.addEventListener("touchstart", WtGui.#events.onTouchStart, false)
        WtGui.#canvas.addEventListener("touchend", WtGui.#events.onTouchEnd, false)
        WtGui.#canvas.addEventListener("touchcancel", WtGui.#events.onTouchCancel, false)
        WtGui.#canvas.addEventListener("touchmove", WtGui.#events.onTouchMove, false)

        window.addEventListener('keydown', WtGui.#events.onKeyDown, false)
        window.addEventListener('keyup', WtGui.#events.onKeyUp, false)

        WtGui.#canvas.renderCanvas = document.createElement('canvas')

        WtGui.#configRan = true
        WtGui.#renderer.start()
    }

    static #bgImages = []  //  Array of background images

    /**
     * Add a background image
     * @param {*} id 
     * @param {*} file 
     */
    static addBgImage = (id, file) => {
        if(WtGui.getBgImage(id) !== undefined) throw new WtGuiError('Image ID already exists')
        // load file
        WtGui.#bgImages.push({ id: id, file: file })
    }

    /*
     * Get a background image
     */
    static getBgImage = (id) => { return WtGui.#bgImages.find(elm => elm.id === id) }

    static #bgAnimation = {}

    static #menus = []        //  Array of available menus
    static #openedMenus = []  //  Array of opened menus
    static #currentMenu = {}  //  Current opened menu

    /**
     * Add a menu
     * @param {*} menuObj 
     */
    static addMenu = (menuObj) => {
        if(!(menuObj instanceof WtGuiMenu)) {         //  Verify proper menu object
            menuObj = WtGui.buildMenu(menuObj)        //  Try to build menu if not
            if(!(menuObj instanceof WtGuiMenu))       //  Fail if still not a menu
                throw new WtGuiError('Object is not a valid menu')
        }
        if(WtGui.getMenu(menuObj.id) !== undefined)  //  Verify menu does not exist
            throw new WtGuiError('Menu ID already exists')
        WtGui.#menus.push(menuObj)                    //  Add menu
    }

    /**
     * Add a menu item
     * @param {*} menuId 
     * @param {*} itemObj 
     */
    static addItem = (menuId, itemObj) => {
        const menu = WtGui.getMenu(menuId)
        if(menu === undefined) throw new WtGuiError('Menu does not exist')
        menu.addItem(itemObj)
    }

    /**
     * Build a menu from an object
     * @param {*} menuData 
     * @returns 
     */
    static buildMenu = (menuData) => {
        const tempMenu = new WtGuiMenu(menuData)
        return tempMenu
    }

    /**
     * Get a menu
     * @param {*} id 
     * @returns 
     */
    static getMenu = (id) => { return WtGui.#menus.find(elm => elm.id === id) }

    /**
     * Gui actions
     */
    static actions = {
        /**
         * Pause Gui
         */
        pause: () => { WtGui.#renderer.paused = true },

        /*
         * Unpause Gui
         */
        unpause: () => { WtGui.#renderer.paused = false },

        /*
         * Draw fps
         */
        drawFps: (toggle) => {
            (toggle) ? WtGui.#renderer.drawFps = true : WtGui.#renderer.drawFps = false
        },

        /*
         * Open a menu
         */
        openMenu: (menuId) => {
            const tempMenu = WtGui.getMenu(menuId)
            if(tempMenu === undefined) return false
            WtGui.#openedMenus.push(tempMenu)
            WtGui.#currentMenu = WtGui.#openedMenus[(WtGui.#openedMenus.length - 1)]
            return true
        },

        /*
         * Close a menu
         */
        closeMenu: (closeAll) => {
            if(closeAll) {
                WtGui.#openedMenus = []
                WtGui.#currentMenu = {}
            } else {
                WtGui.#openedMenus.pop()
                if(WtGui.#openedMenus.length === 0) WtGui.actions.openMenu(WtGui.settings.defaultMenu)
                WtGui.#currentMenu = WtGui.#openedMenus[(WtGui.#openedMenus.length - 1)]
            }
        }
    }

    /*
     * Renderer sub-object
     */
    static #renderer = {
        fpsCalc: {},            //  Store timed func to calculate fps
        ctx: {},                //  Contex to draw to
        nextFrame: Number(0),   //  Store the call to the animation frame
        paused: false,          //  Flag to pause renderer
        drawFps: false,         //  Flag for drawing fps counter
        fps: Number(0),         //  Store frame rate
        step: Number(0),        //  Used to calculate fps
        frameDelta: Number(0),  //  Time in ms between frames

        /*
         * Start the renderer
         */
        start: () => {
            WtGui.#renderer.frameDelta = Date.now()
            WtGui.#canvas.renderCanvas.width = WtGui.settings.width
            WtGui.#canvas.renderCanvas.height = WtGui.settings.height
            clearInterval(WtGui.#renderer.fpsCalc)
            WtGui.#renderer.fpsCalc = setInterval(() => {
                WtGui.#renderer.fps = WtGui.#renderer.step
                WtGui.#renderer.step = 0
            }, 1000)
            if(WtGui.#renderer.nextFrame > 0)
                window.cancelAnimationFrame(WtGui.#renderer.nextFrame)
            WtGui.#renderer.ctx = WtGui.#canvas.renderCanvas.getContext('2d')
            WtGui.#renderer.nextFrame = window.requestAnimationFrame(WtGui.#renderer.render)
        },

        /*
         * Render draw method
         */
        render: () => {
            WtGui.#renderer.step++
            WtGui.#renderer.frameDelta = Date.now() - WtGui.#renderer.frameDelta
            if(WtGui.#openedMenus.length === 0 || WtGui.#currentMenu === {})
                WtGui.actions.openMenu(WtGui.settings.defaultMenu)
            if(WtGui.#currentMenu === undefined) throw new WtGuiError(`No menus available.`)
            const ctx = WtGui.#renderer.ctx
            const currentMenu = WtGui.#currentMenu

            //  Clear the renderer
            ctx.fillStyle = WtGui.settings.clearColor
            ctx.fillRect(0, 0, WtGui.settings.width, WtGui.settings.height)

            //  add background rendering

            //  Render the menu
            ctx.fillStyle = currentMenu.bgcolor
            ctx.fillRect(currentMenu.pos_x, currentMenu.pos_y,
                currentMenu.width, currentMenu.height)

            //  Render menu items
            currentMenu.items.forEach(elm => {
                ctx.fillStyle = elm.bgcolor
                ctx.fillRect(currentMenu.pos_x + elm.pos_x,
                    currentMenu.pos_y + elm.pos_y,
                    elm.width, elm.height)
            })

            //  FPS
            if(WtGui.#renderer.drawFps) {
                ctx.font = '12px Arial'
                ctx.fillStyle = 'orange'
                ctx.textAlign = 'right'
                ctx.fillText(WtGui.#renderer.fps, WtGui.settings.width, 12)
            }

            WtGui.#canvas.getContext('2d').drawImage(WtGui.#canvas.renderCanvas, 0, 0)
            while(WtGui.#renderer.paused) {}  //  Infinite loop for pause
            WtGui.#renderer.nextFrame = window.requestAnimationFrame(WtGui.#renderer.render)
        }
    }

    /*
     * Events sub-object
     */
    static #events = {
        /*
         *
         */
        onMouseDown: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onMouseUp: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onMouseMove: (event) => {
            WtGui.#data.mouseCords.posX = event.offsetX
            WtGui.#data.mouseCords.posY = event.offsetY
        },

        /*
         *
         */
        onTouchStart: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onTouchEnd: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onTouchCancel: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onTouchMove: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onKeyDown: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onKeyUp: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onButtonDown: (event) => {
            //alert(event)
        },

        /*
         *
         */
        onButtonUp: (event) => {
            //alert(event)
        }
    }

    /*
     * Gui tests
     */
    static tests = {
        printMenu: () => {
            console.log('menu:')
            console.log(WtGui.#menus)
        }
    }
}
exports.WtGui = WtGui

/**
 * 
 */
class WtGuiMenu {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        argParser(this, args,
            [ 'id', 'title',
              'pos_x', 'pos_y',
              'width', 'height' ])
        this.items = []
        this.bgimage = args.bgimage || undefined
        this.font = args.font || WtGui.settings.defaultFont
        this.bgcolor = args.bgcolor || 'rgb(0,0,0)'
        this.fgcolor = args.fgcolor || 'rgb(255,255,255)'
    }

    /**
     * 
     * @param {*} itemObj 
     */
    addItem = (itemObj) => {
        if(!(itemObj instanceof WtGuiItem))  //  Verify proper item object
            throw new WtGuiError('Object is not a valid menu item')
        //  Verify item does not already exist
        if(this.items.find(elm => elm.id === itemObj.id) !== undefined)
            throw new WtGuiError('Item ID already exists')
        this.items.push(itemObj)  //  Add item
    }
}
exports.WtGuiMenu = WtGuiMenu

/**
 * 
 */
class WtGuiItem {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        argParser(this, args,
            [ 'id', 'title',
              'pos_x', 'pos_y',
              'width', 'height'])
        this.font = args.font || WtGui.settings.defaultFont
        this.bgcolor = args.bgcolor || 'rgb(255,0,0)'
        this.fgcolor = args.fgcolor || 'rgb(255,255,255)'
    }
}
exports.WtGuiItem = WtGuiItem

/**
 * 
 */
class WtGuiLabel extends WtGuiItem {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiLabel = WtGuiLabel

/**
 * 
 */
class WtGuiButton extends WtGuiItem {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiButton = WtGuiButton

/**
 * 
 */
class WtGuiInput extends WtGuiItem {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiInput = WtGuiInput

/**
 * 
 */
class WtGuiSelection extends WtGuiItem {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiSelection = WtGuiSelection

/**
 * 
 */
class WtGuiToggle extends WtGuiItem {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiToggle = WtGuiToggle

/**
 * 
 */
class WtGuiAction extends WtGuiItem {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        super(args)
    }
}
exports.WtGuiAction = WtGuiAction
