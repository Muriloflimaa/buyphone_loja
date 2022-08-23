import styles from './Card.module.scss'

interface CardProps {
    name: string
    card: number
    expiration_date: any
}

const Card = ({ name, card, expiration_date }: CardProps) => {
    return (
        <>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <div
                        className={
                            'bg-[url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/513985/cc-front-bg.png")] bg-no-repeat  ' +
                            styles.front
                        }
                    >
                        <div className="flex justify-end">
                            <img
                                className="w-10 h-6"
                                src="https://logosmarcas.net/wp-content/uploads/2020/05/Visa-Logo.png"
                                alt=""
                            />
                        </div>
                        <div className="text-2xl w-full text-center mt-14">
                            <span className={styles.spanTest}>{card}</span>
                        </div>
                        <div className="flex gap-1 justify-end items-center px-6">
                            <p className="text-xs font-light">Expira em: </p>
                            <div className="flex gap-1 mx-2 text-xs">
                                <span className={styles.spanTest}>
                                    {expiration_date}
                                </span>
                                <span className={styles.spanTest}>/</span>
                                <span className={styles.spanTest}>
                                    {expiration_date}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-start px-6">
                            <p className="text-xs font-light">
                                Nome no cartão:{' '}
                            </p>
                            <div className="flex text-lg">
                                <span className={styles.spanTest}>{name}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            'bg-[url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/513985/cc-back-bg-new.png)] bg-no-repeat ' +
                            styles.back
                        }
                    >
                        verso
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card
