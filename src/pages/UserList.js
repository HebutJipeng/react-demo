import react from "react";
import { message, Table, Button, Popconfirm } from 'antd';
import { get, del } from "../utils/request";

class UserList extends react.Component{
    constructor (props) {
        super(props);
        this.state = {
            userList: []
        }
    }
    componentWillMount () {
        get('http://localhost:3000/user')
            .then(res => {
                console.log(res)
                this.setState({
                    userList: res
                });
            });
    }

    handleEdit (user) {
        console.log(this.context.router)
        this.context.router.history.push('/user/edit/' + user.id)
    }

    handleDel (user) {
        const confirmed = confirm(`确定要删除用户 ${user.name}`);
        del('http://localhost:3000/user/' + user.id)
            .then(res => {
                this.setState({
                    userList: this.state.bookList.filter(item => item.id !== user.id)
                });
                message.success('删除用户成功');
            })
            .catch(err => {
                console.error(err);
                message.error('删除用户失败');
            });
    }

    render() {
        const { userList } = this.state;

        const columns = [
            {
                title: '用户ID',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'name'
            },
            {
                title: '性别',
                dataIndex: 'gender'
            },
            {
                title: '年龄',
                dataIndex: 'age'
            },
            {
                title: '操作',
                render: (text, record) => {
                    return (
                        <Button.Group type="ghost">
                            <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
                            <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                                <Button size="small">编辑</Button>
                            </Popconfirm>
                        </Button.Group>
                    );
                }
            }
        ];

        return (
            <Table columns={columns} dataSource={userList} rowKey={row => row.id} />
        );
    }
}

UserList.contextTypes = {
    router: react.PropTypes.object.isRequired
}
// // // UserEdit.contextTypes = {
// //     router: React.PropTypes.object.isRequired
// };

export default UserList;