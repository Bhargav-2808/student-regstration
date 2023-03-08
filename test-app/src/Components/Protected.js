import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appContext from "../Context/context";

const AdminProtected = ({ Component }) => {
  const { isAdmin } = useContext(appContext);


  const nav = useNavigate();
  useEffect(() => {
    if (
      isAdmin === null ||
      isAdmin === false ||
      isAdmin === undefined 
    ) {
      nav("/");
    }
  });

  return <Component />;
};

const WelcomeProtected = ({ Component }) => {
  const { isAdmin } = useContext(appContext);

  const nav = useNavigate();
  useEffect(() => {
    if (isAdmin === null || isAdmin === undefined) {
      nav("/");
    }
  });

  return <Component />;
};
const AdminUserProtected = ({ Component }) => {
  const { isAdmin,filterUserPermission } = useContext(appContext);


  const nav = useNavigate();
  useEffect(() => {
    if (
      isAdmin === null ||
      isAdmin === false ||
      isAdmin === undefined ||
      filterUserPermission?.permission === null || 
      filterUserPermission?.permission === undefined 
    ) {
      nav("/");
    }
  });

  return <Component />;
};
const AdminProductProtected = ({ Component }) => {
  const { isAdmin, filterProductPermission } = useContext(appContext);


  const nav = useNavigate();
  useEffect(() => {
    if (
      isAdmin === null ||
      isAdmin === false ||
      isAdmin === undefined ||
      filterProductPermission?.permission === null || 
      filterProductPermission?.permission === undefined 

    ) {
      nav("/");
    }
  });

  return <Component />;
};

export { AdminProtected, WelcomeProtected, AdminProductProtected,AdminUserProtected };
