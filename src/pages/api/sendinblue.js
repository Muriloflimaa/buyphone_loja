export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body
  var criptEmail = new Buffer(body.email).toString('base64')
  var criptTel = new Buffer(body.tel).toString('base64')
  console.log(criptEmail, criptTel)
  // if (!body.name  !body.email  !body.phone || !body.message) {
  //     // Sends a HTTP bad request error code
  //     return res.status(400).json({ data: "Required fields are not found" });
  // }

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
    templateId: 5,
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
      res.redirect('/obrigado')
    },
    function (error) {
      console.error(error)
      alert(error)
      res.redirect('/contato')
    }
  )

  // Sends a HTTP success code
  // res.status(200).json({ data: ${body.first} ${body.last} });
}
