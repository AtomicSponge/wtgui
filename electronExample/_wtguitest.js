/*
 * Imports
 */
const { contextBridge, ipcRenderer } = require('electron')
const { WtGui, WtGuiMenu, WtGuiAction  } = require('../wtgui')
//const { WtGui, WtGuiMenu } = require('@wtfsystems/wtgui')

/*
 * Configure WtGui
 */
WtGui.settings.width = 1024
WtGui.settings.height = 768
WtGui.actions.drawFps(true)

WtGui.setMenuStorage({
    'gfx': {
        'scale': '0'
    },

    'volume': {
        'main': '0',
        'music': '0',
        'sfx': '0',
        'voice': '0',
        'ambiance': '0'
    }
})

WtGui.addImages([
    { id: 'dash', file: 'img/dash.jpg' }
])

WtGui.setBgAnimation(() => {
    WtGui.draw.drawImage(WtGui.getImage('dash'), 640, 0, 360, 480)
})

/*
 * Create main menu
 */
WtGui.addMenu(new WtGuiMenu({
    id: 'main_menu',
    title: 'Test Main Menu',
    posX: 100, posY: 300,
    width: 500, height: 450
}))

WtGui.addItem('main_menu', new WtGuiAction({
    id: 'test',
    title: 'testing',
    posX: 20, posY: 20,
    width: 200, height: 40,
    /*action: (event) => {
        console.log(`hit\n${event.elmX},${event.elmY}`)
    }*/
    type: 'open_menu', menuName: 'game_menu'
}))

/*
 * Create game menu
 */
WtGui.addMenu(new WtGuiMenu({
    id: 'game_menu',
    title: 'Test Game Menu',
    posX: 10, posY: 10,
    width: 400, height: 300
}))

WtGui.addItem('game_menu', new WtGuiAction({
    id: 'test',
    title: 'testing',
    posX: 20, posY: 20,
    width: 200, height: 40,
    type: 'close_menu'
}))

console.log(WtGui.settings.save())
WtGui.debug.logMenus()
WtGui.debug.logImageFiles()

/*
 *
 */
ipcRenderer.on('send-input-data', (event, message) => {
    //
})

/*
 *
 */
contextBridge.exposeInMainWorld(
    'WtGui',
    {
        start: (canvas) => { WtGui.startGui(canvas) }
    }
)
