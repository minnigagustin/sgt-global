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
import { FiBarChart, FiCamera, FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/router";

const CardTableCertificados = ({
  color,
  title,
  description,
  total,
  icon,
  type,
  list,
  onDelete,
  onEdit,
  onImage,
}: any) => {
  const router = useRouter();

  return (
    <Card minH="83px">
      <CardBody>
        <TableContainer>
          <Table variant="simple" size={["sm", "sm"]}>
            <Thead>
              <Tr>
                <Th color={"muni.verde"}>Fecha de Canje</Th>
                <Th color={"muni.verde"}>Sucursal</Th>
                <Th color={"muni.verde"}>Numero</Th>
                <Th color={"muni.verde"}>Cliente</Th>

                <Th color={"muni.verde"}>Estado</Th>

                <Th color={"muni.verde"} isNumeric>
                  Accion
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {list?.map((item: any, index: number) => (
                <Tr key={index}>
                  <Td fontWeight={"bold"}>{item.fecha}</Td>
                  <Td>{item.sucursal}</Td>

                  <Td>{item.numero}</Td>
                  <Td>{item.usuario}</Td>

                  <Td>{item.estado}</Td>

                  <Td isNumeric>
                    <Icon as={FiCamera} mr={2} onClick={() => onImage(item)} />

                    <Icon as={FiEdit} mr={2} onClick={() => onEdit(item)} />
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

export default CardTableCertificados;
