import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AuthService from "@/service/AuthService";
import { useNavigate } from "react-router-dom";

interface Product {
  produtoId: React.Key | null | undefined;
  produtoNome: string;
  quantidade: number;
  produtoValor: number;
}

interface GenericModalProps {
  show: boolean;
  onHide: () => void;
  products: Product[];
}

const CartModal: React.FC<GenericModalProps> = ({ show, onHide, products }) => {
  const navigate = useNavigate();

  const clearCart = () => {
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
        localStorage.removeItem("produtos");
        onHide();
        location.reload()
      }
    });
  };

  const goToCheckOut = () => {
    if (!AuthService.isAuthenticated()) {
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
      navigate("/checkout");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Carrinho de produtos</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height: '450px', overflowY: 'auto'}}>
        <ul className="list-group">
          {products.map((item) => (
            <li key={item.produtoId} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>{item.produtoNome}</h6>
                  <p>Quantidade: {item.quantidade}</p>
                </div>
                <div>
                  <span>Total: {item.produtoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fechar</Button>
        <Button variant="danger" onClick={clearCart}>Limpar carrinho</Button>
        <Button variant="success" onClick={goToCheckOut}>Finalizar pedido</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
