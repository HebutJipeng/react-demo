import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
const Component = React.Component;
import style from "../styles/home-page.less";

class Home extends Component {
    render() {
        return (
            <div className={style.welcome}>
                Welcome
            </div>
        )
    };
}

export default Home;

