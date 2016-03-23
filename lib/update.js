const GhReleases = require('electron-gh-releases')

const update = (currentVersion) => {
  let options = {
    repo: 'jenslind/minira',
    currentVersion: currentVersion
  }

  const updater = new GhReleases(options)

  // Check for updates
  // `status` returns true if there is a new update available
  updater.check((err, status) => {
    if (!err && status) {
      // Download the update
      updater.download()
    }
  })

  // When an update has been downloaded
  updater.on('update-downloaded', (info) => {
    // Restart the app and install the update
    updater.install()
  })
}

module.exports = update
