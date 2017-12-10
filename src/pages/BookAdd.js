import react from "react";
import formProvider from "../utils/formProvider";
import FormItem from "../component/FormItem";
import HomeLayout from "../layouts/HomeLayout";
import UserEditor from "../component/BookEditor";

class Add extends react.Component {
    render() {
        return (
            <HomeLayout title="添加书籍">
                <UserEditor />
            </HomeLayout>
        )
    }
}

export default Add;
