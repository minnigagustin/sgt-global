import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Skeleton,
  Spinner,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CardTableSimple from "@component/components/CardTableSimple";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import Header from "@component/components/Header";
import React, { useEffect } from "react";
import { productosGet } from "@component/store/productosSlice";
import CardTableProductos from "@component/components/CardTableProductos";
import CardEmpleado from "@component/components/CardEmpleado";
import { comerciosGet } from "@component/store/inicioSlice";
import CardEmpleadoEdit from "@component/components/CardEmpleadoEdit";
import { useState } from "react";
import ModalEmpleadoEdit from "@component/components/ModalEmpleadoEdit";
import CardComercioEdit from "@component/components/CardComercioEdit";
import ModalComercioEdit from "@component/components/ModalComercioEdit";
import ModalComercioAdd from "@component/components/ModalComercioAdd";
import { FiBarChart, FiPlus } from "react-icons/fi";
import ModalProveedorAdd from "@component/components/ModalProveedorAdd";
import ModalProveedorEdit from "@component/components/ModalProveedorEdit";
import DeleteProveedor from "@component/components/DeleteProveedor";
import CardTableInsumos from "@component/components/CardTableInsumos";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import CardTableSucursales from "@component/components/CardTableSucursales";
import ModalSucursalAdd from "@component/components/ModalSucursalAdd";
import DeleteSucursal from "@component/components/DeleteSucursal";
import ModalSucursalEdit from "@component/components/ModalSucursalEdit";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string>(""); // Estado para el tipo seleccionado
  const { sucursales, loading } = useSelector((resp: any) => resp.sucursales);
  const cancelRef = React.useRef();

  useEffect(() => {
    dispatch(sucursalesGet());
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
        <Head>
          <title>Sucursales | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content="Sucursales | {process.env.NAME_COMMERCE}"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Box>
            <Heading>
              <Icon as={FiBarChart} />
              Sucursales
            </Heading>
            <Text fontSize="lg">
              Realiza un seguimiento de las facturaciones de tus proveedores
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
                <option value="">Todos los paises</option>
                <option value="PANAMA">Panama</option>
                {/*                 <option value="operacionales">operacionales</option>
                 */}
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
              <ModalSucursalAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalSucursalEdit person={person} onClose={onCloseEdit} />
            </ModalContent>
          </Modal>
          <DeleteSucursal
            cancelRef={cancelRef}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            item={selectedItem}
          />
          {loading ? (
            <Spinner size={"xl"} />
          ) : (
            <CardTableSucursales
              title="Proveedores"
              type="Productos"
              onEdit={openModal}
              onDelete={onOpenDelete}
              list={sucursales?.filter(
                (item: any) =>
                  item.ALIAS.toLowerCase().includes(
                    searchQuery.toLowerCase()
                  ) &&
                  (selectedTipo === "" || item.Pais === selectedTipo)
              )}
            />
          )}
        </Container>
      </Header>
    </>
  );
}
