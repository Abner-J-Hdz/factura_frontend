import React from 'react'
//import { Link} from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons';
import { Button } from "antd";
import LogoApp from "../../assets/images/ingemann.png";
import './MenuSuperior.scss';

const MenuSuperior = (props) => {
  const {menuCollapsed, setMenuCollapsed } = props;
  return (
    <div className="menu-superior">
    <div className="menu-superior__left">
        <a href="/" > 
            <img className="menu-superior__left-logo" src={LogoApp} alt="Ingemann"/>
        </a>
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)} >
           <MenuOutlined />
        </Button>
    </div>
</div>
  )
}

export default MenuSuperior
