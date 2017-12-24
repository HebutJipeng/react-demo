import react from "react";
import HomeLayout from "../layouts/HomeLayout";
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
        console.log(confirmed)

        if (confirmed) {
            del('http://localhost:3000/user', {
                id: user.id
            })
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
        )
    }
}

UserList.contextTypes = {
    router: react.PropTypes.object.isRequired
}
// // // UserEdit.contextTypes = {
// //     router: React.PropTypes.object.isRequired
// };

export default UserList;