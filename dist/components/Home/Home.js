import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "../../styles/Home/Home.module.css";
var Home = function () {
    return (_jsxs("main", { className: styles["home-container"], children: [_jsx("h1", { className: styles.title, children: "Find your next meal" }), _jsxs("div", { className: styles["search-bar"], children: [_jsx("input", { placeholder: "pasta", type: "text", className: styles["input-field"] }), _jsx("button", { className: styles["search-btn"], children: _jsx("i", { className: "fa-solid fa-magnifying-glass" }) })] })] }));
};
export default Home;
