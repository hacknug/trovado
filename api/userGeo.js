const fetch = require('node-fetch')

module.exports = async (req, res) => {
  const endpoints = [
    'https://ipapi.co/json',
    'https://geolocation-db.com/json',
    `https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`, // 'https://ipinfo.io/geo',
    `http://api.ipstack.com/check?access_key=${process.env.IPSTACK_KEY}`,
  ].map((endpoint) => fetch(endpoint)
    .then((response) => response.json())
  )

  const resolved = await Promise.all(endpoints)
    // TODO: Return only the data we need
    .catch((error) => console.error(error))

  return res.json(resolved)
}
