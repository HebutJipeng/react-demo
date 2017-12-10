import react from "react";
import HomeLayout from "../layouts/HomeLayout";
import BookEditor from "../component/BookEditor";

class BookEdit extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: null
        }
    }

    componentWillMount() {
        const bookId = this.context.router.route.match.params.id;
        fetch('http://localhost:3000/book/' + bookId)
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
        return (
            <HomeLayout title="编辑书籍信息">
                {
                    book ? <BookEditor editTarget={book} /> : '加载中...'
                }
            </HomeLayout>
        )
    }
}

BookEdit.contextTypes = {
    router: react.PropTypes.object.isRequired
}

export default BookEdit;