// const {BrowserWindow} = require('electron');
// import {ipcRenderer} from 'electron';
import {data} from "./index.js";
console.log(data);
const setButton = document.getElementById('btn');
const openBtn = document.getElementById('open-btn');
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title)
})

// openBtn.addEventListener('click', () => {
//   //   window.electronAPI.openDevTools();

// })
