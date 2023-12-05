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

const CardTablePorDia = ({
  color,
  title,
  description,
  total,
  icon,
  type,
  list,
}: any) => {
  const formatTime = (time: any) => {
    const parts = time.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };
  return (
    <>
      <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"gray.800"}>
        {title}
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={"muni.verde"}>Fecha</Th>
              <Th color={"muni.verde"} isNumeric>
                Entrada
              </Th>
              <Th color={"muni.verde"} isNumeric>
                Salida
              </Th>
              <Th color={"muni.verde"} isNumeric>
                Total
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.map((item: any, index: number) => (
              <Tr key={index}>
                <Td>{moment(item.date).format("DD/MM/YY")}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {moment(item.entrada, "HH:mm:ss.SSSSSS").format("HH:mm A")}
                </Td>
                <Td fontWeight={"bold"} isNumeric>
                  {moment(item.salida, "HH:mm:ss.SSSSSS").format("HH:mm A")}
                </Td>
                <Td fontWeight={"bold"} isNumeric>
                  {`${item.total.horas}:${item.total.minutos
                    .toString()
                    .padStart(2, "0")}Hs`}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CardTablePorDia;
