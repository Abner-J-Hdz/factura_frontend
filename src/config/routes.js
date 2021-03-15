//layouts
import LayoutDashboard from '../Layout/LayoutDashboard'


//Dashboard pages
import Home from '../Pages/Home';
import Factura from '../Pages/Factura';
import Articulo from '../Pages/Articulo';

//other
import Error404 from '../Pages/Error404';


//sistema de rutas para el panel de administrativo
const routes = [
    {
        path:"/",
        component: LayoutDashboard,
        exact:false,
        routes:[
            {
                path:"/",
                component: Home,
                exact:true
            },
            {
                path:"/factura",
                component: Factura,
                exact:true 
            },
            {
                path:"/articulo",
                component: Articulo,
                exact:true 
            },                    
            {
                component: Error404
            }
        ]
    }
]

export default routes;
