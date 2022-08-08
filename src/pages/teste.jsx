import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

export default function teste(){
  const { cart } = useContext(CartContext)

    

  return(
    <div> <pre>{JSON.stringify(cart, null, 2)}</pre></div>
  )
}