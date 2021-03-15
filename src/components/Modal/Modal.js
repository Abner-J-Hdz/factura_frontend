import React from "react";
import { Modal as ModalAntd } from "antd";
import './Modal.scss';

export default function Modal(props) {
  const { children, title, isVisible, setIsVisible, ...other } = props;
  const CancelarModal = () =>{
    setIsVisible(false);
    
  }
  return (
    <ModalAntd
      title={title}
      centered
      visible={isVisible}
      destroyOnClose={true}
      onCancel={CancelarModal }
      footer={false}
      {...other}
    >
      {children}
    </ModalAntd>
  );
}