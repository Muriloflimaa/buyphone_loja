import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import LogoActiveImg from '../../../assets/images/logo.svg'

interface navBarProps {
  navbar?: boolean
}

export default function NavBar({ navbar }: navBarProps) {
  const [openDrawer, setOpenDrawer] = useState(false)

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState)
  }

  return (
    <>
      <div className="fixed z-20 w-full">
        <div className="glass">
          <div className="navbar bg-[#201942]/90">
            <div className="max-w-6xl mx-auto w-full px-4">
              <div className="flex-1">
                <a href="#main" className="font-medium">
                  <Image
                    src={LogoActiveImg}
                    alt="logo"
                    width={140}
                    className="object-contain"
                  />
                </a>
              </div>

              <div className="flex-none hidden md:flex">
                {/* para desktop */}
                <ul className="text-sm menu menu-horizontal text-white gap-10">
                  <li>
                    <a href="#entenda" className="font-medium">
                      Como funciona
                    </a>
                  </li>

                  <li>
                    <a href="#depoimentos" className="font-medium">
                      Depoimentos
                    </a>
                  </li>

                  <li>
                    <a href="#social" className="font-medium">
                      Redes sociais
                    </a>
                  </li>

                  <li>
                    <a href="#contato" className="font-medium">
                      Contato
                    </a>
                  </li>

                  <li>
                    <a href="#compare" className="font-medium">
                      Diferenciais
                    </a>
                  </li>

                  <Link href="/">
                    <button className="btn bg-white normal-case rounded-xl transition-all duration-300 text-[#201942]">
                      Ir para loja
                    </button>
                  </Link>
                </ul>
              </div>
              <li className="block md:hidden" onClick={toggleDrawer}>
                <svg
                  className="swap-off fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </li>
              {/* para mobile */}
            </div>
          </div>
        </div>
      </div>

      {/* drawer/para/mobile */}
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer}
        direction="top"
        duration={400}
        className="w-auto h-auto bg-[#201942]"
      >
        <ul className="menu p-5 items-center text-white">
          <li onClick={toggleDrawer}>
            <a href="#entenda" className="font-medium">
              Como funciona
            </a>
          </li>

          <li onClick={toggleDrawer}>
            <a href="#depoimentos" className="font-medium">
              Depoimentos
            </a>
          </li>

          <li onClick={toggleDrawer}>
            <a href="#social" className="font-medium">
              Redes sociais
            </a>
          </li>

          <li onClick={toggleDrawer}>
            <a href="#contato" className="font-medium">
              Contato
            </a>
          </li>

          <li onClick={toggleDrawer}>
            <a href="#compare" className="font-medium">
              Diferenciais
            </a>
          </li>

          <Link href="/">
            <button className="btn bg-white text-[#201942]">
              Ir para loja
            </button>
          </Link>
        </ul>
      </Drawer>
    </>
  )
}
