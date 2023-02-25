import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appContext from "../Context/context";

const AdminProtected = ({ Component }) => {
  const { isAdmin } = useContext(appContext);

  const nav = useNavigate();
  useEffect(() => {
    if (isAdmin === null || isAdmin === false || isAdmin === undefined) {
      nav("/");
    }
  });

  return <Component />;
};

const WelcomeProtected = ({ Component }) => {
  const { isAdmin } = useContext(appContext);

  const nav = useNavigate();
  useEffect(() => {
    if (isAdmin === null || isAdmin === undefined ) {
      nav("/");
    }
  });

  return <Component />;
};
export { AdminProtected, WelcomeProtected };
