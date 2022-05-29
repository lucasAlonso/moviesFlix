import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import swal from "@sweetalert/with-react";

function Listado(props) {
  const [movieList, setMovieList] = useState([]);

  let token = sessionStorage.getItem("token");

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/discover/movie?api_key=f6dced79c19ead759680b55573a66d70";
    axios
      .get(url)
      .then((response) => {
        const apiData = response.data.results;
        setMovieList(apiData);
      })
      .catch((error) => {
        swal("Error", "Intenta mas tarde", "error");
      });
  }, [setMovieList]);

  return (
    <>
      {!token && <Navigate to="/" replace />}
      <div className="row">
        {movieList.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
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

export default Listado;
