import React from "react";
import { Icon, Form, message, Input, Button  } from "antd";
import style from "../styles/login-page.less";

import HomeLayout from "../layouts/HomeLayout";
import { post } from "../utils/request";

const FormItem = Form.Item;

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)   
    }
    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                post('http://localhost:3000/login', values)
                .then(res => {
                    if (res) {
                        message.info('登陆成功')
                        this.props.history.push('/') 
                    } else {
                        message.error('登录失败，账号或者密码错误')
                    }
                })
            }
        })

        
    }
    render() {
        const { form } = this.props
        const { getFieldDecorator } = form
        return (
            <div className={style.wrapper}>
                <div className={style.body}>
                    <header className={style.header}>
                        ReactManager
                    </header>
                    <div className={style.form}>
                        <form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('account', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入管理员账号',
                                            type: 'string'
                                        }
                                    ]
                                })(
                                    <Input type="text" addonBefore={<Icon type="user" />} />
                                )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码',
                                            type: 'string'
                                        }
                                    ]
                                })(
                                <Input type="password" addonBefore={<Icon type="lock" />} />
                                )}
                            </FormItem> 
                        </form>
                        <br />
                        <Button className={style.btn} type="primary" htmlType="submit" onClick={this.handleSubmit}>Sign In</Button>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = {
    router: React.PropTypes.object.isRequired
}

Login = Form.create()(Login)

export default Login;
