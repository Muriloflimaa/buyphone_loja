export default function handler(req, res) {
  // Get data submitted in request's body.
  console.log(req)
  const body = req.body
  var criptEmail = new Buffer(body.email).toString('base64')
  var criptTel = new Buffer(body.tel).toString('base64')
  const SibApiV3Sdk = require('sib-api-v3-sdk')
  const defaultClient = SibApiV3Sdk.ApiClient.instance
  const apiKey = defaultClient.authentications['api-key']
  apiKey.apiKey =
    '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'

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
      console.log('API called successfully. Returned data: ' + data)
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
