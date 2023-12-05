import React from "react";
import {
  VStack,
  Button,
  Text,
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Card,
  CardBody,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { FiBarChart } from "react-icons/fi";
import { useRouter } from "next/router";
import moment from "moment";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { DeliveryGet } from "@component/store/inicioSlice";

const CardTableDelivery = ({
  color,
  title,
  description,
  total,
  icon,
  type,
  list,
  onDelete,
  onEdit,
}: any) => {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (id: any) => {
    axios
      .post("https://appspuntaltenses.com/losmussini/editardelivery.php", {
        id: id,
        pago: 1,
      })
      .then((data) => {
        dispatch(DeliveryGet());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card minH="83px">
      <CardBody>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"gray.800"}>
          {title}
        </Text>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color={"muni.verde"}>{type}</Th>
                <Th color={"muni.verde"} isNumeric>
                  Precio
                </Th>
                <Th color={"muni.verde"}>Sucursal</Th>
                <Th color={"muni.verde"} isNumeric>
                  Fecha
                </Th>
                <Th color={"muni.verde"} isNumeric>
                  Pago
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {list?.map((item: any, index: number) => (
                <Tr key={index}>
                  <Td>{item.direccion}</Td>
                  <Td fontWeight={"bold"} isNumeric>
                    ${item.total}
                  </Td>
                  <Td>{item.sucursal}</Td>
                  <Td fontWeight={"bold"} isNumeric>
                    {item.fecha ? moment(item.fecha).format("DD/MM/YY") : null}
                  </Td>
                  <Td isNumeric>
                    {item.pago == 0 ? (
                      <Button
                        colorScheme="orange"
                        onClick={() => handleSubmit(item.id)}
                        variant="solid"
                      >
                        Pendiente
                      </Button>
                    ) : (
                      <Button colorScheme="green" variant="solid">
                        Pagado
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default CardTableDelivery;
