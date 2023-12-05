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
import { FiCamera } from "react-icons/fi";

const CardTableFichadas = ({
  color,
  title,
  description,
  total,
  icon,
  type,
  list,
  onImage,
}: any) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={["sm", "sm"]}>
          <Thead>
            <Tr>
              <Th color={"muni.verde"}>Fecha</Th>
              <Th color={"muni.verde"}>Proveedor</Th>
              <Th color={"muni.verde"} isNumeric>
                Nūmero
              </Th>
              <Th color={"muni.verde"}>Sucursal</Th>
              <Th color={"muni.verde"} isNumeric>
                Total
              </Th>
              <Th color={"muni.verde"}>Realizada por</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.map((item: any, index: number) => (
              <Tr key={index}>
                <Td>{moment(item.fecha).format("DD/MM/YY")}</Td>
                <Td fontWeight={"bold"}>{item.nombre}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {item.numero}
                </Td>
                <Td fontWeight={"bold"}>{item.sucursal}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  ${item.total}
                </Td>
                <Td fontWeight={"bold"}>{item.usuario}</Td>
                <Td>
                  {" "}
                  <Icon as={FiCamera} mr={2} onClick={() => onImage(item)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CardTableFichadas;
