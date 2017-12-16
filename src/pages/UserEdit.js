import react from "react";
import HomeLayout from "../layouts/HomeLayout";
import UserEditor from "../component/UserEditor";
import { get } from "../utils/formProvider";

class UserEdit extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentWillMount() {
        const userId = this.context.router.route.match.params.id;
        get('http://localhost:3000/user/' + userId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    user: res
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { user } = this.state
        return(
            <HomeLayout title="编辑用户">
                {
                    user ? <UserEditor editTarget={ user }/> : '加载中...'
                }
            </HomeLayout>
        )
    }
}

UserEdit.contextTypes = {
    router: react.PropTypes.object.isRequired
}

export default UserEdit;