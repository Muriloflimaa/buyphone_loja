import cardstyles from './Card.module.css'
import React, { useState } from 'React'
import ReactCardFlip from 'react-card-flip'

const Card = (props) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div>
                <button onClick={handleClick}>Click to flip</button>
            </div>

            <div>
                <button onClick={handleClick}>Click to flip</button>
            </div>
        </ReactCardFlip>
    )
}
export default Card
