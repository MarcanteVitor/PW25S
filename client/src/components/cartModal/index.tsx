import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import AuthService from "@/service/AuthService";
import { useNavigate } from "react-router-dom";

interface GenericModalProps {
  show: boolean;
  onHide: () => void;
  products: any;
}

const cartModal: React.FC<GenericModalProps> = ({ show, onHide, products }) => {
  const navigate = useNavigate();

  const clearCart = () =>{
    Swal.fire({
      title: "Atenção",
      text: "Deseja remover todos os produtos do carrinho?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("produtos")
      }
    });
  }

  const goToCheckOut = () => {
    if(!AuthService.isAuthenticated()){
      Swal.fire({
        title: "Atenção",
        text: "Faça login para continuar com sua compra",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#198754",
        cancelButtonColor: "#d33",
        confirmButtonText: "Fazer login",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate("/checkout")
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Carrinho de produtos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ul>
            {products.map((item: { produtoId: React.Key | null | undefined; produtoNome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantidade: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; produtoValor: { toLocaleString: (arg0: string, arg1: { style: string; currency: string; }) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => (
              <li key={item.produtoId}>
                {item.produtoNome} - Quantidade: {item.quantidade} - Total: {item.produtoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </li>
            ))}
          </ul>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={clearCart}>Limpar carrinho</Button>
        <Button variant="success" onClick={goToCheckOut}>Finalizar pedido</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default cartModal;
