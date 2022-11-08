import MailchimpSubscribe from 'react-mailchimp-subscribe'
import CustomForm from './CustomForm'

interface IFormFields {
  EMAIL: string
  FNAME: string
  PHONE: string
}
interface ICustomForm {
  status: string | null
  subscribe: (data: IFormFields) => void
}

export default function MailchimpFormContainer() {
  const postUrl = `https://buyphone.us21.list-manage.com/subscribe/post?u=7b8f081fe24d9fd579e7c35eb&amp;id=001069f3c1&amp;f_id=0093c2e1f0`

  return (
    <>
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status }: ICustomForm) => (
          <CustomForm
            status={status}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </>
  )
}
