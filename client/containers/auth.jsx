import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthForm from "../components/authForm";
import { NavbarContext } from "../NavbarContext";

const Auth = ({ navigate }) => {
  const { authMode, setAuthMode } = useContext(NavbarContext).authModeState;
  const { setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  const { setLoggedIn } = useContext(NavbarContext).loggedState;
  const { setUser } = useContext(NavbarContext).userState;

  document.body.style.backgroundImage = "none";

  const { register, handleSubmit } = useForm();
  // render either log in or sign up form
  const renderLogin = authMode === "login";

  const onSubmit = async (data) => {
    console.log("in onSubmit");
    let endPoint = "/api/login";
    let errorMessage = "Login failed: invalid password or username";

    // getting data out of form
    const credentials = { username: data.username, password: data.password };
    if (data.email) {
      credentials.email = data.email;
      // if there is an email in the form, that means we have sign up form
      endPoint = "/api/signup";
      errorMessage = "Sign up failed: this email or username is already taken";
    }
    if (data.firstName) credentials.firstName = data.firstName;
    if (data.lastName) credentials.lastName = data.lastName;

    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        const user = await response.json();
        setRenderDrawerButton(true);
        setAuthMode("");
        setLoggedIn(true);
        setUser(user);
        return navigate("/dashboard");
      }
      console.log(errorMessage);
    } catch (err) {
      console.log("Network error occurred");
    }
  };

  return (
    <>
      {renderLogin && (
        <AuthForm
          navigate={navigate}
          setAuthMode={setAuthMode}
          setRenderDrawerButton={setRenderDrawerButton}
          type={"Log In"}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
        />
      )}
      {!renderLogin && (
        <AuthForm
          navigate={navigate}
          setAuthMode={setAuthMode}
          setRenderDrawerButton={setRenderDrawerButton}
          type={"Sign Up"}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
        />
      )}
    </>
  );
};

export default Auth;
