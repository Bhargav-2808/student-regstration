import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtected = ({ Component }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user") !== "admin") {
      nav("/");
    }
  });

  return <Component />;
};

const WelcomeProtected = ({ Component }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      nav("/");
    }
  });

  return <Component />;
};
export { AdminProtected, WelcomeProtected };
