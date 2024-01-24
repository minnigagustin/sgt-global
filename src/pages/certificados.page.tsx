import Head from "next/head";
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
  Image,
  useDisclosure,
  Spinner,
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
import { FiAward, FiBarChart, FiCamera, FiPlus } from "react-icons/fi";
import ModalProveedorAdd from "@component/components/ModalProveedorAdd";
import ModalProveedorEdit from "@component/components/ModalProveedorEdit";
import DeleteProveedor from "@component/components/DeleteProveedor";
import CardTableInsumos from "@component/components/CardTableInsumos";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import CardTableSucursales from "@component/components/CardTableSucursales";
import ModalSucursalAdd from "@component/components/ModalSucursalAdd";
import DeleteSucursal from "@component/components/DeleteSucursal";
import ModalSucursalEdit from "@component/components/ModalSucursalEdit";
import CardTableUsuarios from "@component/components/CardTableUsuarios";
import { usuariosGet } from "@component/store/usuariosSlice";
import DeleteUsuario from "@component/components/DeleteUsuario";
import ModalUsuarioEdit from "@component/components/ModalUsuarioEdit";
import ModalUsuarioAdd from "@component/components/ModalUsuarioAdd";
import { certificadosGet } from "@component/store/certificadosSlice";
import CardTableCertificados from "@component/components/CardTableCertificados";
import DeleteCertificado from "@component/components/DeleteCertificado";
import ModalCertificadoAdd from "@component/components/ModalCertificadoAdd";
import ModalCertificadoEdit from "@component/components/ModalCertificadoEdit";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTipo, setSelectedTipo] = useState<string>(""); // Estado para el tipo seleccionado
  const [selectedEstado, setSelectedEstado] = useState<string>(""); // Estado para el tipo seleccionado

  const { certificados, loading } = useSelector(
    (resp: any) => resp.certificados
  );
  const { sucursales } = useSelector((resp: any) => resp.sucursales);

  const cancelRef = React.useRef();

  useEffect(() => {
    dispatch(certificadosGet());
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
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
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

  const onImageOpen = (item: any) => {
    setSelectedItem(item);
    onOpenImage();
  };

  return (
    <>
      <Header>
        <Head>
          <title>Certificados | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content="Certificados | {process.env.NAME_COMMERCE}"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Box>
            <Heading>
              <Icon as={FiAward} />
              Gestíon de Certificados
            </Heading>
            <Text fontSize="lg">
              Realiza un seguimiento de las certificados de regalo
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
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                mr={4}
              >
                <option value="">Estado</option>
                <option value="DISPONIBLE">Disponible</option>
                <option value="USADO">Usado</option>
              </Select>
              <Select
                bg={"white"}
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
              >
                <option value="">Sucursal</option>
                {sucursales?.map((item: any, key: any) => (
                  <option value={item.nombre} key={key}>
                    {item.nombre}
                  </option>
                ))}
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
            <Button
              w={60}
              bg={useColorModeValue("#ef4b80", "gray.900")}
              color={"white"}
              onClick={onOpenAdd}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              <Icon as={FiCamera} mr={2} />
              Escanear certificado
            </Button>
          </Stack>
          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalCertificadoAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>

          <Modal onClose={onCloseImage} isOpen={isOpenImage} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <Image
                alt="imagen"
                //@ts-ignore
                src={`${process.env.URL_BACKEND}/${selectedItem?.foto}`}
              />
            </ModalContent>
          </Modal>
          <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalCertificadoEdit person={person} onClose={onCloseEdit} />
            </ModalContent>
          </Modal>
          <DeleteCertificado
            cancelRef={cancelRef}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            item={selectedItem}
          />
          {loading ? (
            <Spinner size={"xl"} />
          ) : (
            <CardTableCertificados
              title="Proveedores"
              type="Productos"
              onEdit={openModal}
              onDelete={onOpenDelete}
              onImage={onImageOpen}
              list={certificados?.filter(
                (item: any) =>
                  item.usuario
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                  (selectedTipo === "" || item.sucursal === selectedTipo) &&
                  (selectedEstado === "" || item.estado === selectedEstado)
              )}
            />
          )}
        </Container>
      </Header>
    </>
  );
}
