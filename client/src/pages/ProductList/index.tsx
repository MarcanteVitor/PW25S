
import '../../App.css';
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/service/ProductService";

export function ProductList() {
  const [data, setData] = useState<IProduct[]>([]);
  const [dataFiltred, setDataFiltred] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const { findAll } = ProductService;
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

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
    if(event && event.target && event.target.value)
      return setDataFiltred(dataFiltred.filter(data => data.category.name.toLowerCase().includes(event.target.value.toLowerCase())));
    else 
      setDataFiltred(data)
  };

  return (
    <>
      <div>
        <input 
          type="text" 
          onChange={handleInputChange} 
          placeholder="Search..."
        />
      </div>
      <div className="product-grid">
        {dataFiltred.map(product => (
          <div key={product.id} className="product-card" onClick={goToProductPage(product)}>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Utfpr.gif/800px-Utfpr.gif"} alt={product.name} className="product-image" />
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <Button colorScheme='green'> + Adcionar ao carrinho</Button>
          </div>
        ))}
        {apiError && <div className="alert alert-danger">{apiError}</div>}
      </div>
    </>
  );
};

