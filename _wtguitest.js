/*
 *
 */
const { contextBridge, ipcRenderer } = require('electron')

const { WtGui, WtGuiMenu, WtGuiButton } = require('./WtGui')

WtGui.settings.width = 100
WtGui.settings.height = 100
const menuSystem = new WtGui()

if(!menuSystem.addMenu(new WtGuiMenu({
    id: 'main_menu',
    title: 'Test Main Menu',
    pos_x: 10, pos_y: 10,
    width: 50, height: 50
}))) throw new Error('Unable to create main menu')

if(!menuSystem.addItem('main_menu', new WtGuiButton({
    id: 'apply_btn',
    title: 'Apply',
    pos_x: 10, pos_y: 10,
    width: 40, height: 20
}))) console.log('shit')

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
    'something',
    {
        data: 'none'
    }
)
