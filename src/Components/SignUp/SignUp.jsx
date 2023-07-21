import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/big-logo.svg";
import { postSignUpData } from "../../services/trackit";
import { Form, SignUpNavigation, Container } from "../../common";
import ThemeSwitcher from "../ThemeSwitcher";

export default function SignUp() {
  const navigate = useNavigate();
  const [wasSent, setWasSent] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });

  function handleForm(e) {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  }

  function sendForm(e) {
    e.preventDefault();

    if (
      signUpData.name &&
      signUpData.email &&
      signUpData.image &&
      signUpData.password
    ) {
      setWasSent(true);
      const promise = postSignUpData(signUpData);

      promise
        .then(() => {
          alert("O usuário foi criado com sucesso!!");
          navigate("/");
        })
        .catch((res) => {
          alert(
            `Ocorreu um erro no cadastro do usuário. Favor tente novamente.\n- Descrição: ${
              res.response.data.details
                ? res.response.data.details[0]
                : res.response.data.message
            }`
          );
          setWasSent(false);
        });
    }

    setSignUpData({
      email: "",
      name: "",
      image: "",
      password: "",
    });
  }

  return (
    <Container>
      <ThemeSwitcher />
      <img src={logo} alt="logo" />
      <Form onSubmit={sendForm} wasSent={wasSent}>
        <input
          type="email"
          placeholder="email"
          name="email"
          autoComplete="off"
          disabled={wasSent ? true : false}
          onChange={handleForm}
          value={signUpData.email}
          data-test="email-input"
        />
        <input
          type="password"
          placeholder="senha"
          name="password"
          autoComplete="off"
          disabled={wasSent ? true : false}
          onChange={handleForm}
          value={signUpData.password}
          data-test="password-input"
        />
        <input
          type="text"
          placeholder="nome"
          name="name"
          disabled={wasSent ? true : false}
          onChange={handleForm}
          value={signUpData.name}
          data-test="user-name-input"
        />
        <input
          type="url"
          placeholder="foto"
          name="image"
          disabled={wasSent ? true : false}
          onChange={handleForm}
          value={signUpData.image}
          data-test="user-image-input"
        />
        {wasSent ? (
          <button data-test="signup-btn" disabled>
            <Bars heigth={40} width={40} color="white" />
          </button>
        ) : (
          <button data-test="signup-btn">Cadastrar</button>
        )}
      </Form>
      <SignUpNavigation>
        <Link to="/" data-test="login-link">
          Já tem uma conta? Faça login!
        </Link>
      </SignUpNavigation>
    </Container>
  );
}
