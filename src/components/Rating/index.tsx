import { StarIcon } from '@heroicons/react/solid'

const Rating = () => {
  return (
    <div className="w-full px-4">
      <div className="flex-col flex md:flex-row w-full md:gap-5">
        <div className="flex">
          {/* nome do dono da avaliação */}
          <p>Pablito Alexandrito</p>
        </div>
        <div>
          <div className="flex justify-between w-full py-2">
            <div className="flex gap-2">
              <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
              <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
              <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
              <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
              <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
              {/* aqui vai um map com as estrelas */}
            </div>
            <p>05/08/2022</p>
            {/* data da avaliação */}
          </div>

          <span>
            {/* aqui é o comentario */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus.
          </span>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  )
}
export default Rating
