/*
 * Imports
 */
const { contextBridge, ipcRenderer } = require('electron')
const { WtGui, WtGuiMenu, WtGuiAction, WtGuiToggle  } = require('../wtgui')
//const { WtGui, WtGuiMenu } = require('@wtfsystems/wtgui')

/*
 * Configure WtGui
 */
//WtGui.settings.debugMode = true
WtGui.settings.width = 1024
WtGui.settings.height = 768
WtGui.actions.drawFps(true)

WtGui.menuStorage = {
    gfx: {
        scale: Number(0)
    },

    volume: {
        main: Number(0),
        music: Number(0),
        sfx: Number(0),
        voice: Number(0),
        ambiance: Number(0)
    }
}

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
    id: 'test1',
    title: 'testing 1',
    posX: 20, posY: 20,
    width: 200, height: 40,
    type: 'open_menu', menuName: 'game_menu'
}))

WtGui.addItem('main_menu', new WtGuiToggle({
    id: 'test2',
    title: 'testing 2',
    posX: 20, posY: 80,
    width: 200, height: 40,
    toggleLeft: () => {
        console.log('toggle <')
    },
    toggleRight: () => {
        console.log('toggle >')
    }
}))

WtGui.addItem('main_menu', new WtGuiAction({
    id: 'test3',
    title: 'testing 3',
    posX: 20, posY: 140,
    width: 200, height: 40,
    action: (event) => {
        console.log('action 2')
    }
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
