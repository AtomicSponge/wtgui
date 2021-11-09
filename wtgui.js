/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @version 0.0.5
 * @see README.me
 * @copyright LICENSE.md
 * 
 */

const fs = require('fs')

/**
 * 
 * Custom error object
 * 
 */
class WtGuiError extends Error {
    /**
     * Create a new WtGuiError
     * @param {String} message Error message
     */
    constructor(message) {
        super(message)
        if(Error.captureStackTrace)
            Error.captureStackTrace(this, WtGuiError)
    }
}
exports.WtGuiError = WtGuiError

/**
 *
 * WtGui main object
 * @hideconstructor
 * 
 */
class WtGui {
    constructor() { return false }  //  Don't allow direct construction

    /**
     * WtGui Module settings
     * @prop {boolean} debugMode Enable/disable debug mode.
     * @prop {Number} width Width of the gui.
     * @prop {Number} height Height of the gui.
     * @prop {Number} mouseSize Size of the mouse hitbox.
     * @prop {String} clearColor Background color for gui context.
     * @prop {String} defaultFont Default font size/face.
     * @prop {String} defaultFontColor Default font color.
     * @prop {String} defaultMenuColor Default menu background color.
     * @prop {String} defaultItemColor Default item background color.
     * @prop {String} defaultMenu Default menu to open when all are closed.
     * @prop {String} fpsFont Font to use for rendering FPS.
     * @prop {String} fpsColor Color to use for rendering FPS.
     */
    static settings = {
        debugMode: false,
        width: Number(0),
        height: Number(0),
        mouseSize: Number(0),
        clearColor: 'rgb(142,142,142)',
        defaultFont: '14px Arial',
        defaultFontColor: 'rgb(255,255,255)',
        defaultMenuColor: 'rgb(0,0,0)',
        defaultItemColor: 'rgb(255,165,0)',
        defaultMenu: 'main_menu',
        fpsFont: 'Bold 16px Arial',
        fpsColor: 'rgb(255,165,0)',

        actionBindings: {
            keys: {
                up: [ 'ArrowUp' ],
                down: [ 'ArrowDown' ],
                left: [ 'ArrowLeft' ],
                right: [ 'ArrowRight' ],
                select: [ ' ' ],
                cancel: [ 'Escape' ]
            },
            buttons: {
                up: [ 'idk' ],
                down: [ 'idk' ],
                left: [ 'idk' ],
                right: [ 'idk' ],
                select: [ 'idk' ],
                cancel: [ 'idk' ]
            }
        },

        /**
         * Save input binding settings.
         * @returns {Object} Binding settings packed into an object.
         */
        save: () => { return { ...WtGui.settings.actionBindings } },

        /**
         * Load input binding settings.
         * @param {Object} settings Binding settings packed into an object.
         */
        load: (settings) => {
            if(!(settings instanceof Object)) throw new WtGuiError(`Error loading settings.`)
            Object.keys(settings).forEach(item => {
                if(WtGui.settings.actionBindings[item] === undefined)
                    throw new WtGuiError(`Bad setting format:\n${settings[item]}`)
                WtGui.settings.actionBindings[item] = settings[item]
            })
        }
    }

