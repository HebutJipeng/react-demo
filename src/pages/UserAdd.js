import react from "react";
import { Route, Link } from "react-router-dom";
const Component = react.Component;
import Add from "./Add"
import UserList from "./UserList";

class UserAdd extends Component {
    render() {
        return (
            <div>
                <Link to={`${this.props.match.url}/add`}>add</Link>
                <br/>
                <Link to={`${this.props.match.url}/list`}>list</Link>
                <br />
                <Route path={`${this.props.match.path}/add`} component={Add} />
                <Route path={`${this.props.match.path}/list`} component={UserList} /> 
            </div> 
        )
    }
}

export default UserAdd;