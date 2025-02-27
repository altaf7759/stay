import React from "react";
import "./Login.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUserData } from "../../faetures/Login/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;

    fetch("https://pleasant-comfort-stay-backend.up.railway.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Response failed with status:", response.status);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.user || !data.id) {
          throw new Error("Invalid data structure received from the server");
        }

        console.log(
          "Login API response:",
          data.user.name,
          data.user.email,
          data.id
        );
        dispatch(
          setUserData({
            id: data.id,
            name: data.user.name,
            email: data.user.email,
          })
        );

        navigate(-1);
      })
      .catch((error) => {
        console.error("Error during fetch or processing:", error);
        alert("Failed to Login!");
      });
  };

  const handleLoginError = () => {
    alert("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="537603122600-eie1b52uijo6b62hv6k9vbem2hhto9bj.apps.googleusercontent.com">
      <div className="login-box">
        <div className="login">
          <h1>
            Stay<span>.com</span>
          </h1>
          <p>Login with your Google account</p>
          <div className="google-login-btn">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              redirectUri="https://stay-frontend.vercel.app"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
