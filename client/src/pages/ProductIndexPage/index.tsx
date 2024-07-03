import '../../App.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/service/ProductService";
import { useParams, useNavigate } from "react-router-dom";
import { BsCart2 } from 'react-icons/bs';
import CartModal from '../../components/cartModal/index';

export function ProductIndexPage() {
  const [modalShow, setModalShow] = useState(false);
  const [productsOnCartLength, setProductsOnCartLength] = useState(0);
  const [cartItems, setCartItems] = useState<{ produtoId: number, produtoNome: string, produtoValor: number, quantidade: number }[]>([]);
  const [apiError, setApiError] = useState("");
  const { produtoId } = useParams();
  const [entity, setEntity] = useState<IProduct>({
    id: 1,
    name: "",
    price: 0,
    description: "",
    category: { id: undefined, name: "" },
  });
  const { findOne } = ProductService;
  const navigate = useNavigate();

  useEffect(() => {
    loadData(produtoId);
    getProdutosOnCache()
  }, []);

  const goToProductList = () => {
    navigate('/productList');
  };

  const loadData = async (produtoId: any) => {
    const response = await findOne(produtoId);
    if (response.status === 200) {
      setEntity({
        id: response.data.id,
        name: response.data.name,
        price: response.data.price,
        description: response.data.description,
        category: { id: response.data.category.id, name: "" },
      });
      return setApiError("");
    } else {
      return setApiError("Falha ao carregar a lista de produtos.");
    }
  };

  const getProdutosOnCache = () => {
    const produtos = localStorage.getItem('produtos');
    if (produtos) {
      const parsedProdutos = JSON.parse(produtos);
      setProductsOnCartLength(parsedProdutos.length);
      setCartItems(parsedProdutos);
    }
  };

  const addOnCart = (product: IProduct) => () => {
    let updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find(item => item.produtoId === product.id);

    if (existingItem) {
      existingItem.quantidade += 1;
    } else {
      const newCartItem = {
        produtoId: product.id ?? 0,
        produtoNome: product.name,
        produtoValor: product.price,
        quantidade: 1
      };
      updatedCartItems.push(newCartItem);
    }

    setProductsOnCartLength(updatedCartItems.length);
    setCartItems(updatedCartItems);
    localStorage.setItem('produtos', JSON.stringify(updatedCartItems));
  };

  return (
    <>
      <div>
        <form className="d-flex justify-content-between align-items-center" style={{ margin: '20px' }}>
          <div>
            <button type="button" className="btn btn-light" onClick={goToProductList}>
              Voltar
            </button>
          </div>
          {cartItems.length > 0 && (
            <div>
              <button type="button" className="btn btn-light" onClick={() => setModalShow(true)}>
                <BsCart2 style={{ fontSize: '30px', cursor: 'pointer', color: '#555', marginTop: '-1px' }} />
                <span className="badge badge-pill badge-info ml-1">{productsOnCartLength}</span>
              </button>
            </div>
          )}
        </form>

        {entity && (
          <div className="product-card-productIndex" style={{ position: 'relative', paddingBottom: '50px' }}>
            <h2 className="product-title-productIndex">{entity.name}</h2>
            <img
              src={"https://moodle.utfpr.edu.br/pluginfile.php/1/core_admin/logocompact/300x300/1707141966/UTFPR%20-%20Identidade%20Visual%20-2.png"}
              alt={entity.name}
              className="product-image-productIndex"
            />
            <p className="product-description-productIndex">
              <span>
                {entity.description}
              </span>
            </p>
            <p className="product-price-productIndex">
              {entity.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
              <Button className='btn btn-success' size="sm" onClick={addOnCart(entity)}>Adicionar ao Carrinho</Button>
            </div>
          </div>
        )}

        {apiError && <div className="alert alert-danger">{apiError}</div>}
      </div>
      <CartModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        products={cartItems}
      />
    </>
  );
};
