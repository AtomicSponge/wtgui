/*
 *
 */
const path = require('path')
const { app, ipcMain, BrowserWindow } = require('electron')

/*
 *
 */
let mainWindow = null
const createMainWindow = () => {
	mainWindow = new BrowserWindow({
		title: `TESTING`,
		width: 1024,
		height: 768,
		fullscreen: false,
		fullscreenable: true,
		autoHideMenuBar: true,
		webPreferences: {
			//sandbox: true,
			nodeIntegration: false,
			contextIsolation: true,
			nativeWindowOpen: true,
			preload: path.join(__dirname, '_wtguitest.js')
		}
	})
	mainWindow.on('close', (event) => {
		mainWindow.destroy()
	})
	mainWindow.webContents.on('dom-ready', () => {
		mainWindow.webContents.send('send-json-data', {})
	})
	mainWindow.loadFile('_wtguitest.html')
	mainWindow.webContents.openDevTools()
}

/*
 *
 */
ipcMain.on('recieve-json-data', (event, data) => {
	//
})

/*
 *
 */
app.on('before-quit', () => { 
	mainWindow.destroy()
})

/*
 *
 */
app.whenReady().then(() => {
    createMainWindow()
})
