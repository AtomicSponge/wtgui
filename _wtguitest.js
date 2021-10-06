const { contextBridge, ipcRenderer } = require('electron')

const { WtGui, WtGuiMenu } = require('./WtGui')

WtGui.settings.width = 100
WtGui.settings.height = 100
const testMe = new WtGui()

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
