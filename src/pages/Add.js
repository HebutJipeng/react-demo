import react from "react";
import formProvider from "../utils/formProvider";
import FormItem from "../component/FormItem";
import HomeLayout from "../layouts/HomeLayout";

class Add extends react.Component {
    handleSubmit(e) {

        e.preventDefault();

        const { form: {name, age, sex }, formValid} = this.props;
        if (!name.valid && !age.valid && !sex.valid) {
           alert('false') 
           return;
        }
        fetch('http://localhost:3000/user', {
            method: 'post',
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                sex: sex.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.id) {
               alert('用户添加成功') 
               this.setState({
                   name: '',
                   age: 0,
                   sex: ''
               })
            } else {
                alert('添加失败')
            }
        })
        .catch(err => console.error(err))
    }
    render() {
        const { form:{ name, age, sex }, onFormChange} = this.props;
        return(
            <HomeLayout title="添加用户">
                <form onSubmit={e => this.handleSubmit(e)}>
                    <FormItem label="用户名：" valid={name.valid} error={name.error}>
                        <input
                            type="text"
                            value={name.value}
                            onChange={e => onFormChange('name', e.target.value)}
                        /> 
                    </FormItem>
                    <FormItem label="年龄：" valid={age.valid} error={age.error}>
                        <input
                            type="number"
                            value={age.value || ''}
                            onChange={e => onFormChange('age', +e.target.value)}
                        /> 
                    </FormItem>
                    <FormItem label="性别：" valid={sex.valid} error={sex.error}>
                        <select
                            value={sex.value}
                            onChange={e => onFormChange('sex', e.target.value)}
                        >
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select> 
                    </FormItem>
                    <br />
                    <input type="submit" value="submit" />
                </form>
            </HomeLayout>
        )
    }
}

Add = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入用户名'
            },
            {
                pattern: /^.{1,10}$/,
                error: '用户名最多4个字符'
            }
        ]
    },
    age: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 100;
                },
                error: '请输入1~100的年龄'
            }
        ]
    },
    sex: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择性别'
            }
        ]
    }

})(Add)

export default Add;
