import react from "react";
import formProvider from "../utils/formProvider";
import FormItem from "./FormItem";
import AutoComplete from "./AutoComplete";
import { get, post } from "../utils/formProvider";

class BookEditor extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendUsers: []
        }
    }

    getRecommendUsers(partialUserId) {
        get('http://localhost:3000/user?id_like=' + partialUserId)
            .then(res => res.json())
            .then(res => {
                if (res.length == 1 && res.value == partialUserId) {
                    return;
                }
                this.setState({
                    recommendUsers: res.map(user => {
                        return {
                            text: `${user.id}(${user.name})`,
                            value: user.id
                        }
                    })
                })
            })
    }

    // 函数节流
    timer = 0
    handleOwnerIdChange (value) {
        this.props.onFormChange('owner_id', value)
        this.setState({
            recommendUsers: []
        })

        if (this.timer) {
           clearTimeout(this.timer) 
        }

        if (value) {
           this.timer = setTimeout(() => {
              this.getRecommendUsers(value) 
              this.timer = 0;
           }, 200); 
        }
    }
    
    handleSubmit(e) {

        e.preventDefault();

        const { form: { name, price, owner_id }, formValid, editTarget } = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试');
            return;
        }

        let editType = '添加'
        let apiUrl = 'http://localhost:3000/book'
        let method = 'post'
        if (editTarget) {
            editType = '编辑'
            apiUrl += '/' + editTarget.id
            method = 'put'
        }


        post(apiUrl, {
            name: name.value,
            price: price.value,
            owner_id: owner_id.value
        })
            .then(res => res.json())
            .then(res => {
                if (res.id) {
                    alert(editType + '书籍成功')
                    // todo 用法不一样
                    this.context.router.history.push('/book/list');
                    return;
                } else {
                    alert(editType + '失败')
                }
            })
            .catch(err => console.error(err))
    }

    componentWillMount() {
        const { editTarget, setFormValues } = this.props;
        if (editTarget) {
            setFormValues(editTarget);
        }
    }

    render() {
        const { recommendUsers } = this.state
        const { form: { name, price, owner_id }, onFormChange } = this.props;
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <FormItem label="书名：" valid={name.valid} error={name.error}>
                    <input
                        type="text"
                        value={name.value}
                        onChange={e => onFormChange('name', e.target.value)}
                    />
                </FormItem>
                <FormItem label="价格：" valid={price.valid} error={price.error}>
                    <input
                        type="number"
                        value={price.value || ''}
                        onChange={e => onFormChange('price', +e.target.value)}
                    />
                </FormItem>
                <FormItem label="所有者：" valid={owner_id.valid} error={owner_id.error}>
                    <AutoComplete 
                        value={owner_id.value ? owner_id.value + '' : ''}
                        options={ recommendUsers }
                        onValueChange={value => this.handleOwnerIdChange(value)}
                    />
                </FormItem>
                <br />
                <input type="submit" value="submit" />
            </form>
        )
    }
}

BookEditor.contextTypes = {
    router: react.PropTypes.object.isRequired
}

BookEditor = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入书名'
            }
        ]
    },
    price: {
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
    owner_id: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请输入拥有者'
            }
        ]
    }

})(BookEditor)

export default BookEditor;
