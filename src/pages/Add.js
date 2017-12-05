import react from "react";
import formProvider from "../utils/formProvider";
const { Component } = react;

class Add extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                name: {
                    valid: false,
                    value: '',
                    error: ''                    
                },
                age: {
                    valid: false,
                    value: 0,
                    error: ''                    
                },
                sex: {
                    valid: false,
                    value: '',
                    error: ''                    
                }
            }
            
        }
    }
    handleValueChange(field, value, type = "string") {
        if (type === 'number') {
            value = +value
        }
        const { form } = this.state 
        const newFieldValue = { valid: true, error: '', value }

        switch (field) {
            case 'name':
                if (value.length >= 5 ) {
                   newFieldValue.valid = false
                   newFieldValue.error = 'to long'
                } else if (value.length == 0) {
                    newFieldValue.valid = false
                    newFieldValue.error = 'cant null'
                }
                break;
            case 'age':
                if (value > 100 || value <=0 ) {
                    newFieldValue.valid = false
                    newFieldValue.error = 'not number'
                }
                break;
            case 'sex':
                if (!value) {
                    newFieldValue.valid = false
                    newFieldValue.error = 'please choose'
                }
                break;
        }

        this.setState({
            form: {
                ...form,
                [field]: newFieldValue
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(JSON.stringify(this.state))
        const { form: {name, age, sex }} = this.state
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
        const { form:{ name, age, sex }} = this.state;
        return(
            <div>
                <header>添加用户</header>
                <main>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <label>用户名:</label>
                        <input type="text" value={ name.value } onChange={e => this.handleValueChange('name', e.target.value)}/>
                        { !name.valid && <span>{name.error}</span>}
                        <br />
                        <label>年龄:</label>
                        <input type="number" value={ age.value || '' } onChange={e => this.handleValueChange('age', e.target.value, 'number')}/>
                        { !age.valid && <span>{age.error}</span>}
                        <br />
                        <label>性别:</label>
                        <select name="" id="" value={ sex.value } onChange={e => this.handleValueChange('sex', e.target.value)}>
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        { !sex.valid && <span>{sex.error}</span>}
                        <br />
                        <input type="submit" value="submit" />
                    </form>
                </main>
            </div>
        )
    }
}

export default Add;
