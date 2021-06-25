import React, { useState } from "react";
import "./Header.css";
import logo from "./../../assets/logo.svg";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tabs, Tab, TextField, Box } from "@material-ui/core";
import Modal from "react-modal";

const useStyles = makeStyles(theme => ({
  loginButton: {
    marginLeft: theme.spacing(1),
  },
}));

const modalStyles = {
  content: {
    inset: "50% auto auto 50%",
    transform: "translate(-50%,-50%)",
    maxWidth: "300px",
  },
};

const Header = ({ id, showBookNowButton, baseUrl }) => {
  Modal.setAppElement("#root");
  const authUrl = baseUrl + "auth/";
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [usernameObj, setUserName] = useState({
    username: "",
    error: false,
    helperText: "",
  });
  const [loginPasswordObj, setLoginPassword] = useState({
    loginPassword: "",
    error: false,
    helperText: "",
  });
  const [firstNameObj, setFirstName] = useState({
    firstName: "",
    error: false,
    helperText: "",
  });
  const [lastNameObj, setLastName] = useState({
    lastName: "",
    error: false,
    helperText: "",
  });
  const [emailObj, setEmail] = useState({
    email: "",
    error: false,
    helperText: "",
  });
  const [registerPasswordObj, setRegisterPassword] = useState({
    registerPassword: "",
    error: false,
    helperText: "",
  });
  const [contactObj, setContact] = useState({
    contact: "",
    error: false,
    helperText: "",
  });
  const [registration, setRegistration] = useState(false);

  const handleInputChange = (e, stateObj, label) => {
    const currentObj = { ...stateObj };
    currentObj[label] = e.target.value;
    if (currentObj[label] === "") {
      currentObj["error"] = true;
      currentObj["helperText"] = "required";
    }
    if (currentObj.error === true && currentObj[label] !== "") {
      currentObj["error"] = false;
      currentObj["helperText"] = "";
    }
    switch (label) {
      case "username":
        setUserName(currentObj);
        break;
      case "loginPassword":
        setLoginPassword(currentObj);
        break;
      case "firstName":
        setFirstName(currentObj);
        break;
      case "lastName":
        setLastName(currentObj);
        break;
      case "email":
        setEmail(currentObj);
        break;
      case "registerPassword":
        setRegisterPassword(currentObj);
        break;
      case "contact":
        setContact(currentObj);
        break;
      default:
        break;
    }
  };

  const handleLogin = e => {
    e.preventDefault();
    if (usernameObj.error || loginPasswordObj.error) {
      return;
    }
    if (!usernameObj.error && !loginPasswordObj.error) {
      // const userPassword = localStorage.getItem(usernameObj.username);
      // if (userPassword === null) return;
      // if (userPassword === loginPasswordObj.loginPassword) {
      //   setIsLoggedIn(true);
      //   closeModal();
      // }
      const options = {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameObj.username,
          password: loginPasswordObj.password,
        }),
      }(async () => {
        try {
          const response = await fetch(`${authUrl}login`, options);
          const token = await response.json();
          if (token) {
            setIsLoggedIn(true);
            closeModal();
          }
        } catch (e) {
          console.warn(e);
        }
      })();
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    if (
      firstNameObj.error ||
      lastNameObj.error ||
      emailObj.error ||
      contactObj.error ||
      registerPasswordObj.error
    ) {
      return;
    }
    if (
      !firstNameObj.error &&
      !lastNameObj.error &&
      !emailObj.error &&
      !contactObj.error &&
      !registerPasswordObj.error
    ) {
      // localStorage.setItem(
      //   firstNameObj.firstName,
      //   registerPasswordObj.registerPassword
      // );
      // setRegistration(true);
      const options = {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: emailObj.email,
          first_name: firstNameObj.firstName,
          last_name: lastNameObj.lastName,
          mobile_number: contactObj.contact,
          password: loginPasswordObj.password,
        }),
      }(async () => {
        try {
          const response = await fetch(`${authUrl}signup`, options);
          if (response.OK) {
            setRegistration(true);
          }
        } catch (e) {
          console.warn(e);
        }
      })();
    }
  };

  const handleChange = (event, newValue) => {
    if (value === 0) {
      const userName = {
        username: "",
        error: false,
        helperText: "",
      };
      const loginPassword = {
        loginPassword: "",
        error: false,
        helperText: "",
      };
      setUserName(userName);
      setLoginPassword(loginPassword);
    } else {
      const firstName = {
        firstName: "",
        error: false,
        helperText: "",
      };
      const lastName = {
        lastName: "",
        error: false,
        helperText: "",
      };
      const email = {
        email: "",
        error: false,
        helperText: "",
      };
      const registrationPassword = {
        registerPassword: "",
        error: false,
        helperText: "",
      };
      const contact = {
        contact: "",
        error: false,
        helperText: "",
      };
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setRegisterPassword(registrationPassword);
      setContact(contact);
      setRegistration(false);
    }
    setValue(newValue);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    const userName = {
      username: "",
      error: false,
      helperText: "",
    };
    const loginPassword = {
      loginPassword: "",
      error: false,
      helperText: "",
    };
    const firstName = {
      firstName: "",
      error: false,
      helperText: "",
    };
    const lastName = {
      lastName: "",
      error: false,
      helperText: "",
    };
    const email = {
      email: "",
      error: false,
      helperText: "",
    };
    const registrationPassword = {
      registerPassword: "",
      error: false,
      helperText: "",
    };
    const contact = {
      contact: "",
      error: false,
      helperText: "",
    };
    setUserName(userName);
    setLoginPassword(loginPassword);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setRegisterPassword(registrationPassword);
    setContact(contact);
    setIsOpen(false);
  };

  return (
    <div className="header">
      <img src={logo} className="logo" alt="movies-app-logo" />
      <div>
        {showBookNowButton && !isLoggedIn && (
          <Button variant="contained" color="primary">
            Book Show
          </Button>
        )}
        {showBookNowButton && isLoggedIn && (
          <Link to={`/bookshow/${id}`}>
            <Button variant="contained" color="primary">
              Book Show
            </Button>
          </Link>
        )}
        {isLoggedIn ? (
          <Button
            className={classes.loginButton}
            variant="contained"
            onClick={() => setIsLoggedIn(false)}>
            Logout
          </Button>
        ) : (
          <Button
            className={classes.loginButton}
            variant="contained"
            onClick={openModal}>
            Login
          </Button>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {value === 0 && (
          <form
            style={{ textAlign: "center", padding: "1rem" }}
            onSubmit={handleLogin}>
            <TextField
              type="text"
              required
              label="Username"
              helperText={usernameObj.helperText}
              value={usernameObj.username}
              onChange={e => handleInputChange(e, usernameObj, "username")}
              error={usernameObj.error}
            />
            <TextField
              type="password"
              required
              label="Password"
              helperText={loginPasswordObj.helperText}
              value={loginPasswordObj.loginPassword}
              onChange={e =>
                handleInputChange(e, loginPasswordObj, "loginPassword")
              }
              error={loginPasswordObj.error}
            />
            <Box style={{ marginTop: "1.5rem" }}>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Box>
          </form>
        )}
        {value === 1 && (
          <form
            style={{ textAlign: "center", padding: "1rem" }}
            onSubmit={handleRegister}>
            <TextField
              type="text"
              required
              label="FirstName"
              helperText={firstNameObj.helperText}
              value={firstNameObj.firstName}
              onChange={e => handleInputChange(e, firstNameObj, "firstName")}
              error={firstNameObj.error}
            />
            <TextField
              type="text"
              required
              label="LastName"
              helperText={lastNameObj.helperText}
              value={lastNameObj.lastName}
              onChange={e => handleInputChange(e, lastNameObj, "lastName")}
              error={lastNameObj.error}
            />
            <TextField
              type="email"
              required
              label="Email"
              helperText={emailObj.helperText}
              value={emailObj.email}
              onChange={e => handleInputChange(e, emailObj, "email")}
              error={emailObj.error}
            />
            <TextField
              type="password"
              required
              label="Password"
              helperText={registerPasswordObj.helperText}
              value={registerPasswordObj.registerPassword}
              onChange={e =>
                handleInputChange(e, registerPasswordObj, "registerPassword")
              }
              error={registerPasswordObj.error}
            />
            <TextField
              type="password"
              required
              label="Contact"
              helperText={contactObj.helperText}
              value={contactObj.contact}
              onChange={e => handleInputChange(e, contactObj, "contact")}
              error={contactObj.error}
            />
            <Box style={{ marginTop: "1.5rem" }}>
              {registration && (
                <div style={{ margin: "1rem 0" }}>
                  Registration Successful. Please Login!
                </div>
              )}
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </Box>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Header;
