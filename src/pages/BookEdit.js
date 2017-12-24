import react from "react";
import HomeLayout from "../layouts/HomeLayout";
import BookEditor from "../component/BookEditor";
import { get } from "../utils/request";

class BookEdit extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: null
        }
    }

    componentWillMount() {
        const bookId = this.context.router.route.match.params.id;
        get('http://localhost:3000/book/' + bookId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    book: res
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { book } = this.state
        return book ?  <BookEditor editTarget={book} /> : '加载中...'
    }
}

BookEdit.contextTypes = {
    router: react.PropTypes.object.isRequired
}

export default BookEdit;