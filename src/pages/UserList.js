import react from "react";

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

    render() {
        const { userList } = this.state
        return(
            <div>
                <header>
                    <h1>用户列表</h1>
                </header>
                
                <main>
                    <table>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>name</td>
                                <td>sex</td>
                                <td>age</td>
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
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </main>
            </div>
        )
    }
}
export default UserList;