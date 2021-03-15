import clientAxios from '../config/axios';

/*export const BuscarArticulos = async (codigo) => {
  //const baseURL =  process.env.REACT_APP_URL_API;
  console.log(codigo);
  try {
    const response = await clientAxios.get( `api/articulo/activos/${codigo}}`);
    return response.data;        
  } catch (error) {
      console.log(error);
      console.log(error.data);
      console.log(error.data.message)
      return error.data.message;
  }
}*/
 /* 
 export function addPostApi(token, post) {
    const url = `${BASE_PATH}/api/${apiVersion}/add-post`;
  
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(post)
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
 




  try {
      const response = await clientAxios.get( `api/articulo/`,codigo);
      return response.data;        
  } catch (error) {
      console.log(error);
      console.log(error.data);
      console.log(error.data.message)
      return error.data.message;         
  }*/


export function BuscarArticulos(codigo){
  const baseURL =  process.env.REACT_APP_URL_API;
  const urlapi =   `${baseURL}/api/articulo/activos/${codigo}`;

  return fetch(urlapi)
          .then(response => {
              return response.json();
          })
          .then(result => {
            console.log(result);
              return result
          })
          .catch(err => {
              return err;
          })

}


export const ObtenerArticulos = async() => {
  try {
    const response = await clientAxios.get( `api/articulo/`);
    return response.data;        
  } catch (error) {
    console.log(error.data.message)
    return error.data.message;         
  }
}



