import react from 'react';
import { Route, Link } from "react-router-dom";
import BookAdd from "./BookAdd";
import BookList from "./BookList";
import BookEdit from "./BookEdit";

class Book extends react.Component {
    render() {
        return (
            <div>
                <Link to={`${this.props.match.url}/add`}>add</Link>
                <br />
                <Link to={`${this.props.match.url}/list`}>list</Link> 
                <br />
                <Route path={`${this.props.match.path}/add`} component={BookAdd} />
                <Route path={`${this.props.match.path}/list`} component={BookList} />
                <Route path={`${this.props.match.path}/edit/:id`} component={BookEdit} />
            </div>)
    }
}

export default Book;