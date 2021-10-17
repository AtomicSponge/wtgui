/*
 * Imports
 */
const { contextBridge, ipcRenderer } = require('electron')
const { WtGui, WtGuiMenu, WtGuiButton } = require('./WtGui')

/*
 * Configure WtGui
 */
WtGui.settings.width = 1024
WtGui.settings.height = 768

/*
 * Create main menu
 */
if(!WtGui.addMenu(new WtGuiMenu({
    id: 'main_menu',
    title: 'Test Main Menu',
    pos_x: 10, pos_y: 10,
    width: 50, height: 50
}))) throw new Error('Unable to create menu')

if(!WtGui.addItem('main_menu', new WtGuiButton({
    id: 'apply_btn',
    title: 'Apply',
    pos_x: 10, pos_y: 10,
    width: 40, height: 20
}))) throw new Error('Unable to add item')

/*
 * Create game menu
 */
if(!WtGui.addMenu(new WtGuiMenu({
    id: 'game_menu',
    title: 'Test Game Menu',
    pos_x: 10, pos_y: 10,
    width: 50, height: 50
}))) throw new Error('Unable to create menu')

if(!WtGui.addItem('game_menu', new WtGuiButton({
    id: 'apply_btn',
    title: 'Apply',
    pos_x: 10, pos_y: 10,
    width: 40, height: 20
}))) throw new Error('Unable to add item')

//console.log(WtGui.info.fps())
//console.log(WtGui.info.ticks())
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
        setCanvas: (canvas) => { WtGui.setCanvas(canvas) },
        startRenderer: () => { WtGui.startRenderer() }
    }
)
