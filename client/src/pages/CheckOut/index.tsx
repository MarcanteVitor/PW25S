import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form  } from 'react-bootstrap';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  BsThreeDotsVertical,
  BsPencilSquare,
  BsTrash,
  BsPlusCircle,
  BsBagCheckFill 
} from "react-icons/bs";
import { IOrder, IProductCache } from "@/commons/interfaces";
import Swal from 'sweetalert2'
import { FaCheck } from "react-icons/fa";
import OrderService from "@/service/OrderService";

export function CheckOut() {
  const [apiError, setApiError] = useState("");
  const [cartItems, setCartItems] = useState<{ produtoId: number, produtoNome: string, produtoValor: number, quantidade: number }[]>([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [arrayProdutos, setArrayProdutos] = useState<{ id: number; nome: string; valor: number; quantidade: number }[]>([]);
  const produtoCache = { id: 2, nome: "Notebook Arus 15.6", valor: 2449, quantidade: 1 };

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
    if(!selectedPayment)
      return Swal.fire({
        title: "Atenção",
        text: "Informe uma forma de pagamento para prosseguir",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      })
      

    // for(let i = 0; i < cartItems.length; i++){
    //   const produtoCache: IProductCache = {
    //     id:cartItems[i].produtoId,
    //     nome: cartItems[i].produtoNome,
    //     valor:cartItems[i].produtoValor,
    //     quantidade:cartItems[i].quantidade
    //   }

    //   arrayProdutos.push(produtoCache)
		// 	console.log("TCL: saveOrder -> arrayProdutos", arrayProdutos)
		// 	console.log("TCL: saveOrder -> produtoCache", produtoCache)
    // }

    const order: IOrder = {
      products: cartItems
    }

    const response = await save(order);
    if (response.status === 200 || response.status === 201) {
      // navigate("/products-v2");
      console.log(response)
      alert(response.message)
    } else {
      alert(response.message)


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
          {/* <Thead>
            <Tr>
              Informações do usuario
            </Tr>
          </Thead> */}
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
                {/*
                <Td>
                   <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Actions"
                      icon={<BsThreeDotsVertical size={20} />}
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<BsPencilSquare />}
                        onClick={() => onEdit(`/products-v2/${product.id}`)}
                      >
                        Editar
                      </MenuItem> */}
                {/* <MenuItem
                        icon={<BsTrash />}
                        onClick={() => onRemove(product.id!)}
                      >
                        Remover
                      </MenuItem>
                    </MenuList>
                  </Menu> 
                </Td>
                  */}
              </Tr>
            ))}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>#</Th>
              <Th>Nome</Th>
              <Th isNumeric>Preço</Th>
              <Th>Categoria</Th>
              <Th>Ações</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
    </div>
  );
}