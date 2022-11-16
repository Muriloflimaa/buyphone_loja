import dynamic from 'next/dynamic'
import React from 'react'

//***** COMPONENTS *****//
import Footer from '../../components/LP/Footer'
const NavBar = dynamic(() => import('../../components/LP/NavBar'), {
  ssr: false,
})

// clients
import AnaImg from '../../assets/images/LP/client_anabrisa.jpg'
import BarbaraImg from '../../assets/images/LP/client_barbara.jpg'
import BrendaImg from '../../assets/images/LP/client_brenda.jpg'
import CLyviaImg from '../../assets/images/LP/client_lyvia.png'
import CGabrielImg from '../../assets/images/LP/client_gabriel.png'
import CLuizImg from '../../assets/images/LP/client_luiz.png'
import CIgorImg from '../../assets/images/LP/client_igor.png'
import CAmandaImg from '../../assets/images/LP/client_amanda.png'
import CardDepoiment2 from '../../components/LP/CardDepoiment2'

export default function Depoimentos() {
  return (
    <React.Fragment>
      <NavBar />
      <div id="main" className="bg-[#201942]">
        <div className="max-w-6xl px-4 mx-auto pt-40">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-white/10 uppercase text-5xl md:text-8xl font-bold md:absolute md:leading-3">
              Depoimentos
            </h1>
            <h2 className="text-white uppercase tracking-widest text-xl font-bold md:mt-6">
              Depoimentos
            </h2>
            <div className="bg-white/20 w-20 h-[5px] rounded-3xl mt-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 py-16">
            <CardDepoiment2
              name="Anna Brisa"
              instagram="www.instagram.com/annabrisaa"
              linkVideo="https://www.youtube.com/embed/pMftaexP7RY?autoplay=0&controls=0&showinfo=0&playlist=pMftaexP7RY"
              image={AnaImg}
              depoiment="Foi uma experiência muito boa de compra!"
              date="29 de junho de 2022"
            />
            <CardDepoiment2
              name="Brendha Crizel"
              instagram="www.instagram.com/brendhacrizel/"
              linkVideo="https://www.youtube.com/embed/VswfBYbeWFU?autoplay=0&controls=0&showinfo=0&playlist=VswfBYbeWFU"
              image={BrendaImg}
              depoiment="A BuyPhone tem o melhor preço do mercado e você pode escolher como quer pagar"
              date="5 de Setembro de 2022"
            />
            <CardDepoiment2
              name="Bárbara Brunca"
              instagram="www.instagram.com/barbarabrunca/"
              linkVideo="https://www.youtube.com/embed/OhEwSZSrRUY?autoplay=0&controls=0&showinfo=0&playlist=OhEwSZSrRUY"
              image={BarbaraImg}
              date="12 de novembro de 2022"
              depoiment="É uma nova forma muito legal, de comprar produtos da apple!"
            />
            <CardDepoiment2
              name="Lyvia Nagib Fulanetti"
              instagram="www.instagram.com/lyvianagib/"
              linkVideo="https://www.youtube.com/embed/Npmw1UcMnxM?autoplay=0&controls=0&showinfo=0&playlist=Npmw1UcMnxM"
              image={CLyviaImg}
              depoiment="Comprei dois celulares, um pra mim e um pra
                    minha irmã, dois iPhones 11. O preço é muito
                    abaixo. Vale muito a pena!"
              date="17 de dezembro de 2021"
            />
            <CardDepoiment2
              name="Gabriel Martins"
              instagram="www.instagram.com/gabrielpessoamartins/"
              linkVideo="https://www.youtube.com/embed/w1Sv0QIFxyA?autoplay=0&controls=0&showinfo=0&playlist=w1Sv0QIFxyA"
              image={CGabrielImg}
              depoiment="Celular zero, lacrado na caixa! Pesquisei
                    bastante em vários lugares e o preço deles é bem
                    abaixo do mercado."
              date="8 de dezembro de 2021"
            />
            <CardDepoiment2
              name="Luiz Henrique Puertas"
              instagram="www.instagram.com/luizpuertas/"
              linkVideo="https://www.youtube.com/embed/t3U1o2I9WvI?autoplay=0&controls=0&showinfo=0&playlist=t3U1o2I9WvI"
              image={CLuizImg}
              depoiment="Um preço muito bom, paguei muito barato no
                     Iphone original lacrado!"
              date="20 de novembro de 2021"
            />
            <CardDepoiment2
              name="Igor Fortin"
              instagram="www.instagram.com/igorfortin/"
              linkVideo="https://www.youtube.com/embed/vH0EjiMyZaQ?autoplay=0&controls=0&showinfo=0&playlist=vH0EjiMyZaQ"
              image={CIgorImg}
              depoiment="IPhone 12 que adquiri na BuyPhone, perfeito!
                    Novo, com ótimas condições de preço e
                    parcelamento."
              date="14 de novembro de 2021"
            />
            <CardDepoiment2
              name="Amanda L. Prado"
              instagram="www.instagram.com/_amandalprado/"
              linkVideo="https://www.youtube.com/embed/xzX8LJv7VuQ?autoplay=0&controls=0&showinfo=0&playlist=xzX8LJv7VuQ"
              image={CAmandaImg}
              depoiment="A Amanda adorou o produto que comprou na
                   BuyPhone."
              date="26 de outubro de 2021"
            />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}
