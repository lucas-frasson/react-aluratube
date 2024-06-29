import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {

    // const mensagem = "Bem vindo ao AluraTube!";
    const estiloHomePage = { 
        // backgroundColor: "red" 
    };

    const [valorFiltro, setValorFiltro] = React.useState("");

    return (
        <>
            <CSSReset/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
                <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro} />
                <Header/>
                <Timeline valorFiltro={valorFiltro} playlists={config.playlists} />
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${config.bg});
    height: 230px;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
                {/* <img src="banner"/> */}
                <section className="user-info">
                    <img src={`https://github.com/${config.github}.png`}/>
                    <div>
                        <h2>
                            {config.name}
                        </h2>
                        <p>
                            {config.job}
                        </p>
                    </div>
                </section>
        </StyledHeader>
    )
}

function Timeline( {valorFiltro, ...propriedades} ) {

    const playlistNames = Object.keys(propriedades.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {

                const videos = propriedades.playlists[playlistName];

                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {

                                const titleNormalized = video.title.toLowerCase();
                                const valorFiltroNormalized = valorFiltro.toLowerCase();

                                // Retornar video com o tiulo que está sendo digitado no input de busca
                                return titleNormalized.includes(valorFiltroNormalized);

                            }).map((video) => {
                                return (
                                    <a href={video.url} key={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}
