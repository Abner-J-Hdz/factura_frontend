import React from 'react'
import {Link, withRouter } from 'react-router-dom';
import { HomeOutlined, BarChartOutlined, ShopOutlined } 
    from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import './MenuLateral.scss';

function MenuLateral(props) {
  const {menuCollapsed, location } = props;
  const {Sider} = Layout;
  return (
    <Sider className="menu-lateral" collapsed={menuCollapsed}>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
        
        <Menu.Item key="/">
            <Link to={"/"} className="menu-lateral_link">
                 <HomeOutlined className="menu-lateral_link_icon" />
                 <span id="nav-home" className="nav-text">Home</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="/factura">
            <Link to={"/factura"} className="menu-lateral_link">
                 <BarChartOutlined className="menu-lateral_link_icon" />
                 <span id="nav-home" className="nav-text">Factura</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="/articulo">
            <Link to={"/articulo"} className="menu-lateral_link">
                 <ShopOutlined className="menu-lateral_link_icon" />
                 <span id="nav-home" className="nav-text">Articulos</span>
            </Link>
        </Menu.Item>
    </Menu>
</Sider>
  )
}

export default withRouter(MenuLateral);
