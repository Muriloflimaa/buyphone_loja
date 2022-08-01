import ProductCard from '../components/ProductCard/ProductCard'
import iPhoneProduct from '../assets/images/product.svg'
import { useState } from 'react'

export default function Home(){
    const [click, setClick] = useState(false)
    return (
       <div>
               <div className='my-[23px]'>
               <div className="tabs text-PrimaryText flex justify-center">
  <a className="tab tab-bordered text-PrimaryText">Entrega Full</a> 
  <a className="tab tab-bordered tab-active ">iPhone XR</a> 
  <a className="tab tab-bordered text-PrimaryText">iPhone 11</a>
  <a className="tab tab-bordered text-PrimaryText">iPhone 12</a> 
  <a className="tab tab-bordered text-PrimaryText">iPhone XR</a> 
</div>
               </div>

               <div className="carousel mx-auto w-7xl max-w-7xl rounded-2xl mt-2 hidden md:flex">

  
  <div id="item1" className="carousel-item w-full">
    
  <div className="flickity-viewport" >
    <div className="flickity-slider" >
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 mx-auto max-w-7xl px-4 right-5 mt-[6.5rem]" onClick={() => setClick(!click)}>
    <a href={click ? "#item1" : "#item2"} className="btn btn-circle text-PrimaryText" aria-hidden="true">❮</a> 
      <a href={click ? "#item1" : "#item2"} className="btn btn-circle text-PrimaryText" aria-hidden="true">❯</a>
    </div>
    <img src="https://loja.buyphone.com.br/img/banner2.webp" className="w-full" alt=""  aria-hidden="true"/>
      

    
            </div>
            </div>
  </div>
  <div id="item2" className="carousel-item w-full">
 
  <div className="flickity-viewport" >
    <div className="flickity-slider" >
    
    <img src="https://loja.buyphone.com.br/img/banner1.webp" className="w-full" alt=""  aria-hidden="true"/>
      
            </div>
            </div>
  </div>
</div> 
<div className="justify-center w-full py-6 gap-2 hidden md:flex">
  <a href="#item2" onClick={() => setClick(!click)} className={click ? "bg-PrimaryText rounded-full btn btn-xs w-2 h-2 p-1 min-h-0  hover:bg-blue-700" : "bg-blue-700 rounded-full btn btn-xs w-2 h-2 p-1 min-h-0 hover:bg-blue-700"}></a> 
  <a href="#item1" onClick={() => setClick(!click)} className={!click ? "bg-PrimaryText rounded-full btn btn-xs w-2 h-2 p-1 min-h-0  hover:bg-blue-700" : "bg-blue-700 rounded-full btn btn-xs w-2 h-2 p-1 min-h-0 hover:bg-blue-700"}></a>
</div>


<div className='grid grid-cols-2 md:grid-cols-4 mx-auto py-6 gap-3 max-w-7xl'>
    <ProductCard name='iPhone X' color='Preto' priceOld='5.123,00' price='4.659,00' image={iPhoneProduct} />
    <ProductCard name='iPhone X' color='Branco' priceOld='5.123,00' price='4.659,00' image={iPhoneProduct} />
    <ProductCard name='iPhone X' color='Vermelho' priceOld='5.123,00' price='4.659,00' image={iPhoneProduct} />
    <ProductCard name='iPhone X' color='Preto' priceOld='5.123,00' price='4.659,00' image={iPhoneProduct} />

  {/* DAR UM MAP COM O ARRAY DOS PRODUTOS */}
</div>

        </div>
        
    )
}
 