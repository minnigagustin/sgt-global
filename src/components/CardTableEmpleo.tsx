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
import { useSelector } from "react-redux";

const CardTableEmpleo = ({
  color,
  title,
  description,
  total,
  icon,
  list,
}: any) => {
  const { empleadosregistrados } = useSelector((resp: any) => resp.inicio);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={"muni.verde"}>Nombre - Leg.</Th>
              <Th color={"muni.verde"}>Grupo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {empleadosregistrados?.map((item: any, index: number) => (
              <Tr key={index}>
                <Td fontWeight={"bold"}>
                  {item.nombre} - {item.legajo}
                </Td>
                <Td> {item.grupo !== "" ? item.grupo : "Sin Grupo"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CardTableEmpleo;
