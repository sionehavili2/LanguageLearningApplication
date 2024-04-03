import { Outlet, Link } from "react-router-dom";
import classes from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className={classes.ul}>

          <li className={classes.li}>
            <Link to="/">Home</Link>
          </li>
          
          {/* <li className={classes.li}>
            <Link to="/Login">Login</Link>
          </li> */}
          
          <li className={classes.li}>
            <Link to="/Account">Account</Link>
          </li>

          <li className={classes.li}>
            <Link to="/Register">Sign-up</Link>
          </li>

          {/* <li className={classes.li}>
            <Link to="/Reset">Reset</Link>
          </li> */}

          <li className={classes.li}>
            <Link to="/Dashboard">Dashboard</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;