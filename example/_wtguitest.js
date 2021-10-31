/*
 * Imports
 */
const { contextBridge, ipcRenderer } = require('electron')
const { WtGui, WtGuiMenu, WtGuiButton } = require('../wtgui')
//const { WtGui, WtGuiMenu, WtGuiButton } = require('@wtfsystems/wtgui')

/*
 * Configure WtGui
 */
WtGui.settings.width = 1024
WtGui.settings.height = 768
WtGui.actions.drawFps(true)

WtGui.addImage('dash', 'dash.jpg')

WtGui.setBgAnimation(() => {
    WtGui.draw.drawImage(WtGui.getImage('dash'), 0, 0, 360, 480)
})

/*
 * Create main menu
 */
WtGui.addMenu(new WtGuiMenu({
    id: 'main_menu',
    title: 'Test Main Menu',
    posX: 500, posY: 300,
    width: 500, height: 450
}))

WtGui.addItem('main_menu', new WtGuiButton({
    id: 'apply_btn',
    title: 'Apply',
    posX: 10, posY: 10,
    width: 40, height: 20
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

WtGui.addItem('game_menu', new WtGuiButton({
    id: 'apply_btn',
    title: 'Apply',
    posX: 10, posY: 10,
    width: 40, height: 20
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
