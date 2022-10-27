import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface InstallmentsProps {
  props: {
    1: number | string
    2: number | string
    3: number | string
    4: number | string
    5: number | string
    6: number | string
    7: number | string
    8: number | string
    9: number | string
    10: number | string
    11: number | string
    12: number | string
  }
  setMatchInstallments: (props: any) => void
  setValueInstallments: (props: any) => void
}

const Installments = ({
  props,
  setMatchInstallments,
  setValueInstallments,
}: InstallmentsProps) => {
  return (
    <>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(1), setValueInstallments('1x ' + props[1])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">1x {props[1]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(2), setValueInstallments('2x ' + props[2])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">2x {props[2]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(3), setValueInstallments('3x ' + props[3])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">3x {props[3]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(4), setValueInstallments('4x ' + props[4])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">4x {props[4]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(5), setValueInstallments('5x ' + props[5])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">5x {props[5]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(6), setValueInstallments('6x ' + props[6])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">6x {props[6]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(7), setValueInstallments('7x ' + props[7])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">7x {props[7]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(8), setValueInstallments('8x ' + props[8])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">8x {props[8]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(9), setValueInstallments('9x ' + props[9])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">9x {props[9]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(10), setValueInstallments('10x ' + props[10])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">10x {props[10]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(11), setValueInstallments('11x ' + props[11])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">11x {props[11]}</span>
        </label>
      </div>
      <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
        <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
          <input
            onClick={() => (
              setMatchInstallments(12), setValueInstallments('12x ' + props[12])
            )}
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
          />
          <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
          <span className="label-text text-lg">12x {props[12]}</span>
        </label>
      </div>
    </>
  )
}
export default Installments
