import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import { BsCart2 } from "react-icons/bs";
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/service/ProductService";
import { CiSearch } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.css';

export function ProductList() {
  const [data, setData] = useState<IProduct[]>([]);
  const [dataFiltered, setDataFiltered] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState<{ produtoId: number, produtoNome: string, produtoValorTotal: number, quantidade: number }[]>([]);
  const [productsOnCartLength, setProductsOnCartLength] = useState(0);
  const { findAll } = ProductService;
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
    getProdutosOnCache();
  }, []);

  const getProdutosOnCache = () => {
    const produtos = localStorage.getItem('produtos');
    if (produtos) {
      const parsedProdutos = JSON.parse(produtos);
      setProductsOnCartLength(parsedProdutos.length);
      setCartItems(parsedProdutos);
    }
  };

  const loadData = async () => {
    try {
      const response = await findAll();
      console.log(response.data);
      if (response.status === 200) {
        setData(response.data);
        setDataFiltered(response.data);
        setApiError("");
      } else {
        setApiError("Falha ao carregar a lista de produtos.");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setApiError("Falha ao carregar a lista de produtos.");
    }
  };

  const addOnCart = (product: IProduct) => () => {
    let updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find(item => item.produtoId === product.id);

    if (existingItem) {
      existingItem.quantidade += 1;
    } else {
      const newCartItem = {
        produtoId: product.id,
        produtoNome: product.name,
        produtoValorTotal: product.price,
        quantidade: 1
      };
      updatedCartItems.push(newCartItem);
    }

    setProductsOnCartLength(updatedCartItems.length);
    setCartItems(updatedCartItems);
    localStorage.setItem('produtos', JSON.stringify(updatedCartItems));
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onClickOpenCart = () => {
    try {
      const produtos = localStorage.getItem("produtos");
      if (!produtos) {
        return;
      }
      setCartItems(JSON.parse(produtos));
      openModal();
    } catch (err) {
      console.error("Erro ao acessar produtos no carrinho:", err);
    }
  };

  const goToProductPage = (product: IProduct) => () => {
    navigate("/productpage" + product);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setDataFiltered(data.filter((product) =>
      product.category.name.toLowerCase().includes(inputValue) || product.name.toLowerCase().includes(inputValue)
    ));
  };

  return (
    <>
      <form className="d-flex" style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleInputChange}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
            fontSize: '16px'
          }}
        />
        <CiSearch style={{ fontSize: '24px', cursor: 'pointer', color: '#555' }} />
        <div className="d-flex justify-content-end" role="group" aria-label="Exemplo básico">
          <button type="button" className="btn btn-light" onClick={onClickOpenCart}>
            <BsCart2 style={{ fontSize: '30px', cursor: 'pointer', color: '#555', marginTop: '-1px' }} />
            {productsOnCartLength}
          </button>
        </div>
      </form>
      <div className="product-grid">
        {dataFiltered.length === 0 && (
          <div className="alert alert-danger">Não há produtos para os filtros especificados.</div>
        )}
        {dataFiltered.map(product => (
          <div className="product-card" key={product.id} style={{ position: 'relative', paddingBottom: '50px' }}>
            <div onClick={() => goToProductPage(product)}>
              <img
                src={"https://moodle.utfpr.edu.br/pluginfile.php/1/core_admin/logocompact/300x300/1707141966/UTFPR%20-%20Identidade%20Visual%20-2.png"}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-title">{product.name}</h2>
              <p className="product-price">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="product-description">{product.description}</p>
            </div>
            <div className="d-flex flex-column align-items-center" style={{ position: 'absolute', bottom: '10px', width: '83%' }}>
              <Button size="sm" className="btn btn-primary mb-2 mt-6">Mais Informações</Button>
              <Button className='btn btn-success' size="sm" onClick={addOnCart(product)}>Adicionar</Button>
            </div>
          </div>
        ))}
        {apiError && <div className="alert alert-danger">{apiError}</div>}
      </div>
      {/* Modal de carrinho */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Itens no Carrinho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {cartItems.map(item => (
              <li key={item.produtoId}>
                {item.produtoNome} - Quantidade: {item.quantidade} - Total: {item.produtoValorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
