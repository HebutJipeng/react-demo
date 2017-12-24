import react from "react";
import HomeLayout from "../layouts/HomeLayout";
import { get, del } from "../utils/request";

class BookList extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: []
        }
    }
    componentWillMount() {
        get('http://localhost:3000/book')
            .then(res => {
                console.log('-->', res)
                this.setState({
                    bookList: res
                });
            })
            .catch(err => console.error(err))
    }

    handleEdit(book) {
        console.log(this.context.router)
        this.context.router.history.push('/book/edit/' + book.id)
    }

    handleDel(book) {
        const confirmed = confirm(`确定要删除 ${book.name}`);
        console.log(confirmed)

        if (confirmed) {
            del('http://localhost:3000/book', {
                id: book.id
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        booList: this.state.bookList.filter(item => item.id !== book.id)
                    })
                    alert('删除书籍成功')
                })
                .catch(err => {
                    console.log(err);
                    alert('删除书籍失败')
                })

        }
    }

    render() {
        const { bookList } = this.state
        return (
            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>price</td>
                        <td>owner_id</td>
                        <td>method</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookList.map((book) => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.name}</td>
                                    <td>{book.price}</td>
                                    <td>{book.owner_id}</td>
                                    <td>
                                        <a href="javascript:;" onClick={() => { this.handleEdit(book) }}>编辑</a>
                                        <br />
                                        <a href="javascript:;" onClick={() => { this.handleDel(book) }}>删除</a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        )
    }
}

BookList.contextTypes = {
    router: react.PropTypes.object.isRequired
}

export default BookList;