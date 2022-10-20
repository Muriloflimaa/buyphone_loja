import Image from 'next/image'
import { useRouter } from 'next/router'
import JuninhoImg from '../../assets/images/juninho.webp'

export default function SearchResult() {
  const { query } = useRouter()
  const data = query.index
  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 px-4">
      <div>
        <Image src={JuninhoImg} layout="fixed" width={200} height={250} />
      </div>
      <div className="mt-4">
        <span className="text-lg text-info-content">
          <span className="font-semibold text-3xl">Ops!</span>
          <p>Não encontramos nenhum resultado para a busca por</p>
          <p className="font-medium text-lg">"{data}"</p>
        </span>
        <ul className="list-disc pl-4 mt-4 text-red-600">
          <li>Verifique se a palavra foi digitada corretamente.</li>
          <li>Tente palavras menos específicas.</li>
          <li>Tente palavras-chave diferentes.</li>
          <li>Faça buscas relacionadas.</li>
        </ul>
      </div>
    </div>
  )
}
