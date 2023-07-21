import { useContext, useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/big-logo.svg";
import UserContext from "../../contexts/UserContext";
import { postLogin } from "../../services/trackit";
import { Form, SignUpNavigation, Container } from "../../common";
import ThemeSwitcher from "../ThemeSwitcher";

export default function SignIn() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserData(JSON.parse(localStorage.getItem("user")));
      navigate("/hoje");
    }
  }, [setUserData, navigate]);

  function handleForm(e) {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  }

  function sendLogin(e) {
    e.preventDefault();

    if (signInData.email && signInData.password && !loggedIn) {
      setLoggedIn(true);
      const promise = postLogin(signInData);

      promise
        .then((res) => {
          localStorage.setItem("hash", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
          setUserData(res.data);
          navigate("/hoje");
        })
        .catch((res) => {
          alert(
            `Ocorreu um erro no cadastro do usuário. Favor tente novamente.\n- Descrição: ${
              res.response.data.details
                ? res.response.data.details[0]
                : res.response.data.message
            }`
          );
          setLoggedIn(false);
        });

      setSignInData({
        email: "",
        password: "",
      });
    }
  }

  return (
    <Container>
      <ThemeSwitcher />
      <img src={logo} alt="logo" />
      <Form onSubmit={sendLogin} loggedIn={loggedIn}>
        <input
          data-test="email-input"
          type="email"
          placeholder="email"
          autoComplete="username"
          name="email"
          value={signInData.email}
          onChange={handleForm}
          disabled={loggedIn ? true : false}
        />
        <input
          data-test="password-input"
          type="password"
          placeholder="senha"
          autoComplete="current-password"
          name="password"
          value={signInData.password}
          onChange={handleForm}
          disabled={loggedIn ? true : false}
        />
        {loggedIn ? (
          <button data-test="login-btn" disabled>
            <Bars heigth="40px" width={40} color="white" />
          </button>
        ) : (
          <button data-test="login-btn">Entrar</button>
        )}
      </Form>
      <SignUpNavigation>
        <Link to="/cadastro" data-test="signup-link">
          Não tem uma conta? Cadastre-se!
        </Link>
      </SignUpNavigation>
    </Container>
  );
}