    /**
     * WtGui Module info
     * @prop {Number} fps Frames per second.
     * @prop {Number} frameDelta Time between frames.
     * @prop {Number} lastRender Time last frame render completed.
     */
    static info = {
        get fps() { return WtGui.#renderer.fps },
        get frameDelta() { return WtGui.#renderer.frameDelta },
        get lastRender() { return WtGui.#renderer.lastRender }
    }

    /*
     * Gui Data
     */
    static #data = {
        menuStorage: undefined,  //  Storage for saving menu settings selection
        menuCanvas: {},          //  2d canvas for rendering menus
        glctx: {},               //  WebGL context for main drawing
        ctx: {},                 //  2d context for menu drawing
        configRan: false,        //  Flag to verify config runs once
        imageFiles: [],          //  Array of image files
        audioFiles: [],          //  Array of audio files
        menus: [],               //  Array of available menus
        openedMenus: [],         //  Stack of opened menus
        currentMenu: {},         //  Current opened menu
        activeItem: undefined    //  Active menu item
    }

    /**
     * Configure canvas and start the gui.
     * @param {HTMLCanvasElement} canvas Canvas element to configure.
     */
    static startGui = (canvas) => {
        if(WtGui.#data.configRan) throw new WtGuiError(`WtGui is already running.`)
        if(WtGui.#data.menuStorage === undefined)
            throw new WtGuiError(`Please configure menu settings storage.`)
        if(!(canvas instanceof HTMLCanvasElement))
            throw new WtGuiError(`'${canvas}' is not a 'HTMLCanvasElement'.`)
        if(WtGui.settings.width < 1 || WtGui.settings.height < 1)
            throw new WtGuiError(`Must define a 'width' and 'height'.`)

        //WtGui.#data.glctx = canvas.getContext('webgl2')
        //if(!WtGui.#data.glctx) throw new WtGuiError(`webgl2 error`)
        WtGui.#data.glctx = canvas.getContext('2d')
        canvas.width = WtGui.settings.width
        canvas.height = WtGui.settings.height

        canvas.addEventListener('mousedown', WtGui.#events.onMouseDown, false)
        canvas.addEventListener('mouseup', WtGui.#events.onMouseUp, false)
        canvas.addEventListener('mousemove', WtGui.#events.onMouseMove, false)

        canvas.addEventListener("touchstart", WtGui.#events.onTouchStart, false)
        canvas.addEventListener("touchend", WtGui.#events.onTouchEnd, false)
        canvas.addEventListener("touchcancel", WtGui.#events.onTouchCancel, false)
        canvas.addEventListener("touchmove", WtGui.#events.onTouchMove, false)

        window.addEventListener('keydown', WtGui.#events.onKeyDown, false)
        window.addEventListener('keyup', WtGui.#events.onKeyUp, false)

        WtGui.#data.menuCanvas = canvas.menuCanvas = document.createElement('canvas')
        WtGui.#data.ctx = WtGui.#data.menuCanvas.getContext('2d')

        WtGui.#data.configRan = true
        WtGui.#renderer.start()
    }

    /**
     * 
     * @param {Object} menuStorage
     */
    static setMenuStorage = (menuStorage) => {
        //  add validation
        WtGui.#data.menuStorage = menuStorage
    }

    /**
     * 
     * @returns {Object}
     */
    static get menuStorage() { return WtGui.#data.menuStorage }

    /**
     * Set the background animation function.
     * @param {Function} func New animation function.
     */
    static setBgAnimation = (func) => {
        if(!(func instanceof Function)) throw new WtGuiError(`Background animation must be a function.`)
        WtGui.#renderer.bgAnimation = func
    }

    /**
     * Get the menu drawing context.
     * @returns {CanvasRenderingContext2D} 2D drawing context.
     */
    static get draw() { return WtGui.#data.ctx }

    /*
     * 
     * @returns {WebGL2RenderingContext}
     */
    //static get draw3d() { return WtGui.#data.glctx }

    /**
     * Add an image.
     * @param {String} id Reference name for image.
     * @param {String} file Filename and path of image.
     */
    static addImage = (id, file) => {
        if(WtGui.getImage(id) !== undefined) throw new WtGuiError(`Image ID '${id}' already exists.`)
        WtGui.#data.imageFiles.push({ id: id, file: Wt.loadImg(file) })
    }

    /**
     * Add multiple images at once.
     * @param {Array} data An array of objects [ { id: , file: } ]
     */
    static addImages = (data) => {
        data.forEach(item => { WtGui.addImage(item.id, item.file) })
    }

    /**
     * Get an image.
     * @param {String} id ID of image.
     * @returns {Image} Image by ID reference.
     */
    static getImage = (id) => {
        const tempImg = WtGui.#data.imageFiles.find(elm => elm.id === id)
        if(tempImg === undefined) return undefined
        return tempImg.file
    }

    /**
     * wip
     * @param {String} id 
     * @param {String} file 
     */
    static addAudio = (id, file) => {
        if(WtGui.getAudio(id) !== undefined) throw new WtGuiError(`Audio ID '${id}' already exists.`)
        if(!fs.existsSync(file)) throw new WtGuiError(`'${file}' does not exist.`)
        fs.readFile(file, (error, data) => {
            if(error) throw new WtGuiError(error.message)
            WtGui.#data.audioFiles.push({ id: id, file: data })
        })
    }

    /**
     * wip
     * @param {Array} data 
     */
    static addAudio = (data) => {
        data.forEach(item => { WtGui.addAudio(item.id, item.file) })
    }

    /**
     * wip
     * @param {String} id 
     * @returns {}
     */
    static getAudio = (id) => {
        const tempAudio = WtGui.#data.audioFiles.find(elm => elm.id === id)
        if(tempAudio === undefined) return undefined
        return tempAudio.file
    }

    /**
     * Add a new menu.
     * @param {*} menuObj Menu object to add.
     */
    static addMenu = (menuObj) => {
        if(!(menuObj instanceof WtGuiMenu)) {         //  Verify proper menu object
            menuObj = WtGui.buildMenu(menuObj)        //  Try to build menu if not
            if(!(menuObj instanceof WtGuiMenu))       //  Fail if still not a menu
                throw new WtGuiError(`Menu is not a valid 'WtGuiMenu' object.`)
        }
        if(WtGui.getMenu(menuObj.id) !== undefined)   //  Verify menu does not exist
            throw new WtGuiError(`Menu ID '${menuObj.id}' already exists.`)
        WtGui.#data.menus.push(menuObj)               //  Add menu
    }

    /**
     * Build a menu from an object.
     * wip
     * @param {*} menuData Data object to build from.
     * @returns {WtGuiMenu} Generated menu object
     */
    static buildMenu = (menuData) => {
        const tempMenu = new WtGuiMenu(menuData)
        return tempMenu
    }

    /**
     * Get a menu.
     * @param {String} id ID of menu to get.
     * @returns {WtGuiMenu} Menu object by ID.
     */
    static getMenu = (id) => { return WtGui.#data.menus.find(elm => elm.id === id) }

    /**
     * Add an item to a menu.
     * @param {String} menuId ID of menu it add item to.
     * @param {WtGuiItem} itemObj Item object to add.
     */
    static addItem = (menuId, itemObj) => {
        const menu = WtGui.getMenu(menuId)
        if(menu === undefined) throw new WtGuiError(`'${menuId}' - Menu does not exist.`)
        menu.addItem(itemObj)
    }

    /**
     * Gui actions
     */
    static actions = {
        /**
         * Pause the gui.
         * @inner
         */
        pauseGui: () => { WtGui.#renderer.paused = true },

        /**
         * Unpause the gui.
         */
        unpauseGui: () => { WtGui.#renderer.paused = false },

        /**
         * Restart the gui.
         */
        restartGui: () => {
            WtGui.#renderer.stop()
            WtGui.#renderer.start()
        },

        /**
         * Turn fps drawing on or off.
         * @param {boolean} toggle True to turn on, false to turn off.
         */
        drawFps: (toggle) => {
            (toggle) ? WtGui.#renderer.drawFps = true : WtGui.#renderer.drawFps = false
        },

        /**
         * Open a menu.
         * @param {String} menuId Menu ID to open.
         */
        openMenu: (menuId) => {
            const tempMenu = WtGui.getMenu(menuId)
            if(tempMenu === undefined) throw new WtGuiError(`'${menuId}' - Menu does not exist.`)
            WtGui.#data.openedMenus.push(tempMenu)
            WtGui.#data.currentMenu = WtGui.#data.openedMenus[(WtGui.#data.openedMenus.length - 1)]
        },

        /**
         * Close one or all menus.
         * @param {boolean} closeAll True to close all menus, false to close the top menu.
         */
        closeMenu: (closeAll) => {
            if(closeAll) {
                WtGui.#data.openedMenus = []
                WtGui.#data.currentMenu = {}
            } else {
                WtGui.#data.openedMenus.pop()
                if(WtGui.#data.openedMenus.length === 0) WtGui.actions.openMenu(WtGui.settings.defaultMenu)
                else WtGui.#data.currentMenu = WtGui.#data.openedMenus[(WtGui.#data.openedMenus.length - 1)]
            }
        }
    }

    /*
     * Private gui actions.
     */
    static #actions = {
        scrollTimer: {},  //  Store running timer function.
        
        /*
         * Timed function for scrolling menu items.
         */
        scroller: () => {
            console.log('test')
        },

        /**
         * Move the active menu item up in the index.
         * @returns {boolean} True if the current item changed, else false.
         */
        menuItemUp: () => {
            if(WtGui.#data.currentMenu.selectableItems !== undefined) {
                const idx = WtGui.#data.currentMenu.selectableItems.findIndex(
                    elm => elm === WtGui.#data.activeItem)
                if(idx > 0) {
                    --idx
                    WtGui.#data.activeItem = WtGui.#data.currentMenu.selectableItems[idx]
                    return true
                }
            }
            return false
        },

        /**
         * Move the active menu item down in the index.
         * @returns {boolean} True if the current item changed, else false.
         */
        menuItemDown: () => {
            if(WtGui.#data.currentMenu.selectableItems !== undefined) {
                const idx = WtGui.#data.currentMenu.selectableItems.findIndex(
                    elm => elm === WtGui.#data.activeItem)
                if(idx < WtGui.#data.currentMenu.selectableItems.length && idx > 0) {
                    ++idx
                    WtGui.#data.activeItem = WtGui.#data.currentMenu.selectableItems[idx]
                    return true
                }
            }
            return false
        },

        /**
         * Start scrolling through the menu item options.
         * @param {boolean} direction True for left, false for right.
         */
        menuItemScrollStart: (direction) => {
            if(WtGui.#data.currentMenu.selectableItems !== undefined &&
               WtGui.#data.activeItem !== undefined) {
                if(!WtGui.#data.activeItem.selectOnce) {
                    clearInterval(WtGui.#actions.scrollTimer)
                    WtGui.#actions.scrollTimer = setInterval(WtGui.#actions.scroller(), 50)
                }
                { (direction) ? true : false }
            }
        },

        /**
         * Stop scrolling through the menu item options.
         */
        menuItemScrollStop: () => {
            clearInterval(WtGui.#actions.scrollTimer)
            if(WtGui.#data.currentMenu.selectableItems !== undefined &&
                WtGui.#data.activeItem !== undefined) {
                //
            }
        },

        /**
         * 
         */
        menuItemSelect: () => {
            //
        },

        /**
         * 
         */
        menuCancel: () => {
            //
        }
    }

    /*
     * Renderer sub-object
     */
    static #renderer = {
        fpsCalc: {},            //  Store timed func to calculate fps
        nextFrame: Number(0),   //  Store the call to the animation frame
        paused: false,          //  Flag to pause renderer
        drawFps: false,         //  Flag for drawing fps counter
        fps: Number(0),         //  Store frame rate
        step: Number(0),        //  Used to calculate fps
        frameDelta: Number(0),  //  Time in ms between frames
        lastRender: Number(0),  //  Last render time
        renderTexture: null,    //  Texture to draw to
        bgAnimation: () => {},  //  Background animation function

        /*
         * Start the renderer
         */
        start: () => {
            //WtGui.#renderer.renderTexture = WtGui.#data.glctx.createTexture()
            WtGui.#data.menuCanvas.width = WtGui.settings.width
            WtGui.#data.menuCanvas.height = WtGui.settings.height
            clearInterval(WtGui.#renderer.fpsCalc)
            WtGui.#renderer.fpsCalc = setInterval(() => {
                WtGui.#renderer.fps = WtGui.#renderer.step
                WtGui.#renderer.step = 0
            }, 1000)
            window.cancelAnimationFrame(WtGui.#renderer.nextFrame)
            WtGui.#renderer.nextFrame = window.requestAnimationFrame(WtGui.#renderer.render)
        },

        /*
         * Stop the renderer
         */
        stop: () => {
            clearInterval(WtGui.#renderer.fpsCalc)
            window.cancelAnimationFrame(WtGui.#renderer.nextFrame)
            WtGui.#renderer.fps = WtGui.#renderer.step = 0
            WtGui.#renderer.frameDelta = WtGui.#renderer.lastRender = 0
            //WtGui.#data.glctx.deleteTexture(WtGui.#renderer.renderTexture)
        },

        /*
         * Render draw method
         */
        render: () => {
            if(WtGui.#data.openedMenus.length === 0 ||
               WtGui.#data.currentMenu === {} ||
               WtGui.#data.currentMenu === undefined) WtGui.actions.openMenu(WtGui.settings.defaultMenu)
            if(WtGui.#data.openedMenus.length === 0 ||
               WtGui.#data.currentMenu === {} ||
               WtGui.#data.currentMenu === undefined) throw new WtGuiError(`No menus available.`)
            const ctx = WtGui.#data.ctx
            const currentMenu = WtGui.#data.currentMenu

            //  Clear the renderer
            ctx.fillStyle = WtGui.settings.clearColor
            ctx.fillRect(0, 0, WtGui.settings.width, WtGui.settings.height)

            //  Run background animation function
            WtGui.#renderer.bgAnimation()

            //  Render the menu
            if(!WtGui.settings.debugMode && currentMenu.bgImage !== undefined) {
                {(currentMenu.scaleImg) ?
                    ctx.drawImage(WtGui.getImage(currentMenu.bgImage),
                        currentMenu.posX + currentMenu.imgOffsetX,
                        currentMenu.posY + currentMenu.imgOffsetY,
                        currentMenu.width, currentMenu.height) :
                    ctx.drawImage(WtGui.getImage(currentMenu.bgImage),
                        currentMenu.posX + currentMenu.imgOffsetX,
                        currentMenu.posY + currentMenu.imgOffsetY)}
            } else {
                ctx.fillStyle = currentMenu.bgColor
                ctx.fillRect(currentMenu.posX, currentMenu.posY,
                    currentMenu.width, currentMenu.height)
            }

            //  Render menu items
            currentMenu.items.forEach(elm => {
                if(!WtGui.settings.debugMode && elm.bgImage !== undefined) {
                    {(elm.scaleImg) ?
                        ctx.drawImage(WtGui.getImage(elm.bgImage),
                            elm.posX + elm.imgOffsetX,
                            elm.posY + elm.imgOffsetY,
                            elm.width, elm.height) :
                        ctx.drawImage(WtGui.getImage(elm.bgImage),
                            elm.posX + elm.imgOffsetX,
                            elm.posY + elm.imgOffsetY)}
                } else {
                    ctx.fillStyle = elm.bgColor
                    ctx.fillRect(currentMenu.posX + elm.posX,
                        currentMenu.posY + elm.posY,
                        elm.width, elm.height)
                }

                if(WtGui.#data.activeItem === elm) {
                    // selected item
                }
            })

            //  Render FPS counter if enabled
            if(WtGui.#renderer.drawFps) {
                ctx.font = WtGui.settings.fpsFont
                ctx.fillStyle = WtGui.settings.fpsColor
                ctx.textAlign = 'right'
                ctx.fillText(WtGui.#renderer.fps, WtGui.settings.width, 12)
            }

            //  Draw the rendered menu
            /*const gl = WtGui.#data.glctx
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
            gl.bindTexture(gl.TEXTURE_2D, WtGui.#renderer.renderTexture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, WtGui.#data.menuCanvas)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)
            gl.generateMipmap(gl.TEXTURE_2D)
            gl.bindTexture(gl.TEXTURE_2D, null)*/

            WtGui.#data.glctx.drawImage(WtGui.#data.menuCanvas, 0, 0)

            //  Update renderer info and request next frame
            WtGui.#renderer.step++
            WtGui.#renderer.frameDelta = Date.now() - WtGui.#renderer.lastRender
            WtGui.#renderer.lastRender = Date.now()
            while(WtGui.#renderer.paused) {}  //  Infinite loop for pause
            WtGui.#renderer.nextFrame = window.requestAnimationFrame(WtGui.#renderer.render)
        }
    }

    /*
     * Events sub-object
     *
     * Event object passed to UI elements:
     * > {object} uiEvent - Original UI event repacked
     * > {number} elmX - Calculated X offset within the UI item
     * > {number} elmY - Calculated Y offset within the UI item
     */
    static #events = {
        /*
         * Mouse Down Event
         */
        onMouseDown: (event) => {
            //  See if the mouse clicked on anything
            const res = Wt.AABB(
                {
                    posX: event.offsetX - WtGui.#data.currentMenu.posX,
                    posY: event.offsetY - WtGui.#data.currentMenu.posY,
                    width: WtGui.settings.mouseSize,
                    height: WtGui.settings.mouseSize,
                },
                WtGui.#data.currentMenu.items
            )
            if(res !== undefined && res.canSelect)
                res.selectEvent({
                    uiEvent: event,
                    elmX: event.offsetX - WtGui.#data.currentMenu.posX - res.posX,
                    elmY: event.offsetY - WtGui.#data.currentMenu.posY - res.posY
                })
        },

        /*
         * Mouse Up Event
         */
        onMouseUp: (event) => {},

        /*
         * Mouse Move Event
         */
        onMouseMove: (event) => {
            //  If the mouse is pointing at anything, make it the active item
            const res = Wt.AABB(
                {
                    posX: event.offsetX - WtGui.#data.currentMenu.posX,
                    posY: event.offsetY - WtGui.#data.currentMenu.posY,
                    width: WtGui.settings.mouseSize,
                    height: WtGui.settings.mouseSize,
                },
                WtGui.#data.currentMenu.items
            )
            if(res !== undefined && res.canSelect) WtGui.#data.activeItem = res
        },

        /*
         * wip
         */
        onTouchStart: (event) => {
            console.log(event)
            event.targetTouches.forEach(touch => {
                console.log(touch)
                const hitX = 0
                const hitY = 0

                const res = Wt.AABB(
                    {
                        posX: event.radiusX - WtGui.#data.currentMenu.posX,
                        posY: event.radiusY - WtGui.#data.currentMenu.posY,
                        width: event.touchRadius,
                        height: event.touchRadius,
                    },
                    WtGui.#data.currentMenu.items
                )
                if(res !== undefined && res.canSelect)
                    res.selectEvent({
                        uiEvent: event,
                        elmX: event.radiusX - WtGui.#data.currentMenu.posX - res.posX,
                        elmY: event.radiusY - WtGui.#data.currentMenu.posY - res.posY
                    })
            })
        },

        /*
         * wip
         */
        onTouchEnd: (event) => {
            console.log(event)
        },

        /*
         * wip
         */
        onTouchCancel: (event) => {
            console.log(event)
        },

        /*
         * wip
         */
        onTouchMove: (event) => {
            console.log(event)
        },

        /*
         * Key Down Events
         */
        onKeyDown: (event) => {
            Object.keys(WtGui.settings.actionBindings.keys).forEach(action => {
                WtGui.settings.actionBindings.keys[action].forEach(binding => {
                    if(event.key === binding) {
                        switch(action) {
                            case 'up':
                                WtGui.#actions.menuItemUp()
                                break
                            case 'down':
                                WtGui.#actions.menuItemDown()
                                break
                            case 'left':
                                WtGui.#actions.menuItemScrollStart(true)
                                break
                            case 'right':
                                WtGui.#actions.menuItemScrollStart(false)
                                break
                            case 'select':
                                WtGui.#actions.menuItemSelect()
                                break
                            case 'cancel':
                                WtGui.#actions.menuCancel()
                                break
                        }
                    }
                })
            })
        },

        /*
         * Key Up Events
         */
        onKeyUp: (event) => {
            Object.keys(WtGui.settings.actionBindings.keys).forEach(action => {
                WtGui.settings.actionBindings.keys[action].forEach(binding => {
                    if(event.key === binding) {
                        switch(action) {
                            case 'left':
                                WtGui.#actions.menuItemScrollStop()
                                break
                            case 'right':
                                WtGui.#actions.menuItemScrollStop()
                                break
                        }
                    }
                })
            })
        },

        /*
         * wip
         */
        onButtonDown: (event) => {
            Object.keys(WtGui.settings.actionBindings.buttons).forEach(action => {
                WtGui.settings.actionBindings.keys[action].forEach(binding => {
                    if(event.gamepad === binding) {
                        switch(action) {
                            case 'up':
                                WtGui.#actions.menuItemUp()
                                break
                            case 'down':
                                WtGui.#actions.menuItemDown()
                                break
                            case 'left':
                                WtGui.#actions.menuItemScrollStart(true)
                                break
                            case 'right':
                                WtGui.#actions.menuItemScrollStart(false)
                                break
                            case 'select':
                                WtGui.#actions.menuItemSelect()
                                break
                            case 'cancel':
                                WtGui.#actions.menuCancel()
                                break
                        }
                    }
                })
            })
        },

        /*
         * wip
         */
        onButtonUp: (event) => {
            Object.keys(WtGui.settings.actionBindings.buttons).forEach(action => {
                WtGui.settings.actionBindings.keys[action].forEach(binding => {
                    if(event.gamepad === binding) {
                        switch(action) {
                            case 'left':
                                WtGui.#actions.menuItemScrollStop()
                                break
                            case 'right':
                                WtGui.#actions.menuItemScrollStop()
                                break
                        }
                    }
                })
            })
        }
    }

    /**
     * Debug helper fuctions.
     */
    static debug = {
        /**
         * Log menu objects to console.
         */
        logMenus: () => {
            WtGui.#data.menus.forEach(menu => { console.log(menu) })
        },

        /**
         * Log opened menu stack to console.
         */
        logMenuStack: () => {
            WtGui.#data.openedMenus.forEach(menu => { console.log(menu) })
        },

        /**
         * Log image file list to console.
         */
        logImageFiles: () => {
            WtGui.#data.imageFiles.forEach(img => { console.log(img) })
        },

        /**
         * Log audio file list to console.
         */
        logAudioFiles: () => {
            WtGui.#data.audioFiles.forEach(audio => { console.log(audio) })
        }
    }
}
exports.WtGui = WtGui

/**
 * 
 * Extra functions / algorithms
 * 
 */
const Wt = {
    /**
     * Parse required arguments.
     * @param {*} scope The scope (this).
     * @param {*} data Data to parse.
     * @param {*} args Arguments to parse for.
     */
    argParser: (scope, data, args) => {
        args.forEach((arg) => {
            if(data[arg] === undefined) throw new WtGuiError(`'${scope}':\n'${arg}' undefined.`)
            scope[arg] = data[arg]
        })
    },

    /**
     * Load an image from file.
     * @param {String} file Filename and path to load.
     * @returns {Image} Image object loaded from file.
     */
    loadImg: (file) => {
        if(!fs.existsSync(file)) throw new WtGuiError(`'${file}' does not exist.`)
        const tempImg = new Image()
        tempImg.src = file
        return tempImg
    },

    /**
     * Test for valid rgb(a)/hsl(a).
     * @param {String} str String to test.
     * @returns {boolean} True if valid rgb(a)/hsl(a), else false.
     */
    testRgb: (str) => { return /^(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$/i.test(str) },

    /**
     * AABB Algorithm
     * @param {elmA} test Object to test.
     * @param {[elmB]} collection Collection of objects to test against.
     * @returns {elmB} Returns the first object collided, else undefined.
     */
    AABB: (test, collection) => {
        if(!(test instanceof Object)) return undefined
        if(!(collection instanceof Array)) return undefined
        let res = undefined
        collection.some((elm) => {
            if(
                test.posX < elm.posX + elm.width &&
                test.posX + test.width > elm.posX &&
                test.posY < elm.posY + elm.height &&
                test.posY + test.height > elm.posY
            ) {
                res = elm
                return true
            } else return false
        })
        return res
    }
}
exports.WtGuiExtras = Wt

/* ****************************************
 *
 * Menu & menu item objects
 * 
 *************************************** */

/**
 * 
 * WtGui Menu Object
 * 
 */
class WtGuiMenu {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        var args = args || {}
        Wt.argParser(this, args,
            [ 'id', 'title',
              'posX', 'posY',
              'width', 'height' ])
        this.font = args.font || WtGui.settings.defaultFont
        this.bgColor = args.bgColor || WtGui.settings.defaultMenuColor
        this.fgColor = args.fgColor || WtGui.settings.defaultFontColor

        if(args.bgImage !== undefined) this.bgImage = args.bgImage
        this.scaleImg = args.scaleImg || false

        this.items = []
        this.selectableItems = []

        if(!Wt.testRgb(this.bgColor)) throw new WtGuiError(`'${this.bgColor}' - Bad color code`)
        if(!Wt.testRgb(this.fgColor)) throw new WtGuiError(`'${this.fgColor}' - Bad color code`)
    }

    /**
     * Add an item to the menu
     * @param {WtGuiItem} itemObj 
     */
    addItem = (itemObj) => {
        if(!(itemObj instanceof WtGuiItem))  //  Verify proper item object
            throw new WtGuiError(`Item is not a valid 'WtGuiItem' object.`)
        //  Verify item does not already exist
        if(this.items.find(elm => elm.id === itemObj.id) !== undefined)
            throw new WtGuiError(`Item ID '${itemObj.id}' already exists.`)
        this.items.push(itemObj)  //  Add item
        if(itemObj.canSelect) this.selectableItems.push(itemObj)
    }
}
exports.WtGuiMenu = WtGuiMenu

/**
 * 
 * WtGui Menu Item Interface
 * @interface
 * 
 */
class WtGuiItem {
    /**
     * 
     * @param {*} args 
     */
    constructor(args) {
        if(this.constructor === WtGuiItem) throw new WtGuiError(`'WtGuiItem' is an interface class.`)
        var args = args || {}
        Wt.argParser(this, args,
            [ 'id', 'title',
              'posX', 'posY',
              'width', 'height'])
        this.font = args.font || WtGui.settings.defaultFont
        this.bgColor = args.bgColor || WtGui.settings.defaultItemColor
        this.fgColor = args.fgColor || WtGui.settings.defaultFontColor

        if(args.bgImage !== undefined) this.bgImage = args.bgImage
        this.imgOffsetX = args.imgOffsetX || 0
        this.imgOffsetY = args.imgOffsetY || 0
        this.scaleImg = args.scaleImg || false
        this.canSelect = false

        if(!Wt.testRgb(this.bgColor)) throw new WtGuiError(`'${this.bgColor}' - Bad color code`)
        if(!Wt.testRgb(this.fgColor)) throw new WtGuiError(`'${this.fgColor}' - Bad color code`)
    }

    /**
     * 
     */
    selectEvent = (event) => {
        if(this.canSelect) throw new WtGuiError(`Method 'selectEvent()' must be implemented.`)
    }
}
exports.WtGuiItem = WtGuiItem

/**
 * 
 * WtGui Item Label
 * @extends WtGuiItem
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
 * WtGui Item Action
 * @extends WtGuiItem
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
        this.canSelect = true
        if(args.type === undefined) {
            if(args.action === undefined) throw new WtGuiError(`Must define an action.`)
            this.action = args.action
        }
        if(args.type === 'open_menu') {
            if(args.menuName === undefined) throw new WtGuiError(`Must define a menu name.`)
            this.action = () => { WtGui.actions.openMenu(args.menuName) }
        }
        if(args.type === 'close_menu') {
            this.allMenus = args.allMenus || false
            this.action = () => { WtGui.actions.closeMenu(this.allMenus) }
        }
    }

    /**
     * 
     */
    selectEvent = (event) => {
        this.action(event)
    }
}
exports.WtGuiAction = WtGuiAction

/**
 * 
 * 
 * @extends WtGuiItem
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
 * 
 * @extends WtGuiItem
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
 * 
 * @extends WtGuiItem
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
