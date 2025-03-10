import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import navbarBG from '../homeBG.png';

function Navbar() {
  const [account, setAccount] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(null);

  const logout = async () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const account = localStorage.getItem("account");
    setRole(localStorage.getItem("role"));
    setAccount(JSON.parse(account));
  }, []);

  const handleMouseEnter = (link) => {
    setHovered(link);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <nav style={styles.navbar}>
      <Link
        to="/"
        style={{
          ...styles.logo,
          color: hovered === 'logo' ? '#FD723F' : '#fff'
        }}
        onMouseEnter={() => handleMouseEnter('logo')}
        onMouseLeave={handleMouseLeave}
      >
        D
      </Link>
      <div style={styles.navLinks}>
        <Link
          to="/"
          style={{
            ...styles.navLink,
            backgroundColor: hovered === 'home' ? '#555' : 'transparent',
            color: hovered === 'home' ? '#f0f0f0' : '#fff'
          }}
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </Link>
        {role === "Admin" && (
          <>
            <Link
              to="/Requests"
              style={{
                ...styles.navLink,
                backgroundColor: hovered === 'requests' ? '#555' : 'transparent',
                color: hovered === 'requests' ? '#f0f0f0' : '#fff'
              }}
              onMouseEnter={() => handleMouseEnter('requests')}
              onMouseLeave={handleMouseLeave}
            >
              Requests
            </Link>
            <Link
              to="/Stocks"
              style={{
                ...styles.navLink,
                backgroundColor: hovered === 'stocks' ? '#555' : 'transparent',
                color: hovered === 'stocks' ? '#f0f0f0' : '#fff'
              }}
              onMouseEnter={() => handleMouseEnter('stocks')}
              onMouseLeave={handleMouseLeave}
            >
              IT Stocks
            </Link>
            <Link
              to="/Jobs"
              style={{
                ...styles.navLink,
                backgroundColor: hovered === 'jobs' ? '#555' : 'transparent',
                color: hovered === 'jobs' ? '#f0f0f0' : '#fff'
              }}
              onMouseEnter={() => handleMouseEnter('jobs')}
              onMouseLeave={handleMouseLeave}
            >
              Jobs
            </Link>
            <Link
              to="/FQA"
              style={{
                ...styles.navLink,
                backgroundColor: hovered === 'fqa' ? '#555' : 'transparent',
                color: hovered === 'fqa' ? '#f0f0f0' : '#fff'
              }}
              onMouseEnter={() => handleMouseEnter('fqa')}
              onMouseLeave={handleMouseLeave}
            >
              FQA
            </Link>
          </>
        )}
        {role === "User" && (
          <>
            <Link
              to="/AddRequests"
              style={{
                ...styles.navLink,
                backgroundColor: hovered === 'addRequests' ? '#555' : 'transparent',
                color: hovered === 'addRequests' ? '#f0f0f0' : '#fff'
              }}
              onMouseEnter={() => handleMouseEnter('addRequests')}
              onMouseLeave={handleMouseLeave}
            >
              Support Request
            </Link>
            <Link
              to="/FQA"
              style={{
                ...styles.navLink,
                backgroundColor: hovered === 'fqaUser' ? '#555' : 'transparent',
                color: hovered === 'fqaUser' ? '#f0f0f0' : '#fff'
              }}
              onMouseEnter={() => handleMouseEnter('fqaUser')}
              onMouseLeave={handleMouseLeave}
            >
              FQA
            </Link>
          </>
        )}
        {account ? (
          <>
            <Link
              to="/login"
              onClick={logout}
              style={{
                ...styles.navLink,
                backgroundColor: hovered === 'logout' ? '#555' : 'transparent',
                color: hovered === 'logout' ? '#f0f0f0' : '#fff'
              }}
              onMouseEnter={() => handleMouseEnter('logout')}
              onMouseLeave={handleMouseLeave}
            >
              Logout
            </Link>
            <div>
            <p style={styles.accountText}>
              {account.username}
            </p>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              ...styles.navLink,
              backgroundColor: hovered === 'login' ? '#555' : 'transparent',
              color: hovered === 'login' ? '#f0f0f0' : '#fff'
            }}
            onMouseEnter={() => handleMouseEnter('login')}
            onMouseLeave={handleMouseLeave}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    padding: "10px 20px",
    backgroundColor: "#444",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundImage: `url(${navbarBG})`,
    backgroundSize: "cover",
    backgroundBlendMode: "overlay",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "2px solid #fff",
  },
  logo: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textDecoration: "none",
    letterSpacing: "1px",
    transition: "color 0.6s ease",
    padding: "0 10px",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  accountText: {
    color: "#120",
    fontSize: "0.9rem",
    alignItems: "center",
  },
};

export default Navbar;