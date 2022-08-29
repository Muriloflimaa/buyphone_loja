export default function ForgotPassword() {
    return (
        <div className="grid gap-3 pt-3">
            <h1>
                Esqueceu sua senha? Sem problemas. Apenas informe seu endereço
                de e-mail que enviaremos um link que permitirá definir uma nova
                senha.
            </h1>
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <label className="input-group">
                    <input
                        type="text"
                        placeholder="BuyPhone@gmail.com"
                        className="input input-bordered rounded-md !important w-full text-PrimaryText"
                    />
                </label>
            </div>
            <div className="flex justify-center mt-4">
                <button type="submit" className="btn w-full normal-case">
                    Enviar link para redefinir senha por e-mail
                </button>
            </div>
        </div>
    )
}
