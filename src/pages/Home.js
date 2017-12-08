import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
const Component = React.Component;

class Home extends Component {
    render() {
        return (
                <div>
                        <header>
                            <h1>welcome</h1>
                        </header>
                        <section> 
                            <Link to="/user/add" >添加用户</Link>
                            {/* <Link to="/user/list">用户列表</Link> */}
                        </section>
                </div>
        )
    };
}

export default Home;

