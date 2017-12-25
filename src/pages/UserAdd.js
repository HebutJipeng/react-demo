import react from "react";
import { Route, Link } from "react-router-dom";
const Component = react.Component;
import Add from "./Add"
import UserList from "./UserList";
import UserEdit from "./UserEdit";

class UserAdd extends Component {
    render() {
        return (
            <div>
                <Route path={`${this.props.match.path}/add`} component={Add} />
                <Route path={`${this.props.match.path}/list`} component={UserList} /> 
                <Route path={`${this.props.match.path}/edit/:id`} component={UserEdit} />
            </div> 
        )
    }
}

export default UserAdd;