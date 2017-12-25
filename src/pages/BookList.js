import react from "react";
import HomeLayout from "../layouts/HomeLayout";
import { get, del } from "../utils/request";
import { message, Table, Button, Popconfirm } from 'antd';

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
        del('http://localhost:3000/book/' + book.id)
            .then(res => {
                this.setState({
                    bookList: this.state.bookList.filter(item => item.id !== book.id)
                });
                message.success('删除图书成功');
            })
            .catch(err => {
                console.error(err);
                message.error('删除图书失败');
            });
    }

    render() {
        const { bookList } = this.state;

        const columns = [
            {
                title: '图书ID',
                dataIndex: 'id'
            },
            {
                title: '书名',
                dataIndex: 'name'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (text, record) => <span>&yen;{record.price / 100}</span>
            },
            {
                title: '所有者ID',
                dataIndex: 'owner_id'
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Button.Group type="ghost">
                        <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                            <Button size="small">删除</Button>
                        </Popconfirm>
                    </Button.Group>
                )
            }
        ];

        return (
            <Table columns={columns} dataSource={bookList} rowKey={row => row.id} />
        );
    }
}

BookList.contextTypes = {
    router: react.PropTypes.object.isRequired
}

export default BookList;