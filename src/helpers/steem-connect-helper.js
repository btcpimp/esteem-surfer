import {remote} from 'electron';

const helperUrl = 'http://127.0.0.1:3415';

const windowSettings = {
  center: true,
  width: 800,
  height: 600,
  minWidth: 800,
  minHeight: 600,
  maxWidth: 800,
  maxHeight: 600,
  maximizable: false,
  alwaysOnTop: true,
  webPreferences: {
    nodeIntegration: false,
  }
};

const cleanWindowStorage = (win, origin) => {
  win.webContents.session.clearStorageData(
    {
      'origin': origin,
      storages: [
        'appcache',
        'cookies',
        'filesystem',
        'indexdb',
        'localstorage',
        'shadercache',
        'websql',
        'serviceworkers'
      ]
    }, function () {
    });
};

export const scLogin = (successCb, windowCloseCb) => {

  const win = new remote.BrowserWindow(windowSettings);

  // Clear session in order to steemconnect ask username and password for each request.
  cleanWindowStorage(win, 'https://v2.steemconnect.com');

  win.loadURL(`${helperUrl}/login`);

  win.on('page-title-updated', () => {
    if (win.webContents.getTitle().trim() === 'Login Success') {
      win.webContents.executeJavaScript(`document.body.innerHTML`, true).then((result) => {
        const obj = JSON.parse(result);
        successCb(obj.accessToken, obj.username, obj.expiresIn);
        win.close();
      })
    }
  });

  win.on('closed', () => {
    windowCloseCb();
  });
};

export const scAppAuth = (successCb, windowCloseCb) => {

  const win = new remote.BrowserWindow(windowSettings);

  win.loadURL(`${helperUrl}/app-auth`);

  const htmlInt = setInterval(() => {
    win.webContents.executeJavaScript(`document.body.innerHTML`, true).then((result) => {
      if (result.includes('<h2><span>Congratulations</span></h2>')) {
        successCb();
        win.close();
      }
    })
  }, 1500);

  win.on('closed', () => {
    clearInterval(htmlInt);
    windowCloseCb();
  });

};

export const scAppRevoke = (successCb, windowCloseCb) => {
  const win = new remote.BrowserWindow(windowSettings);

  win.loadURL(`${helperUrl}/app-revoke`);

  const htmlInt = setInterval(() => {
    win.webContents.executeJavaScript(`document.body.innerHTML`, true).then((result) => {
      if (result.includes('<h2><span>Congratulations</span></h2>')) {
        successCb();
        win.close();
      }
    })
  }, 1500);

  win.on('closed', () => {
    clearInterval(htmlInt);
    windowCloseCb();
  });
};

export const scTransfer = (from, to, amount, memo, successCb, windowCloseCb) => {

  const win = new remote.BrowserWindow(windowSettings);

  win.loadURL(`${helperUrl}/transfer?data=${encodeURIComponent(JSON.stringify({
    'from': from,
    'to': to,
    'amount': amount,
    'memo': memo
  }))}`);

  const htmlInt = setInterval(() => {
    win.webContents.executeJavaScript(`document.body.innerHTML`, true).then((result) => {
      if (result.includes('<h2><span>Congratulations</span></h2>')) {
        successCb();
        win.close();
      }
    })
  }, 1500);

  win.on('closed', () => {
    clearInterval(htmlInt);
    windowCloseCb();
  });
};

export const scTransferToSavings = (from, to, amount, memo, successCb, windowCloseCb) => {

  const win = new remote.BrowserWindow(windowSettings);

  win.loadURL(`${helperUrl}/transfer-to-savings?data=${encodeURIComponent(JSON.stringify({
    'from': from,
    'to': to,
    'amount': amount,
    'memo': memo
  }))}`);

  const htmlInt = setInterval(() => {
    win.webContents.executeJavaScript(`document.body.innerHTML`, true).then((result) => {
      if (result.includes('<h2><span>Congratulations</span></h2>')) {
        successCb();
        win.close();
      }
    })
  }, 1500);

  win.on('closed', () => {
    clearInterval(htmlInt);
    windowCloseCb();
  });
};

export const scTransferFromSavings = (from, requestId, to, amount, memo, successCb, windowCloseCb) => {

  const win = new remote.BrowserWindow(windowSettings);

  win.loadURL(`${helperUrl}/transfer-from-savings?data=${encodeURIComponent(JSON.stringify({
    'from': from,
    'requestId': requestId,
    'to': to,
    'amount': amount,
    'memo': memo
  }))}`);

  const htmlInt = setInterval(() => {
    win.webContents.executeJavaScript(`document.body.innerHTML`, true).then((result) => {
      if (result.includes('<h2><span>Congratulations</span></h2>')) {
        successCb();
        win.close();
      }
    })
  }, 1500);

  win.on('closed', () => {
    clearInterval(htmlInt);
    windowCloseCb();
  });
};

export const scEsrowTransfer = (from, to, agent, escrowId, sbdAmount, steemAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta, successCb, windowCloseCb) => {

  const win = new remote.BrowserWindow(windowSettings);

  win.loadURL(`${helperUrl}/escrow-transfer?data=${encodeURIComponent(JSON.stringify({
    'from': from,
    'to': to,
    'agent': agent,
    'escrowId': escrowId,
    'sbdAmount': sbdAmount,
    'steemAmount': steemAmount,
    'fee': fee,
    'ratificationDeadline': ratificationDeadline,
    'escrowExpiration': escrowExpiration,
    'jsonMeta': jsonMeta
  }))}`);

  const htmlInt = setInterval(() => {
    win.webContents.executeJavaScript(`document.body.innerHTML`, true).then((result) => {
      if (result.includes('<h2><span>Congratulations</span></h2>')) {
        successCb();
        win.close();
      }
    })
  }, 1500);

  win.on('closed', () => {
    clearInterval(htmlInt);
    windowCloseCb();
  });
};