import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { PlayerInfo, User } from "../../type/type";
import { jwtDecode } from "jwt-decode";


const RequireAuth = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [checkUpdate, setCheckUpdate] = useState(true);
  const navigate = useNavigate();

};

export default RequireAuth;
