import {Outlet} from "react-router-dom";
import {Layout} from "./screens/styles/Layout.style.ts";
import Navbar from "./components/Navbar.tsx";


const App = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
