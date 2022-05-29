import axios from "axios";
import swal from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (email === "" || password === "") {
      swal("Error", "Los campos no pueden estar vacios!", "error");
      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      swal("Error", "email invalido!", "error");
      return;
    }
    if (email !== "challenge@alkemy.org" || password !== "react") {
      swal("Error", "Credenciales invalidas!", "error");
      return;
    }
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swal("Ingreso Correcto", "Login Correcto", "success");
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        navigate("/listado", { replace: true });
      });
  };

  return (
    <>
      {token && <Navigate to="/listado" replace />}
      <div className="row">
        <h2>Formulario de login</h2>
        <form onSubmit={submitHandler}>
          <label className="form-label d-block mt-2">
            <span>Correo Electronico</span>
            <br />
            <input className="form-control" type="email" name="email" />
          </label>
          <br />
          <label className="form-label d-block mt-2">
            <span>Password</span>
            <br />
            <input className="form-control" type="password" name="password" />
          </label>
          <br />
          <button className="btn btn-success mt-2" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
