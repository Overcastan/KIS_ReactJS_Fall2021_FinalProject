import {Layout, Menu} from 'antd';
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {MainPage} from "./Components/MainPage";
import {AboutPage} from "./Components/AboutPage";
import React from "react";
import {Page404} from "./Components/Page404";

const {Header, Content, Footer} = Layout;

class App extends React.Component{
    render() {
        let path = this.props.location.pathname;
        let selectedKey;

        if (path === '/') {
            selectedKey = ['1'];
        } else if (path === '/about') {
            selectedKey = ['2'];
        }

        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={selectedKey}>
                        <Menu.Item key="1">
                            <Link to="/">Главная</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/about">Обо мне</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <div className="main-container">
                        <Switch>
                            <Route exact path='/'>
                                <MainPage/>
                            </Route>
                            <Route path='/about'>
                                <AboutPage/>
                            </Route>
                            <Route path='/'>
                                <Page404/>
                            </Route>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Created by Khmuro Andrew 2021</Footer>
            </Layout>
        );
    }
}

export default withRouter(App);
