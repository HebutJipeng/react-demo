import react from "react";
import { Menu, Icon } from "antd";
import { BrowserRouter, Link } from "react-router-dom";
import style from "../styles/home-layout.less";

const { SubMenu } = Menu
const MenuItem = Menu.Item

class HomeLayout extends react.Component{ render() { const {title, children} = this.props; return ( <div>
                <header className={style.header}> 
                    <Link to='/'>{ title || 'welcome' }</Link>
                </header>
                <main className={style.main}>
                    <div className={style.menu}>
                        <Menu mode="inline" theme="dark" style={{ width: 240}}>
                            <SubMenu key="user" title={<span><Icon type="user" /><span>用户管理</span></span>}>
                                <MenuItem key="user-list">
                                    <Link to="/user/list">user list</Link>
                                </MenuItem>
                                <MenuItem key="user-add">
                                    <Link to="/user/add">user add</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="book" title={<span><Icon type="book" /><span>图书管理</span></span>}>
                                <MenuItem key="book-list">
                                    <Link to="/book/list">图书列表</Link>
                                </MenuItem>
                                <MenuItem key="book-add">
                                    <Link to="/book/add">添加图书</Link>
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className={style.content}>
                        { children }
                    </div>
                </main>
            </div>
        )
    }
}

export default HomeLayout;