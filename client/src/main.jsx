import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-chtdxiyk0gihtx5m.us.auth0.com"
      clientId="WGBBIsrG4rzKwq1PjvO2JSJ1jiZGPU4v"
      authorizationParams={{
        redirect_uri: "https://real-estate-full-stack-mern-project-teal.vercel.app"
      }}
      audience="https://real-estate-full-stack-mern-project.vercel.app"
      scope="openId profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
