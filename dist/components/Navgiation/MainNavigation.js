import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Navigation/MainNavigation.module.css";
var MainNavigation = function () {
    return (_jsx("nav", { className: styles.navigation, children: _jsx("div", { className: styles["nav-container"], children: _jsxs("ul", { className: styles["nav-list"], children: [_jsx("li", { className: styles["nav-list-item"], children: _jsx(NavLink, { to: "/auth", children: "Login" }) }), _jsx("li", { className: styles["nav-list-item"], children: _jsx(NavLink, { to: "/", children: "Home" }) })] }) }) }));
};
export default MainNavigation;
