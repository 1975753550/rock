// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'ajax request': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL + '/ajax'
    console.log(`devServer = ${devServer}`)

    browser
      .url(devServer)
      .waitForElementVisible('button.button', 10000)
      .assert.elementNotPresent('div.price')
      .click('button.button')
      .waitForElementVisible('div.price', 10000)
      .assert.containsText('div.price b', 'USD')
      .end()
  }
}
