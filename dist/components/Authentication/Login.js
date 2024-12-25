import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from "react";
import styles from "../../styles/Authentication/Login.module.css";
var Login = function () {
    var signUpRef = useRef(null);
    var signUpPasswordRef = useRef(null);
    var loginRef = useRef(null);
    var loginPasswordRef = useRef(null);
    var users = [];
    var handleSignUpSubmit = function (e) {
        e.preventDefault();
        var userDetails = {
            username: signUpRef.current.value,
            password: signUpPasswordRef.current.value,
        };
        users.push(userDetails);
        localStorage.setItem("user", JSON.stringify(users));
        signUpPasswordRef.current.value = "";
        signUpRef.current.value = "";
    };
    var handleLoginSubmit = function (e) {
        e.preventDefault();
        var loginUserDetails = {
            username: loginRef.current.value,
            password: loginPasswordRef.current.value,
        };
        console.log(users.includes(loginUserDetails));
        // const retreiveUsers = localStorage.getItem("user");
        // if (retreiveUsers) {
        //   if (users.includes(loginUserDetails)) {
        //     console.log("Welcome Back!");
        //   } else {
        //     console.log("Check your username or password again");
        //   }
        //   loginRef.current!.value = "";
        //   loginPasswordRef.current!.value = "";
        // } else {
        //   alert("No user found.");
        // }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("form", { onSubmit: handleSignUpSubmit, children: [_jsx("h1", { children: "Sign Up" }), _jsxs("div", { children: [_jsx("label", { htmlFor: "signup-username", children: "Username" }), _jsx("input", { type: "text", name: "signup-username", className: styles.username, ref: signUpRef, id: "signup-username", autoComplete: "nkhan018" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "signup-password", children: "Password" }), _jsx("input", { type: "password", name: "signup-password", className: styles.password, ref: signUpPasswordRef, id: "signup-password", autoComplete: "123" })] }), _jsx("button", { type: "submit", children: "Sign Up" })] }), _jsxs("form", { onSubmit: handleLoginSubmit, children: [_jsx("h1", { children: "Login" }), _jsxs("div", { children: [_jsx("label", { htmlFor: "login-username", children: "Username" }), _jsx("input", { type: "text", name: "login-username", className: styles.username, id: "login-username", ref: loginRef, autoComplete: "nkhan018" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "login-password", children: "Password" }), _jsx("input", { type: "password", name: "login-password", className: styles.password, id: "login-password", ref: loginPasswordRef, autoComplete: "123" })] }), _jsx("button", { type: "submit", children: "Log In" })] })] }));
};
export default Login;
