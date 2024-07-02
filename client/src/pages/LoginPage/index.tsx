import { IUserLogin } from "@/commons/interfaces";
import AuthService from "@/service/AuthService";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';


export function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [undefinedUser, setUndefinedUser] = useState("");
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickLogin = async () => {
    setUndefinedUser("")
    if (!form.username || !form.password) {
      return setUndefinedUser("Informe usuário e senha para realizar o login")
    }

    const login: IUserLogin = {
      username: form.username,
      password: form.password,
    };

    const response = await AuthService.login(login);
    if (response.status === 200) {
      setApiSuccess("Autenticação realizada com sucesso!");
      setTimeout(() => {
        navigate("/productList");
      }, 1000);
    } else {
      setApiError("Erro ao autenticar o usuário!");
    }

    setPendingApiCall(false);
  };

  return (
    <>
      <div className="container">
        <MDBContainer fluid>

          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
              <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                <img src={"https://moodle.utfpr.edu.br/pluginfile.php/1/core_admin/logocompact/300x300/1707141966/UTFPR%20-%20Identidade%20Visual%20-2.png"} className="product-image" />
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Informe se usuario e senha</p>
                  <div className="col-12 mb-3">
                    <label htmlFor="username">Informe seu usuário:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={form.username}
                      placeholder="Informe seu usuário"
                      className="form-control"
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="password">Informe sua senha:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={form.password}
                      placeholder="******"
                      className="form-control"
                      onChange={onChange}
                    />
                  </div>
                  {undefinedUser && (
                    <div className="alert alert-warning text-center">{undefinedUser}</div>
                  )}

                  {apiError && (
                    <div className="alert alert-danger text-center">{apiError}</div>
                  )}
                  {apiSuccess && (
                    <div className="alert alert-success text-center">{apiSuccess}</div>
                  )}
                  <div className="text-center">
                    <button
                      disabled={pendingApiCall}
                      className="btn btn-primary"
                      onClick={onClickLogin}
                    >
                      {pendingApiCall && (
                        <div
                          className="spinner-border spinner-border-sm text-light-spinner mr-sm-1"
                          role="status"
                        ></div>
                      )}
                      Login
                    </button>
                  </div>
                  <p></p>
                  <div className="text-center">
                    <Link to="/signup" className="signup-link">Cadastre-se</Link>
                  </div>
                </MDBCardBody>
              </MDBCard>

            </MDBCol>
          </MDBRow>

        </MDBContainer>


      </div>
    </>
  );
}
