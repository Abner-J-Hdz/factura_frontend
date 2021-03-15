import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';

function App() {
    
    return(
      <Router>
        <Switch>
          {routes.map((route, index)=>(
            <RouterWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    )
}

export default App;
 
function RouterWithSubRoutes(route){
  return(
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component 
                        routes={route.routes}
                        {...props}
                      />}
    />
  )
}
