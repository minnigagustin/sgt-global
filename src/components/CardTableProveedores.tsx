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
import { FiBarChart, FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/router";

const CardTableProveedores = ({
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
                <Th color={"muni.verde"} w={10}>
                  Nombre
                </Th>
                <Th color={"muni.verde"}>RUC</Th>
                <Th color={"muni.verde"}>Tipo</Th>
                <Th color={"muni.verde"}>Logo</Th>
                <Th color={"muni.verde"} isNumeric>
                  Accion
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {list?.map((item: any, index: number) => (
                <Tr key={index}>
                  <Td>{item.id}</Td>
                  <Td fontWeight={"bold"} w={10}>
                    {item.nombre}
                  </Td>
                  <Td>{item.ruc}</Td>

                  <Td>{item.categoria}</Td>
                  <Td>
                    <Avatar
                      src={`https://tamitut.com/PAYA/facturas/${item.logo}`}
                      css={{
                        border: "2px solid white",
                      }}
                    />
                  </Td>
                  <Td isNumeric>
                    <Icon as={FiEdit} onClick={() => onEdit(item)} />
                    <Icon as={FiTrash} onClick={() => onDelete(item)} />
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

export default CardTableProveedores;
