
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/service/ProductService";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import AuthService from '@/service/AuthService';
 

export function ProductList() {
  const [data, setData] = useState<IProduct[]>([]);
  const [dataFiltred, setDataFiltred] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const { findAll } = ProductService;
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);


  const handleClick = (param: String) => {
    console.log('Botão clicado!' + param);
    // Adicione aqui a lógica que deseja executar quando o botão for clicado
  };

  const onClickOpenCart = () => {
    alert("asdjkndfwejsknfwejkf")
  };

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

    
  const goToProductPage = (product: IProduct) => () => {
    return navigate("/productpage" + product)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.value)
      return setDataFiltred(dataFiltred.filter(data => data.category.name.toLowerCase().includes(event.target.value.toLowerCase())));
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
        <CiSearch style={{ fontSize: '24px', cursor: 'pointer', color: '#555'}} />
        <div className="d-flex justify-content-end" role="group" aria-label="Exemplo básico">
          <button type="button" className="btn btn-light" id="cart"  onClick={() => handleClick("teste")}>
            <BsCart2 style={{ fontSize: '30px', cursor: 'pointer', color: '#555', margin: '15px' }}/>
          </button>
        </div> 

      </form>
      <div className="product-grid">
        {dataFiltred.map(product => (
          <div className="product-card" style={{ position: 'relative', paddingBottom: '50px' }}>
            <div key={product.id} onClick={() => goToProductPage(product)}>
              <img
                src={"https://moodle.utfpr.edu.br/pluginfile.php/1/core_admin/logocompact/300x300/1707141966/UTFPR%20-%20Identidade%20Visual%20-2.png"}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-title">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}</p>
            </div>
            <div style={{ position: 'absolute', bottom: '0', textAlign: 'center', padding: '10px' }}>
              <Button colorScheme='green'> Mais informações </Button>
              <Button colorScheme='green'> dasdasdasdasdasdasdasdas </Button>
            </div>
            <div style={{ position: 'absolute', bottom: '0', textAlign: 'center' }}>
            </div>
          </div>
        ))}
        {apiError && <div className="alert alert-danger">{apiError}</div>}
      </div>
    </>
  );
};

