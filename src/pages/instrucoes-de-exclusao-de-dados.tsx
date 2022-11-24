export default function DeletionInstructions() {
    return (
      <div className="py-10 text-white flex flex-col gap-2 m-20">
        <h1>Instruções de Exclusão de Dados</h1>
        <p>BuyPhone utiliza uma aplicação de comentário do Facebook e não guardamos os seus dados pessoais no nosso servidor. De acordo com a política do Facebook, devemos fornecer o URL do lembrete de exclusão de dados do usuário ou o URL da instrução de exclusão de dados.</p>

        <p>Se deseja apagar as suas atividades para a aplicação BuyPhone, pode apagar as suas informações seguindo estes passos:</p>
        <ol className="list-decimal ml-8">
            <li>Vá para as configurações da sua conta do Facebook e privacidade. Clique em "Configurações".</li>
            <li>Procure por "Aplicativos e sites" e você verá todos os aplicativos e sites que você vinculou ao seu Facebook.</li>
            <li>Procure e clique em "SM FORTALEZA" na barra de pesquisa.</li>
            <li>Role para baixo e clique em "Delete".</li>
            <li>Parabéns, você removeu com sucesso as atividades da sua inscrição.</li>
        </ol>
      </div>
    )
  }
  