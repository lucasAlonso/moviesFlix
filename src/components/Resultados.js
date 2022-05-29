import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { Navigate } from "react-router-dom";

function Resultados(props) {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");
  let location = useLocation();
  let token = sessionStorage.getItem("token");
  const [moviesResult, setMoviesResult] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=f6dced79c19ead759680b55573a66d70&language=es-ES&query=${keyword}`;
    console.log(location.search);
    axios
      .get(endPoint)
      .then((response) => {
        const queryResult = response.data.results;
        if (queryResult.length === 0) {
          swal("Error", "No hubo resultados", "error");
        }
        setMoviesResult(queryResult);
      })
      .catch((error) => {
        swal("Error", "Intenta mas tarde", "error");
      });
  }, [keyword, location]);

  return (
    <>
      {!token && <Navigate to="/" replace />}
      <h2>Buscaste: {keyword}</h2>
      {moviesResult.length === 0 && <h3>No hay resultados</h3>}
      <div className="row">
        {moviesResult.map((oneMovie, idx) => {
          return (
            <div className="col-4" key={idx}>
              <div className="card my-4">
                <img
                  src={
                    "https://image.tmdb.org/t/p/w500/" + oneMovie.poster_path
                  }
                  className="card-img-top"
                  alt="..."
                />
                <button
                  className="favourite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  🖤
                </button>
                <div className="card-body">
                  <h5 className="card-title">
                    {oneMovie.title.substring(0, 30)}
                  </h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    View detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Resultados;
