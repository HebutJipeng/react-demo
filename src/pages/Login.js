import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import FormItem from "../component/FormItem";
import formProvider from "../utils/formProvider";
import { post } from "../utils/request";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)   
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(1211)

        const { formValid, form: { account, password}} = this.props
        if (!formValid) {
           alert('请输入账号或密码') 
           return;
        }

        post('http://localhost:3000/login', {
            account: account.value,
            password: password.value
        })
        .then(res => {
            if (res) {
                this.props.history.push('/') 
            } else {
                alert('登录失败，账号或者密码错误')
            }
        })
    }
    render() {
        const { form: {account, password}, onFormChange} = this.props
        return (
            <HomeLayout title="登录页面">
                <form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="账号"
                        valid={ account.valid }
                        error={ account.error }
                    >
                        <input type="text" value={ account.value } onChange={e => onFormChange('account', e.target.value)} />
                    </FormItem>
                    <FormItem
                        label="密码"
                        valid={password.valid}
                        error={password.error}
                    >
                        <input type="password" value={password.value} onChange={e => onFormChange('password', e.target.value)} />
                    </FormItem> 
                </form>
                <br />
                <input type="submit" value="登录" onClick={this.handleSubmit} />
            </HomeLayout>
        )
    }
}

Login.contextType = {
    router: React.PropTypes.object.isRequired
}

Login = formProvider({
    account: {
        defaultValue: '',
        rules: [
            {
                pattern(value) {
                    return value.length > 0
                },
                error: '请输入账号'
            }
        ]
    },
    password: {
        defaultValue: '',
        rules: [
            {
                pattern(value) {
                    return value.length > 0
                },
                error: '请输入密码'
            }
        ]
    }
})(Login)

export default Login;
