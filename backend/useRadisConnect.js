const { createClient } = require('redis')
const client = createClient({ legacyMode: true })
client.connect().catch(console.error)

module.exports = (session) => {
  const RedisStore = require('connect-redis')(session)
  return new RedisStore({ client })
}
