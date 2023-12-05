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

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string>(""); // Estado para el tipo seleccionado
  const { proveedores, loading } = useSelector((resp: any) => resp.proveedores);
  const cancelRef = React.useRef();

  useEffect(() => {
    dispatch(proveedoresGet());
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
              Gestión de Proveedores
            </Heading>
            <Text fontSize="lg">
              Gestione todos los proveedores en esta sección
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
              <ModalProveedorAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalProveedorEdit person={person} onClose={onCloseEdit} />
            </ModalContent>
          </Modal>
          <DeleteProveedor
            cancelRef={cancelRef}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            item={selectedItem}
          />
          {loading ? (
            <Spinner size={"xl"} />
          ) : (
            <CardTableProveedores
              title="Proveedores"
              type="Productos"
              onEdit={openModal}
              onDelete={onOpenDelete}
              list={proveedores.filter(
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
