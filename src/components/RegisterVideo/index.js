import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js';

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

const PROJECT_URL = "https://rpnedkugnvtgdiatirim.supabase.co";

const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbmVka3VnbnZ0Z2RpYXRpcmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1MDcwNzksImV4cCI6MjAzNjA4MzA3OX0.N7jYEFfN6_lwdrfyT3vsI_omhet-9Di0lFL8RKTLiBY";

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// Pegar youtube thumbmail da url do video
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
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

                    // Salvar video no Supabase
                    supabase.from('videos').insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos",
                    })
                    .then((retorno) => {
                        console.log(retorno);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

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
