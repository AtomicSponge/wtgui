/*
 *
 */
const path = require('path')
const { app, dialog, ipcMain, Tray, Menu, MenuItem, BrowserWindow } = require('electron')

const { WtGuiConfig, WtGuiMenu } = require('./WtGui')

/*
 *
 */
WtGuiConfig.canvas = 'set'

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
	const test = new WtGuiMenu({
		pos_x: 10,
		pos_y: 10,
		width: 19,
		height: 10
	})
})
