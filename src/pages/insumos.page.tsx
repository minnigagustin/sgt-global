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
import ModalProveedorAdd from "@component/components/ModalProveedorAdd";
import CardTableInsumos from "@component/components/CardTableInsumos";
import { productosGet } from "@component/store/productosSlice";
import DeleteProduct from "@component/components/DeleteProduct";
import ModalProductEdit from "@component/components/ModalProductEdit";
import ModalProductAdd from "@component/components/ModalProductAdd";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string>(""); // Estado para el tipo seleccionado
  const { productos, loading } = useSelector((resp: any) => resp.productos);
  const cancelRef = React.useRef();

  useEffect(() => {
    dispatch(productosGet());
  }, [dispatch]);

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
              Gestión de Insumos y Gastos Operacionales
            </Heading>
            <Text fontSize="lg">
              Gestione todos los insumos y gastos operacionales
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
              <Select
                bg={"white"}
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
              >
                <option value="">Todos los tipos</option>
                <option value="insumo">insumo</option>
                <option value="operacionales">operacionales</option>
              </Select>
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
              Agregar
            </Button>
          </Stack>
          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalProductAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalProductEdit person={person} onClose={onCloseEdit} />
            </ModalContent>
          </Modal>
          <DeleteProduct
            cancelRef={cancelRef}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            item={selectedItem}
          />
          {loading ? (
            <Spinner size={"xl"} />
          ) : (
            <CardTableInsumos
              title="Proveedores"
              type="Productos"
              onEdit={openModal}
              onDelete={onOpenDelete}
              list={productos.filter(
                (item: any) =>
                  item.nombre
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                  (selectedTipo === "" || item.categoria === selectedTipo)
              )}
            />
          )}
        </Container>
      </Header>
    </>
  );
}
