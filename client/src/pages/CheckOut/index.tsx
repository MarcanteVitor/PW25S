import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form  } from 'react-bootstrap';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import { IOrder } from "@/commons/interfaces";
import Swal from 'sweetalert2'
import { FaCheck } from "react-icons/fa";
import OrderService from "@/service/OrderService";
import AuthService from "@/service/AuthService";

export function CheckOut() {
  const [apiError, setApiError] = useState("");
  const [cartItems, setCartItems] = useState<{ produtoId: number, produtoNome: string, produtoValor: number, quantidade: number }[]>([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const navigate = useNavigate();
  const { save } = OrderService;

  useEffect(() => {
    getProdutosOnCache();
  }, []);


  const getProdutosOnCache = () => {
    const produtos = localStorage.getItem('produtos');
    if (produtos) 
      setCartItems(JSON.parse(produtos));
    
  };

  const handleSelectChange = (e:any) => {
    setSelectedPayment(e.target.value);
  };

  const saveOrder = async() =>{
    
    console.log("TCL: saveOrder -> !AuthService.isAuthenticated()", !AuthService.isAuthenticated())
    if (!(AuthService.isAuthenticated())) {
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
    } 

    if(!selectedPayment)
      return Swal.fire({
        title: "Atenção",
        text: "Informe uma forma de pagamento para prosseguir",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      })
      


    const order: IOrder = {
      formaPagamento: selectedPayment,
      products: cartItems
    }

    const response = await save(order);
    if (response.status === 200 || response.status === 201) {
      return Swal.fire({
        title: "Boa",
        text: "Pedido salvo com sucesso",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setApiError("Falha ao salvar o produto.");
    }

  }

  return (
    <div className="container">
      <h1 className="fs-2 mb-4 text-center">Lista de Produtos no carrinho</h1>
      <div className="text-center" style={{ gap: '10px', display: 'flex', justifyContent: 'center' }}>
        <Link
          className="btn btn-success btn-icon mb-3"
          to="/productList"
          title="Adicionar mais"
          style={{ display: "inline-block" }}
        >
          <BsPlusCircle style={{ display: "inline-block" }} /> Novo Produto
        </Link>
        <Button className='btn btn-success btn-icon mb-3' onClick={saveOrder} style={{ display: "inline-block" }}> 
          <FaCheck style={{ display: "inline-block" }}/> Finalizar compra
        </Button>
      </div>
      <div className="text-center" style={{ gap: '10px', display: 'flex', justifyContent: 'center' }}>
        <Form.Select value={selectedPayment} onChange={handleSelectChange} className="col-6">
          <option>Selecione o pagamento</option>
          <option value="pix">Pix</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="cheque">Cheque</option>
        </Form.Select>
      </div>
      <TableContainer>
        <Table>
          <TableCaption>Lista de Produtos</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Nome</Th>
              <Th>Valor unit</Th>
              <Th>Quantidade</Th>
              <Th>Valor total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartItems.map((product) => (
              <Tr key={product.produtoId} _hover={{ cursor: "pointer", background: "#eee" }}>
                <Td>{product.produtoId}</Td>
                <Td>{product.produtoNome}</Td>
                <Td>{product.produtoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Td>
                <Td>{product.quantidade}</Td>
                <Td>{(product.quantidade * product.produtoValor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
    </div>
  );
}