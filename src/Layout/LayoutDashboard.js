import React, { useState } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom';
import MenuLateral from '../components/MenuLateral/MenuLateral';
import MenuSuperior from '../components/MenuSuperior/MenuSuperior';
import './LayoutDashboard.scss';

const LayoutDashboard = (props) => {
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);    
    const {Header, Content , Footer} = Layout;

  return (
    <Layout>
      <MenuLateral menuCollapsed={menuCollapsed}/>
      
      <Layout
          className="layout-dashboard"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
      >
          <Header className="layout-dashboard__header">
              <MenuSuperior menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
          </Header>
          <Content className="layout-dashboard__content">
              <LoadRoutes routes={routes} /> 
          </Content>

          <Footer className="layout-dashboard__footer">
            Desarrollado por: Abner Joel Martinez
          </Footer>
      </Layout>

    </Layout>
  )
}

export default LayoutDashboard

function LoadRoutes({routes}){
  //const {routes} = props; lo que esta arriba es igual al este descructuring, pasado como parametro
  return (
      <Switch>
          {
              routes.map((route, index)=>(
                  <Route
                      key={index}
                      path= {route.path}
                      exact={route.exact}
                      component={route.component}
                  />
              ))
          }
      </Switch>
  );

}
