const ipcRenderer = require('electron').ipcRenderer

export default store => {
  store.subscribe((mutation, state) => {
    if (ipcRenderer !== undefined) {
      ipcRenderer.send('saveFile', state.filePath, JSON.stringify(state))
    }
  })
}
