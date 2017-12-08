import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
const Component = React.Component;

class Home extends Component {
    render() {
        return (
            <HomeLayout title="Welcome">
                <Link to="/user/add" >添加用户</Link>
                <br/>
                <Link to="/user/list">用户列表</Link>
            </HomeLayout>
        )
    };
}

export default Home;

