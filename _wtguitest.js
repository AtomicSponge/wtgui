const { contextBridge, ipcRenderer } = require('electron')

const { WtGuiConfig, WtGuiMenu } = require('./WtGui')

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
