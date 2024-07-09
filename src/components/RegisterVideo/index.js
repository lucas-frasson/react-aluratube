import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsForm){
    const [values, setValues] = React.useState(propsForm.initialValues);

    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values, 
                [name]: value,
            })
        },
        clearForm() {
            setValues({});
        }
    }
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Jogos", url: "https://youtube" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Se o formVisivel for verdadeiro, mostra o modal */}
            {formVisivel ? (
                <form onSubmit={(e) => {
                    e.preventDefault();

                    // Fechar modal
                    setFormVisivel(false);

                    // Limpar form
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>

                        <input placeholder="Titulo do vídeo" 
                        name="titulo"
                        value={formCadastro.values.titulo} 
                        onChange={formCadastro.handleChange} />

                        <input placeholder="URL do vídeo"
                        name="url"
                        value={formCadastro.values.url}
                        onChange={formCadastro.handleChange} />

                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            ) : false}
        </StyledRegisterVideo>
    );
}
