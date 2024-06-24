export default () => {
  const isAuth = useState("isAuth", () => false);
  const token = useState<string | null>("token", () => null);

  const setAuth = (authToken: string | null) => {
    if (process.client) {
      if (authToken) {
        isAuth.value = true;
        token.value = authToken;
        localStorage.setItem("token", authToken);
      } else {
        localStorage.removeItem("token");
      }
    }
  };

  if (process.client) {
    isAuth.value = !!localStorage.getItem("token");
    token.value = localStorage.getItem("token");
  }

  return {
    isAuth,
    token,
    setAuth,
  };
};
