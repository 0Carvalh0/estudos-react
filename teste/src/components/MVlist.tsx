import { useEffect, useState } from "react";

import "./MVlist.css";

import MVcard from "./MVcard";

interface Movie {
    id: number;
    poster_path?: string;
    title: string;
    release_date: string;
    vote_average: number;
}

const readToken = import.meta.env.VITE_READ_TOKEN;
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${readToken}`,
    },
};

function MVlist() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
            options
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data.results);
                setMovies(data.results);
            })
            .catch((err) => console.error("Erro ao API Response: " + err));
    }, []);

    useEffect(() => {
        console.log("Filmes atualizados: ", movies);
    }, [movies]);

    return (
        <>
            <h1 className="container__title">Populares:</h1>
            <div className="mv__list">
                {movies.map((movie) => (
                    <MVcard key={movie.id} {...movie} />
                ))}
            </div>
        </>
    );
}

export default MVlist;
