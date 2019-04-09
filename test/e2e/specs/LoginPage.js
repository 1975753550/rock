// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'login form': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL + '/login.html'
    console.log(`devServer = ${devServer}`)

    browser
      .url(devServer)
      .waitForElementVisible('form.login-form input[name=username]', 10000)
      .setValue('form.login-form input[name=username]', 'nightwatch')
      .setValue('form.login-form input[name=password]', 'password')
      .click('form.login-form button')
      .assert.urlEquals(browser.globals.devServerURL + '/')
      .end()
  }
}
