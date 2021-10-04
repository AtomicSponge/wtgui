/*
 *
 */

const { app, dialog, ipcMain, Tray, Menu, MenuItem, BrowserWindow } = require('electron')

import { WtGuiConfig } from "./src/WtGui"

WtGuiConfig.canvas = 'set'

let mainWindow = null
const mainWindow = () => {
	settingsWin = new BrowserWindow({
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
	settingsWin.on('close', (event) => {
		settingsWin.destroy()
	})
	settingsWin.webContents.on('dom-ready', () => {
		settingsWin.webContents.send('send-json-data', data)
	})
	settingsWin.loadFile('_wtguitest.html')
}
