import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>

          <li>
            <Link to="/">Home</Link>
          </li>
          
          <li>
            <Link to="/Login">Sign Up / Login</Link>
          </li>
          
          <li>
            <Link to="/Account">Account</Link>
          </li>

          <li>
            <Link to="/Register">Register</Link>
          </li>

          <li>
            <Link to="/Reset">Reset</Link>
          </li>

          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;