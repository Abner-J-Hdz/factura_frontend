import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Input, notification, DatePicker, Button} from 'antd'
import { BuscarArticulos } from '../../Api/ArticuloApi';
import './Factura.scss'
import { UserOutlined, PercentageOutlined } from '@ant-design/icons';
import Modal from '../Modal/Modal';

const Factura = () => {

  //Estado del detalle
  const [detalle, setDetalle] = useState([]);
  const [factura, setFactura] = useState({ });

  const setearDetalle = (det) => {
    setDetalle([...detalle, det]);
  }

  const eliminarArticulo = (id) => {
    const newArticulo = detalle.filter((articulo) => articulo._id !== id);
    setDetalle(newArticulo);
  }

  useEffect(() => {
    console.log(detalle);
  }, [detalle])
  //Estados para el modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //Funcion para abrir modal que agregara nuevo usuario
  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Buscar Articulo");
    setModalContent(
      <BuscarArticulo 
        setIsVisibleModal={setIsVisibleModal} setDetalle={setDetalle} 
        detalle={detalle}  setearDetalle={setearDetalle}
      />
    )
  }    

  return (
  <>
    <div className="factura">
      <div className="factura-list__header">
        <div>
          <span><h1>Facturacion</h1></span>
        </div>

        <button className="ant-btn ant-btn-primary"></button>
      </div>

      <div className="add-factura">
        <AddFactura  addUserModal={addUserModal} factura={factura} setFactura={setFactura} />
        <TablaDetalle detalle={detalle} setDetalle={setDetalle} eliminarArticulo={eliminarArticulo} factura={factura} />
      </div>
    </div>
    <Modal
      title={modalTitle}
      isVisible={isVisibleModal}
      setIsVisible={setIsVisibleModal}
      width="75%"
    >
        {modalContent}
    </Modal>  
  </>
  );
}

export default Factura

function AddFactura({addUserModal, setFactura, factura}){
  
  const AbrirModal = () => {
    if(factura.impuesto){
      addUserModal()
    }else{
      notification["warning"]({
        message: "El campo impuesto es obligatorio"
    });
    }
  }
  
  return (
    <Form className="add-factura_form">
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item>
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY HH:mm:ss"
              placeholder="Fecha de publicación"
                          
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Input 
              prefix={<PercentageOutlined />}
              placeholder="Impuesto" 
              type="number"
              value={factura.impuesto}
              onChange={ e => setFactura({...factura, impuesto:  e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Nombre de Usuario"
              type="text"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={10}> 
        <Button onClick={AbrirModal}>
            Agregar producto
        </Button>
        </Col>
      </Row>
    </Form>
  );
}

function BuscarArticulo({ setDetalle, detalle, setearDetalle, setIsVisibleModal }){

//const [parametro, setParametro] = useState("");
const [data, setData] = useState([]);

const handleChange = (e) => {

  //console.log(e.target.value);
  BuscarArticulos(e.target.value)
    .then( response =>{      
      if(response?.code !== 200){
        setData([]);
      }

      let listadoArt = response.articulos;
      setData(listadoArt);
    })
    .catch(error => {
      console.log(error);
    })
}

const pushArticulo = (articulo) => {
  console.log(articulo);
  let newArt = {
    _id: articulo._id,
    codigo: articulo.codigo,
    descripcion: "",
    precio: articulo.precio,
    cantidad: 0,
    subtotal: 0,
    impuesto: 0,
    total: 0
  }

    setDetalle([...detalle, newArt])
    setIsVisibleModal(false);
}


return(
<>
  <Row gutter={24}>
    <Col span={8}>
      <Form onChange={handleChange}>
        <Form.Item>
          <Input
            placeholder="Ingrese el codigo"
          />
        </Form.Item>
      </Form>
    </Col>

  </Row>
  <Row gutter={24}>
      <table className="ant-table">
        <thead >
            <tr>
              <th>Nombre</th>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
        </thead>
        <tbody className="ant-table-body">
          {
           data.map((articulo, index) => (
            <tr key={index}>
                <td>{articulo.nombre}</td>
                <td>{articulo.codigo}</td>
                <td>{articulo.descripcion}</td>
                <td>{articulo.precio}</td>
                <td><Button onClick={() => pushArticulo(articulo)} type="primary">Agregar</Button></td>
            </tr>
          ))
           }
          
        </tbody>
      </table>
  </Row>
</>
)
}


function TablaDetalle({detalle, setDetalle, eliminarArticulo, factura}) {

  const actualizarCantidad = (articulo, e) => {
    const newArticulo = detalle.map((detalle) => {
      if(detalle._id === articulo._id){
        return {
          ...detalle,
          cantidad: e.target.value,
          subtotal: e.target.value * articulo.precio,
        }
      }
      return detalle
    });
    setDetalle(newArticulo);

    /*const newTotal = detalle.map((detalle) => {
      if(detalle._id === articulo._id){
        return {
          ...detalle,
          total: detalle.subtotal + detalle.subtotal * detalle.impuesto /100
        }
      }
      return detalle
    });
    setDetalle(newTotal);*/

  }
  return (
    <div className="ant-table-container" style={{marginTop: '15px'}}>

      <table style={{tableLayout: 'auto'}}>
        <thead className="ant-table-thead">
          <tr>
            <td className="ant-table-cell">
              Codigo
            </td>
            <td className="ant-table-cell">
              Descripcion
            </td>
            <td className="ant-table-cell">
              Precio
            </td>
            <td className="ant-table-cell">
              Cantidad
            </td>
            <td className="ant-table-cell">
              Subtotal
            </td>
            <td className="ant-table-cell">
              Impuesto
            </td>
            <td className="ant-table-cell">
              Total
            </td>
            <td className="ant-table-cell">
              Acciones
            </td>            
          </tr>
        </thead>
        <tbody className="ant-table-tbody">
          {detalle.map((articulo, index) => (
          <tr key={index}>
            <td className="ant-table-cell">{articulo.codigo}</td>
            <td className="ant-table-cell">{articulo.descripcion}</td>
            <td className="ant-table-cell">{articulo.precio}</td>
            <td className="ant-table-cell"><Form ><Input type="number" onChange={(e) => actualizarCantidad(articulo,e)} /></Form></td>
            <td className="ant-table-cell">{articulo.subtotal}</td>
            <td className="ant-table-cell">{articulo.impuesto}</td>
            <td className="ant-table-cell">{articulo.total}</td>
            <td className="ant-table-cell"><Button onClick={() => eliminarArticulo(articulo._id)}>Eliminar</Button></td>
          </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}
