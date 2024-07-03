import { useState, useEffect } from "react";
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
import OrderService from "@/service/OrderService";

export function Orders() {
  const [apiError, setApiError] = useState("");
  const [arrayOrders, setArrayOrders] = useState<{ id: number; valorTotal: number; data: string; formaPagamento: string }[]>([]);
  const { findAll } = OrderService;

  useEffect(() => {
    getOrders();
  }, []);


  const getOrders = async () => {
    const response = await OrderService.findAll()
    if (response.status === 200 || response.status === 201) {
      setArrayOrders(response.data)
    } else {
      setApiError("Falha ao salvar o produto.");
    }

  };

  return (
    <div className="container">
      <h1 className="fs-2 mb-4 text-center">Lista de Pedidos</h1>
      <TableContainer>
        <Table>
          <TableCaption>Lista de Produtos</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Data</Th>
              <Th>Valor total</Th>
              <Th>Forma de pagamento</Th>
            </Tr>
          </Thead>
          <Tbody>
            {arrayOrders.map((order) => (
              <Tr key={order.id} _hover={{ cursor: "pointer", background: "#eee" }}>
                <Td>{order.id}</Td>
                <Td>{order.data}</Td>
                <Td>{order.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Td>
                <Td>{order.formaPagamento}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
    </div>
  );
}