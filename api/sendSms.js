// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

module.exports = async (req, res) => {
  // const verification = client.verify.services('VA4e40249804661e51caf7b7c608a4b81b')
  //   .verifications
  //   .create({to: '+34665886414', channel: 'sms'})
  //   .then((verification) => verification)

  try {
    // TODO: Prevent usage from outside the website
    const lookup = await client.lookups.phoneNumbers(req.query.to).fetch()
    const message = await client.messages.create({
      body: req.query.body || 'Placeholder message body',
      from: '+12182428999', to: lookup.phoneNumber,
    }).then((message) => message)

    return res.json({ lookup, message })

  } catch {
    return res.json('Make sure the number included its country code')
  }

  // return res.json({
  //   lookup,
  //   // message,
  //   // verification,
  // })
}
