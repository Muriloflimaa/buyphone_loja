export default function handler(req, res) {
  // Get data submitted in request's body.

  const body = req.body
  var criptEmail = new Buffer(body.email).toString('base64')
  var criptTel = new Buffer(body.tel).toString('base64')
  const SibApiV3Sdk = require('sib-api-v3-sdk')
  const defaultClient = SibApiV3Sdk.ApiClient.instance
  const apiKey = defaultClient.authentications['api-key']
  apiKey.apiKey = process.env.KEY_API_SENDIBLUE

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail() // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    to: [
      {
        email: body.email,
        name: body.name,
      },
    ],
    templateId: Number(req.query.template),
    params: {
      name: body.name,
      email: body.email,
      phone: body.tel,
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      criptEmail,
      criptTel,
    },
    headers: {
      'api-key': apiKey.apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
  }

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      res.redirect('/?success=true')
    },
    function (error) {
      res.redirect(
        `/?utm_source=${body.utm_source}&utm_medium=${body.utm_medium}&utm_campaign=${body.utm_campaign}&error=true`
      )
      console.error(error)
    }
  )

  // Sends a HTTP success code
  // res.status(200).json({ data: ${body.first} ${body.last} });
}
