import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/Login";
import Listado from "./components/Listado";
import Detalle from "./components/Detalle";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

import "./css/bootstrap.min.css";
import "./css/app.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal != null) {
      const favArray = JSON.parse(favsInLocal);
      setFavorites(favArray);
    }
  }, []);

  const favMovies = localStorage.getItem("favs");
  let tempMovieInFavs;
  if (favMovies === null) {
    tempMovieInFavs = [];
  } else {
    tempMovieInFavs = JSON.parse(favMovies);
  }
  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = { imgURL, title, overview, id: btn.dataset.movieId };
    let movieIsInArray = tempMovieInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      tempMovieInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMovieInFavs));
      setFavorites(tempMovieInFavs);
    } else {
      let moviesLeft = tempMovieInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
    }
  };
  return (
    <div className="container mt-3">
      <Header favorites={favorites} />
      <Routes>
        <Route path="" element={<Login />} />
        <Route
          path="listado"
          element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />}
        />
        <Route path="/detalle" element={<Detalle />} />
        <Route
          element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          path="/resultados"
        />
        <Route
          path="/favoritos"
          element={
            <Favoritos
              favorites={favorites}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
