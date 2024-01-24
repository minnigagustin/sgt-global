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
  Avatar,
} from "@chakra-ui/react";
import { FiBarChart, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { useRouter } from "next/router";

const CardTableFacturacionInterna = ({
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

  return (
    <Card minH="83px">
      <CardBody>
        <TableContainer>
          <Table variant="simple" size={["sm", "sm"]}>
            <Thead>
              <Tr>
                <Th color={"muni.verde"}>id</Th>
                <Th color={"muni.verde"}>Nombre</Th>
                <Th color={"muni.verde"}>Fecha</Th>
                <Th color={"muni.verde"}>Total</Th>
                <Th color={"muni.verde"} isNumeric>
                  Accion
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {list?.map((item: any, index: number) => (
                <Tr key={index}>
                  <Td>{item.id}</Td>
                  <Td fontWeight={"bold"} w={40}>
                    {item.nombre_cliente}
                  </Td>
                  <Td>{item.fecha}</Td>

                  <Td>{item.total}</Td>
                  <Td isNumeric>
                    <Icon
                      as={FiEye}
                      onClick={() =>
                        window.open(
                          `${process.env.URL_BACKEND}/cotizacionPDF.php?id=` +
                            item.id,
                          "_blank"
                        )
                      }
                    />
                    <Icon as={FiTrash} onClick={() => onDelete(item)} />

                    {/*
                    <Icon as={FiEdit} onClick={() => onEdit(item)} />
                    <Icon as={FiTrash} onClick={() => onDelete(item)} />
                    */}
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

export default CardTableFacturacionInterna;
