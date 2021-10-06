const { contextBridge, ipcRenderer } = require('electron')

const { WtGui, WtGuiMenu } = require('./WtGui')

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
