import react from "react";

function formProvider(fields) {
    return function (Comp) {
        const initialFormState = {};
        for (const key in fields) {
            initialFormState[key] = {
                value: fields[key].defaultValue,
                error: ''
            };
        }

        class FormComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    form: initialFormState,
                    formValid: false
                };
                this.handleValueChange = this.handleValueChange.bind(this)
                this.setFormValues = this.setFormValues.bind(this)
            }

            handleValueChange(fieldName, value) {
                const { form } = this.state;

                const newFieldState = { value, valid: true, error: '' };
                const fieldRules = fields[fieldName].rules;

                for (let i = 0; i < fieldRules.length; i++) {
                    const { pattern, error } = fieldRules[i];
                    let valid = false;
                    if (typeof pattern === 'function') {
                       valid = pattern(value);
                    } else {
                        valid = pattern.test(value);
                    }

                    if (!valid) {
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        return;
                    }
                }                
                

                const newForm = {...form, [fieldName]: newFieldState};
                const formValid = Object.values(newForm).every(f => f.valid);

                this.setState({
                    form: newForm,
                    formValid
                })
            }

            setFormValues (values) {
                if (!values) {
                    return;
                }
                const { form } = this.state;
                let newForm = { ...form };
                for (const field in form) {
                    if (form.hasOwnProperty(field)) {
                       newForm[field]  = {...newForm[field], value: values[field]}
                    }
                    newForm[field].valid = true;
                }

                this.setState({
                    form: newForm
                })
            }

            render () {
                const { form, formValid } = this.state;
                return (
                    <Comp 
                        {...this.props} 
                        form={form} 
                        formValid={formValid} 
                        onFormChange={this.handleValueChange}
                        setFormValues={this.setFormValues}
                    />
                );
            }
        }
        return FormComponent;
    }
}

export default formProvider;