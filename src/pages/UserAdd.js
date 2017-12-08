import react from "react";
import { Route, Link } from "react-router-dom";
const Component = react.Component;
import Add from "./Add"
import UserList from "./UserList";

class UserAdd extends Component {
    render() {
        return (
            <div>
                <div>this is useradd page</div>
                <Link to={`${this.props.match.url}/add`}>add</Link>
                <br/>
                <Link to={`${this.props.match.url}/list`}>list</Link>
                <br />
                {this.props.match.path}
                <Route path={`${this.props.match.path}/add`} component={Add} />
                <Route path={`${this.props.match.path}/list`} component={UserList} /> 
            </div> 
        )
    }
}

// const UserAdd = ({match}) => {
//     return (
//         <div>
//             <div>this is useradd page</div>
//             <Link to={`${match.url}/add`}>add</Link>
//             <br/>
//             {match.path}
//             <Route path={`${match.path}/add`} component={ Add } />
//         </div>
//     );
// }
    


export default UserAdd;