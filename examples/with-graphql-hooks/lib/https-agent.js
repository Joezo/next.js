let agent = process.browser ? null : {}
if (!process.browser) {
  const https = require('https')
  agent = new https.Agent({
    keepAlive: true
  })
}

export default agent
