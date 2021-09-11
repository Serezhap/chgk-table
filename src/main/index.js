'use strict'
import store from '../renderer/store'
import { app, BrowserWindow, ipcMain } from 'electron'
const path = require('path')
const fs = require('fs')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 963,
    useContentSize: true,
    width: 1900,
    minWidth: 1000,
    minHeight: 600
  })

  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    console.log(store)
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('test', function (event, arg) {
  let p = path.join(__dirname, 'Files')
  let file = path.join(p, 'test.txt')
  let contents = 'test'
  fs.writeFile(file, contents, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!')
  })
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
