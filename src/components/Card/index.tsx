import Image from 'next/image'
import logoAmericanExpress from '../../assets/images/americanexpress.svg'
import logoElo from '../../assets/images/elo.svg'
import logoMastercard from '../../assets/images/mc.svg'
import logoVisa from '../../assets/images/visa.svg'
import styles from './Card.module.scss'

interface CardProps {
    name: string
    card: string
    expiration_date: any
    foc: boolean
    code: string
    flags: string
}

const Card = ({ name, card, expiration_date, foc, code, flags }: CardProps) => {
    return (
        <>
            <div
                onClick={() => !foc}
                className={styles.card_container + ' cursor-pointer'}
            >
                <div
                    className={
                        styles.card + (foc == true ? ' rotate-Y-180' : '')
                    }
                >
                    <div
                        className={
                            'bg-[url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/513985/cc-front-bg.png")] h-64 bg-contain bg-no-repeat  ' +
                            styles.front
                        }
                    >
                        <div className="flex justify-end">
                            {flags &&
                                <Image
                                    className="w-10 h-6"
                                    src={flags === '0' ? logoVisa : flags === '1' ? logoMastercard : flags === '2' ? logoAmericanExpress : flags === '3' && logoElo}
                                    alt="Imagem bandeira"
                                />
                            }
                        </div>
                        <div className="text-2xl w-full text-center mt-24">
                            <span className={styles.spanTest}>{card}</span>
                        </div>
                        <div className="flex justify-between w-full px-4 mt-8">
                            <div className="flex flex-col items-start">
                                <p className="text-xs font-light">
                                    Nome no cartão:{' '}
                                </p>
                                <div className="flex text-lg">
                                    <span className={styles.spanTest}>
                                        {name}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-xs font-light">
                                    Expira em:{' '}
                                </p>
                                <div className="flex gap-1 mx-2 text-xs">
                                    <span className={styles.spanTest}>
                                        {expiration_date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            'bg-[url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/513985/cc-back-bg-new.png)] h-64 bg-contain bg-no-repeat ' +
                            styles.back
                        }
                    >
                        <div className="flex justify-end w-full mt-[70px] -ml-[0.7rem] text-2xl">
                            <span className={styles.spanTest}>{code}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card
