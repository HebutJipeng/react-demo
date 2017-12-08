import react from "react";

class HomeLayout extends react.Component{
    render() {
        const {title, children} = this.props;
        return (
            <div>
                <header>
                    <h1>{ title }</h1>
                </header>
                <main>
                    { children }
                </main>
            </div>
        )
    }
}

export default HomeLayout;