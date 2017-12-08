import react from "react";
import HomeLayout from "../layouts/HomeLayout";

class UserList extends react.Component{
    constructor (props) {
        super(props);
        this.state = {
            userList: []
        }
    }
    componentWillMount () {
        fetch('http://localhost:3000/user')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    userList: res
                });
            });
    }

    handleEdit (user) {

    }

    handleDel (user) {
        const confirmed = confirm(`确定要删除用户 ${user.name}`);
        console.log(confirmed)

        if (confirmed) {
            fetch('http://localhost:3000/user/' + user.id, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        userList: this.state.userList.filter(item => item.id !== user.id)
                    })
                    alert('删除用户成功')
                })
                .catch(err => {
                    console.log(err);
                    alert('删除用户失败')
                })
            
        }
    }

    render() {
        const { userList } = this.state
        return(
            <HomeLayout title="用户列表">
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>name</td>
                            <td>sex</td>
                            <td>age</td>
                            <td>method</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map((user) => {
                                return (
                                    <tr key={ user.id }>
                                        <td>{ user.id }</td>
                                        <td>{ user.name }</td>
                                        <td>{ user.sex }</td>
                                        <td>{ user.age }</td>
                                        <td>
                                            <a href="javascript:;" onClick={() => {this.handleEdit(user)}}>编辑</a>
                                            <br/>
                                            <a href="javascript:;" onClick={() => {this.handleDel(user)}}>删除</a>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </HomeLayout>
        )
    }
}
export default UserList;