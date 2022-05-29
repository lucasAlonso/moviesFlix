import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";

function Detalle() {
  let token = sessionStorage.getItem("token");
  const [movie, setMovie] = useState(null);

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=f6dced79c19ead759680b55573a66d70&language=es-ES`;
    axios
      .get(url)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => {
        swal("Error", "Intenta mas tarde", "error");
      });
  }, [movieID]);

  return (
    <>
      {!token && <Navigate to="/" replace />}
      {!movie && <p>Cargando . . .</p>}
      {movie && (
        <>
          <h2>Titulo: {movie.title}</h2>
          <div className="row">
            <div className="col-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="movie poster"
                className="img-fluid"
              />
            </div>
            <div className="col-8">
              <h5>Fecha de estreno: {movie.release_date}</h5>
              <h5>Reseña</h5>
              <p>{movie.overview}</p>
              <h5>Rating: {movie.vote_average}</h5>
              <h5>Generos</h5>
              <ul>
                {movie.genres.map((oneGenre) => (
                  <li key={oneGenre.id}>{oneGenre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detalle;
