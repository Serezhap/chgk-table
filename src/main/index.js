'use strict'
import store from '../renderer/store'
import { app, BrowserWindow, ipcMain } from 'electron'
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
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
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
    mainWindow.webContents.send('reset-file')
  }
})

ipcMain.on('saveFile', function (event, filePath, content) {
  let file = filePath
  if (!file) {
    file = app.getPath('exe').split('\\').slice(0, -1).join('\\') + '\\game.txt'
  }
  fs.writeFileSync(file, content, function (err) {
    if (err) {
      return console.log(err)
    }
  })
})

ipcMain.on('defaultFile', function (event) {
  console.log('sas')
  let file = app.getPath('exe').split('\\').slice(0, -1).join('\\') + '\\game.txt'
  event.sender.send('filePath', file)
})

ipcMain.on('openFile', function (event) {
  const { dialog } = require('electron')
  let path = dialog.showOpenDialog({ properties: ['openFile'] })
  if (path) {
    fs.readFile(path[0], 'utf8', function (err, data) {
      if (err) return console.log(err)
      try {
        let state = JSON.parse(data)
        event.sender.send('newState', state, path[0])
      } catch (err) {
        dialog.showErrorBox('Невозможно загрузить игру', 'Открытый файл не содержит данные об игре')
      }
    })
  }
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
