import { useSelector } from "react-redux";

import Counter from "./components/Counter.js";
import Header from "./components/Header.js";
import Auth from "./components/Auth.js";
import UserProfile from "./components/UserProfile.js";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Header />
      {!isAuthenticated ? <Auth /> : <UserProfile />}
      <Counter />
    </>
  );
}

export default App;
