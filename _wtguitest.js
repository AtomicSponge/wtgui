/*
 *
 */
const { contextBridge, ipcRenderer } = require('electron')
const { WtGui, WtGuiMenu, WtGuiButton } = require('./WtGui')

WtGui.settings.width = 900
WtGui.settings.height = 700
WtGui.settings.bgcolor = 'rgb(255,255,255)'

if(!WtGui.addMenu(new WtGuiMenu({
    id: 'main_menu',
    title: 'Test Main Menu',
    pos_x: 10, pos_y: 10,
    width: 50, height: 50
}))) throw new Error('Unable to create main menu')

if(!WtGui.addItem('main_menu', new WtGuiButton({
    id: 'apply_btn',
    title: 'Apply',
    pos_x: 10, pos_y: 10,
    width: 40, height: 20
}))) throw new Error('Unable to add item')

//WtGui.printmenu()

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
        startRenderer: () => { WtGui.startRenderer() },
        stopRenderer: () => { WtGui.stopRenderer() }
    }
)
