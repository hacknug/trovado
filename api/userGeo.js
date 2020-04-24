const fetch = require('node-fetch')

module.exports = async (req, res) => {
  const clientIp = req.headers['x-forwarded-for']
  const endpoints = (process.env.NODE_ENV === 'development' ? [
    `https://ipapi.co/json`,
    `https://geolocation-db.com/json`,
    `https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`,
    `http://api.ipstack.com/check?access_key=${process.env.IPSTACK_KEY}`,
  ] : [
    `https://ipapi.co/${clientIp}/json`,
    `https://geolocation-db.com/json/${clientIp}`,
    `https://ipinfo.io/${clientIp}?token=${process.env.IPINFO_TOKEN}`,
    `http://api.ipstack.com/${clientIp}?access_key=${process.env.IPSTACK_KEY}`,
  ]).map((endpoint) => fetch(endpoint)
    .then((response) => response.json())
  )

  const relevant =['city', 'postal', 'latitude', 'longitude', 'loc', 'zip']
  const keepRelevant = (res) => Object.entries(res).filter(([key]) => relevant.includes(key))
  const normalize = (res, ...keys) => res.map((entries) => Object.entries(renameKey(Object.fromEntries(entries), ...keys)))
  const renameKey = (obj, oldK, newK, newObj = (oldV, newV) => ({ [newK]: oldV || newV })) => {
    const yo = { ...obj, ...newObj(obj[oldK], obj[newK]) }
    delete yo[oldK]
    return yo
  }

  const resolved = await Promise.all(endpoints)
    .then((response) => Object.values(response).map(keepRelevant))
    .then((response) => normalize(response, 'zip', 'postal'))
    .then((response) => normalize(response, 'loc', '', (oldV, newV) => {
      const coords = (oldV || newV || '').split(',').map((val) => Number(val))
      return coords.length > 1 ? { latitude: coords[0], longitude: coords[1] } : {}
    }))
    .then((response) => response.map((entries) => Object.fromEntries(entries.sort())))
    // TODO: Remove redundant info -> Reduce
    .catch((error) => console.error(error))

  return res.json(resolved)
}
