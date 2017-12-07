import react from "react";

class UserList extends react.Component{
    constructor (props) {
        super(props);
        this.state({
            UserList: []
        })
    }
    componentWillMount () {
        fetch('http://localhost:3000/user')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    UserList: res
                });
            });
    }

    render() {
        const { UserList } = this.state.UserList
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
                                UserList.map(user => {
                                    return (
                                        <tr key={ user.id }>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </main>
            </div>
        )
    }
}