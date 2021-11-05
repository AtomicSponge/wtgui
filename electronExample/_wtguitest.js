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
WtGui.settings.height = 512
WtGui.actions.drawFps(true)

WtGui.setMenuStorage({
    gfx: {
        scale: Number(1)
    },

    volume: {
        main: Number(0),
        music: Number(0),
        sfx: Number(0),
        voice: Number(0),
        ambiance: Number(0)
    }
})

WtGui.addImage('dash', 'img/dash.jpg')

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
    width: 200, height: 40
}))

/*
 * Create game menu
 */
WtGui.addMenu(new WtGuiMenu({
    id: 'game_menu',
    title: 'Test Game Menu',
    posX: 10, posY: 10,
    width: 50, height: 50
}))

//WtGui.tests.printMenu()

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
