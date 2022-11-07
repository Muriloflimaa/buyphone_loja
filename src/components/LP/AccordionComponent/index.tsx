import {
   Accordion,
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
} from 'react-accessible-accordion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

interface AccordionProps {
   title: string
   paragraph: string
}
const AccordionComponent = ({ title, paragraph }: AccordionProps) => {
   const [isOn, setIsOn] = useState(false)

   return (
      <AccordionItem onClick={() => setIsOn(!isOn)}>
         <AccordionItemHeading>
            <AccordionItemButton className="text-base-100 p-4 flex justify-between items-center">
               {title}
               <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-all duration-300 ${
                     isOn ? 'rotate-0' : 'rotate-180'
                  }`}
               />
            </AccordionItemButton>
         </AccordionItemHeading>
         <AccordionItemPanel className="bg-primary text-base-100 p-10">
            <p>{paragraph}</p>
         </AccordionItemPanel>
      </AccordionItem>
   )
}

export default AccordionComponent
