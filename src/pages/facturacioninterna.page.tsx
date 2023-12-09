import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiFilter, FiPlus, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { proveedoresGet } from "@component/store/proveedoresSlice";
import CardTableProveedores from "@component/components/CardTableProveedores";
import ModalProveedorEdit from "@component/components/ModalProveedorEdit";
import DeleteProveedor from "@component/components/DeleteProveedor";
import Header from "@component/components/Header";
import ModalFacturaAdd from "@component/components/ModalFacturaAdd";
import CardTableFacturacionInterna from "@component/components/CardFacturacionInterna";
import { facturasGet } from "@component/store/facturacionSlice";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { internosGet } from "@component/store/internosSlice";
import DeleteProduct from "@component/components/DeleteProduct";
import ModalProductEdit from "@component/components/ModalProductEdit";
import CardTableSucursales from "@component/components/CardTableSucursales";
import DeleteFactura from "@component/components/DeleteFactura";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [dummyState, rerender] = React.useState(1);
  const [selectedTipo, setSelectedTipo] = useState<string>(""); // Estado para el tipo seleccionado
  const { facturas, loading } = useSelector((resp: any) => resp.facturacion);
  const { internos } = useSelector((resp: any) => resp.internos);
  const { sucursales } = useSelector((resp: any) => resp.sucursales);
  const cancelRef = React.useRef();

  const onClick = () => {
    rerender(dummyState + 1);
  };

  useEffect(() => {
    dispatch(facturasGet());
    dispatch(sucursalesGet());
    dispatch(internosGet());
  }, [dispatch]);

  useEffect(() => {
    console.log("dummyState's state has updated to: " + dummyState);
  }, [dummyState]);

  const [person, setPerson] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const openModal = (person: any) => {
    console.log(person);
    setPerson(person);
    onOpenEdit();
  };

  const onOpenDelete = (item: any) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Box>
            <Heading>
              <Icon as={FiUser} mr={4} />
              Gestión de Facturas Internas
            </Heading>
            <Text fontSize="lg">
              Estas son las facturas generadas internamente
            </Text>
          </Box>
          <Divider p={4} />
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mb={4}
          >
            <Flex direction={"row"}>
              <Input
                placeholder="Buscar"
                bg={"white"}
                value={searchQuery}
                mr={4}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/*
              <Select
                bg={"white"}
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
              >
                <option value="">Todos los tipos</option>
                <option value="insumo">insumo</option>
              </Select>
            */}
            </Flex>
            <Button
              w={60}
              bg={useColorModeValue("#f6ae3e", "gray.900")}
              color={"white"}
              onClick={onOpenAdd}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              <Icon as={FiPlus} mr={2} />
              CREAR
            </Button>
          </Stack>
          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalFacturaAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalProductEdit person={person} onClose={onCloseEdit} />
            </ModalContent>
          </Modal>
          <DeleteFactura
            cancelRef={cancelRef}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            item={selectedItem}
          />
          {/*
          <CardTableSucursales
            title="Proveedores"
            type="Productos"
            onEdit={openModal}
            onDelete={onOpenDelete}
            list={sucursales}
          />
            */}
          {loading ? (
            <Spinner size={"xl"} />
          ) : (
            <CardTableFacturacionInterna
              title="Facturas"
              type="Facturas"
              onEdit={openModal}
              onDelete={onOpenDelete}
              list={facturas?.filter((item: any) =>
                item.nombre_cliente
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )}
            />
          )}
        </Container>
      </Header>
    </>
  );
}
