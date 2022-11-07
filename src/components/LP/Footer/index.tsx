import {
   faFacebook,
   faInstagram,
   faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const Footer = () => {
   return (
      <div className="bg-base-100">
         <footer className="footer p-10 text-primary max-w-6xl mx-auto">
            <div>
               <span className="footer-title">Mais informações</span>
               <a
                  href="https://www.buyphone.com.br/politics"
                  target={'_blank'}
                  className="link link-hover"
               >
                  Política de privacidade
               </a>
               <a
                  href="https://www.buyphone.com.br/terms"
                  target={'_blank'}
                  className="link link-hover"
               >
                  Termos e condições
               </a>
            </div>
            <div>
               <span className="footer-title">Contatos</span>

               <a
                  href={'mailto:contatobuyphone@gmail.com'}
                  className="flex items-center"
               >
                  <FontAwesomeIcon
                     icon={faEnvelope}
                     className="mr-2 w-5 h-5 "
                  />
                  <p className="link link-hover">contatobuyphone</p>
               </a>

               <a
                  href={'https://www.facebook.com/Buyphone.match'}
                  target="_blank"
                  className="flex items-center"
               >
                  <FontAwesomeIcon icon={faFacebook} className="mr-2 w-5 h-5" />
                  <p className="link link-hover">BuyPhone</p>
               </a>

               <a
                  href={'https://instagram.com/buyphone.match'}
                  target="_blank"
                  className="flex items-center"
               >
                  <FontAwesomeIcon
                     icon={faInstagram}
                     className="mr-2 w-5 h-5"
                  />
                  <p className="link link-hover">buyphone.match</p>
               </a>

               <a
                  href={'https://wa.me/5518981367275'}
                  target="_blank"
                  className="flex items-center"
               >
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-2 w-5 h-5" />
                  <p className=" link link-hover"> (18) 98136-7275</p>
               </a>
            </div>
            <div>
               <p>Copyright BuyPhone - 2022. Todos os direitos reservados.</p>
               <p>CNPJ: 45.679.637/0001-94</p>
               <p>Araçatuba - SP, 16.018-000, Brasil</p>
            </div>
            <div className="flex flex-col h-full justify-end">
               <span className="footer-title">
                  Criado com ❤️ por Buyphone.com.br
               </span>
            </div>
         </footer>
      </div>
   )
}

export default Footer
