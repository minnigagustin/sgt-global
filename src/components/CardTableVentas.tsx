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
import moment from "moment";
import { FiCamera, FiEdit, FiTrash } from "react-icons/fi";

const CardTableVentas = ({
  color,
  title,
  description,
  total,
  icon,
  type,
  list,
  onEdit,
  onDelete,
}: any) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={["sm", "sm"]}>
          <Thead>
            <Tr>
              <Th color={"muni.verde"}>Venta</Th>
              <Th color={"muni.verde"}>Periodo Inicio</Th>
              <Th color={"muni.verde"}>Periodo Fin</Th>
              <Th isNumeric></Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.map((item: any, index: number) => (
              <Tr key={index}>
                <Td fontWeight={"bold"}>${item.venta}</Td>
                <Td>{moment(item.periodo_inicio).format("DD/MM/YY")}</Td>
                <Td>{moment(item.periodo_fin).format("DD/MM/YY")}</Td>

                <Td isNumeric>
                  <Icon as={FiEdit} mr={2} onClick={() => onEdit(item)} />
                  <Icon as={FiTrash} onClick={() => onDelete(item)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CardTableVentas;
