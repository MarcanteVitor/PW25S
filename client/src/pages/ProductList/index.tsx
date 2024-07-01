import '../../App.css';
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/service/ProductService";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import AuthService from '@/service/AuthService';
import 'bootstrap/dist/css/bootstrap.css';
import ModalExemplo from "../cart/index";


export function ProductList() {
  const [data, setData] = useState<IProduct[]>([]);
  const [dataFiltred, setDataFiltred] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [productsOnCartLength, setProductsOnCartLength] = useState(0);
  const { findAll } = ProductService;
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
    getProdutosOnCache()
  }, []);

  const getProdutosOnCache = async () => {
    const produtos = localStorage.getItem('produtos');
    if (produtos) {
      setProductsOnCartLength(JSON.parse(produtos).length)
      setShowCart(true)
    }
  }

  const loadData = async () => {
    const response = await findAll();
    console.log(response.data)
    if (response.status === 200) {
      setData(response.data);
      setDataFiltred(response.data)
      setApiError("");
    } else {
      setApiError("Falha ao carregar a lista de produtos.");
    }
  };

  const addOnCart = (product: IProduct) => () => {
    let arrayProdutosLocalStorage = []
    const produtosFromLocalStorage = localStorage.getItem('produtos');

    if (produtosFromLocalStorage) {
      arrayProdutosLocalStorage = JSON.parse(produtosFromLocalStorage);
    }

    const produtoSelecionadoObj = {
      produtoIndice: arrayProdutosLocalStorage.length + 1,
      produtoId: product.id,
      produtoNome: product.name,
      produtoValorTotal: product.price,
      produtoValorUnitario: product.price,
      produtoQuantidade: 1
    };

    arrayProdutosLocalStorage.push(produtoSelecionadoObj);
    setProductsOnCartLength(arrayProdutosLocalStorage.length);
    setShowCart(true)
    return localStorage.setItem('produtos', JSON.stringify(arrayProdutosLocalStorage));
    
  }

  const onClickOpenCart = () => {
    try {
      const produtos = localStorage.getItem("produtos");
      if (!produtos) {
        return
      }

    } catch (err) {
    }
  };

  const goToProductPage = (product: IProduct) => () => {
    return navigate("/productpage" + product)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.value)
      return setDataFiltred(dataFiltred.filter(data => data.category.name.toLowerCase().includes(event.target.value.toLowerCase()) || data.name.toLowerCase().includes(event.target.value.toLowerCase())));
    else
      setDataFiltred(data)
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
        {showCart && (
          <div className="d-flex justify-content-end" role="group" aria-label="Exemplo básico">
            <button type="button" className="btn btn-light" id="cart" >
            <ModalExemplo />
            {productsOnCartLength}
              <BsCart2 style={{ fontSize: '30px', cursor: 'pointer', color: '#555', marginTop: '-1px' }} textAnchor="kjdnajknsdas" />
            </button>
          </div>
        )}


      </form>
      <div className="product-grid">
        {dataFiltred.length < 1 && (
          <div className="alert alert-danger">Não há produtos para os filtros especificados</div>
        )}
        {dataFiltred.map(product => (
          <div className="product-card" style={{ position: 'relative', paddingBottom: '50px' }}>
            <div key={product.id} onClick={() => goToProductPage(product)}>
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
              <p></p>
            </div>
            <div className="d-flex flex-column align-items-center" style={{ position: 'absolute', bottom: '10px', width: '83%' }}>
              <Button colorScheme='blue' size="sm" className="mb-2 mt-6">Mais Informações</Button>
              <Button colorScheme='green' size="sm" onClick={addOnCart(product)}>Adicionar</Button>
            </div>
          </div>
        ))}
        {apiError && <div className="alert alert-danger">{apiError}</div>}
      </div>
      
      <div className="modal-dialog modal-dialog-scrollable"  id='myModal'>
          ...
      </div>
    </>
  );
};

