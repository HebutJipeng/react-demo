import react from 'react';
import { Route, Link } from "react-router-dom";
import BookAdd from "./BookAdd";
import BookList from "./BookList";
import BookEdit from "./BookEdit";

class Book extends react.Component {
    render() {
        return (
            <div>
                <Route path={`${this.props.match.path}/add`} component={BookAdd} />
                <Route path={`${this.props.match.path}/list`} component={BookList} />
                <Route path={`${this.props.match.path}/edit/:id`} component={BookEdit} />
            </div>)
    }
}

export default Book;