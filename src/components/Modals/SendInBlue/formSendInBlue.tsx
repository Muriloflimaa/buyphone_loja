import { parseCookies } from "nookies"
import { useState } from "react"
import { masktel1 } from "../../../utils/masks"

export default function SendInBlue() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const cookies = parseCookies(undefined)
  const newCookies = cookies.UTM && JSON.parse(cookies.UTM)
  return (
    <>
      <form
        action="/api/email/35" method="post"
        className={
          'form-control gap-2 w-full my-7 px-7'
        }
      >
        <div className={'grid gap-3 w-full'}>
          <input
            className="input input-bordered rounded-md w-full text-info-content"
            onChange={(e) => setName(e.target.value)}
            type="text"
            name='name'
            value={name}
            placeholder="Nome"
            required
          />

          <input
            className="input input-bordered rounded-md w-full text-info-content"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name='email'
            value={email}
            placeholder="E-mail"
            required
          />

          <input
            className="input input-bordered rounded-md w-full text-info-content"
            onChange={(e) => setTel(e.target.value)}
            type="text"
            name='tel'
            value={masktel1(tel)}
            placeholder="Telefone"
            required
          />
          <input type="hidden" name="utm_source" value={newCookies?.utm_source} />
          <input type="hidden" name="utm_medium" value={newCookies?.utm_medium} />
          <input type="hidden" name="utm_campaign" value={newCookies?.utm_campaign} />
        </div>
        <button className="btn normal-case py-4 text-white w-56 m-auto mt-5 bg-default shadow-md border-0" type="submit">CADASTRAR</button>
      </form>
    </>
  )
}
