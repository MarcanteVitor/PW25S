import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsCart2 } from "react-icons/bs";

const ModalExemplo = () => {
  const [show, setShow] = useState(false); // Estado para controlar se o modal está visível

  const handleShow = () => setShow(true); // Função para mostrar o modal
  const handleClose = () => setShow(false); // Função para fechar o modal

  return (
    <>

        <BsCart2 onClick={handleShow}/>
    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Carrinho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Carrinho</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirmar compra
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalExemplo;
