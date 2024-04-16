import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Home </Link>
          {/* <Link to="/login">Login </Link> */}
          {/* <Link to="/single">SingleFileUpload </Link> */}
          <Link to="/SingleFile">SingleFile </Link>
          <Link to="/transl">local translation </Link>
        </div>
    </div>
  );
};

export default NavBar;
