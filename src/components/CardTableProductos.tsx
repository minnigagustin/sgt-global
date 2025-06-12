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
  useToast,
  Tfoot,
} from "@chakra-ui/react";
import { FiBarChart } from "react-icons/fi";
import { useRouter } from "next/router";

const CardTableProductos = ({
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
  const toast = useToast();

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
                <Th color={"muni.verde"} isNumeric>
                  Inventario
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {list?.map((item: any, index: number) => (
                <Tr key={index}>
                  <Td>{item.nombre}</Td>

                  <Td fontWeight={"bold"} isNumeric>
                    ${item.precio}
                  </Td>
                  <Td fontWeight={"bold"} isNumeric>
                    {item.inventario ? `${item.inventario}` : 0}
                  </Td>
                  <Td fontWeight={"bold"}>
                    <Stack direction="row" justify={"center"}>
                      <Button
                        colorScheme="orange"
                        onClick={() => onEdit(item)}
                        variant="solid"
                      >
                        Editar
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="solid"
                        onClick={() => onDelete(item)}
                      >
                        Eliminar
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={() =>
                          toast({
                            title: "Sección en desarrollo",
                            description:
                              "Muy pronto estará disponible esta nueva sección.",
                            status: "info",
                            duration: 4000,
                            isClosable: true,
                          })
                        }
                        variant="solid"
                      >
                        <Icon as={FiBarChart} />
                      </Button>
                    </Stack>
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

export default CardTableProductos;
