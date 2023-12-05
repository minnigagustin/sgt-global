import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { useRouter } from "next/router";
import { fichadasGetUser } from "@component/store/proveedoresSlice";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CardTableFichadas from "@component/components/CardTableFichadas";
import Header from "@component/components/Header";
import moment from "moment";
import "moment/locale/es";
import { FiDelete, FiFilter, FiMoon, FiTrello, FiTruck } from "react-icons/fi";
import CardTablePorDia from "@component/components/CardTablePorDia";
import axios from "axios";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import CardTableVentas from "@component/components/CardTableVentas";
import { ventasGet } from "@component/store/proyeccionSlice";
import ModalVentaEdit from "@component/components/ModalVentaEdit";
import DeleteVenta from "@component/components/DeleteVenta";

export default function Home({ id }: any) {
  const dispatch: AppDispatch = useDispatch();
  const { ventas, loading } = useSelector((resp: any) => resp.proyeccion);
  const { sucursales } = useSelector((resp: any) => resp.sucursales);
  const [mes, setSelectedMes] = useState("");
  const cancelRef = React.useRef();

  const [sucursal, setSelectedSucursal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [venta, setVenta] = useState();

  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  useEffect(() => {
    //@ts-ignore
    dispatch(ventasGet({ id_sucursal: id }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const filtrar = () => {
    const startDate = selectedDates[0].toISOString().split("T")[0]; // Formatear a 'YYYY-MM-DD'
    const endDate = selectedDates[1].toISOString().split("T")[0]; // Formatear a 'YYYY-MM-DD'
    //@ts-ignore
    dispatch(
      ventasGet({
        id_sucursal: id,
        fecha_inicio: startDate,
        fecha_fin: endDate,
      })
    );
  };

  const limpiar = () => {
    //@ts-ignore
    dispatch(fichadasGetUser({ id: id, mes: "", sucursal: "" }));
    setSelectedSucursal("");
    setSelectedMes("");
  };
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const colorbox = useColorModeValue("white", "gray.800");
  const colorbutton = useColorModeValue("#151f21", "gray.900");
  const months = [
    { nombre: "Enero", numero: 1 },
    { nombre: "Febrero", numero: 2 },
    { nombre: "Marzo", numero: 3 },
    { nombre: "Abril", numero: 4 },
    { nombre: "Mayo", numero: 5 },
    { nombre: "Junio", numero: 6 },
    { nombre: "Julio", numero: 7 },
    { nombre: "Agosto", numero: 8 },
    { nombre: "Septiembre", numero: 9 },
    { nombre: "Octubre", numero: 10 },
    { nombre: "Noviembre", numero: 11 },
    { nombre: "Diciembre", numero: 12 },
  ];

  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (venta: any) => {
    console.log(venta);
    setVenta(venta);
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
          <title>Ventas | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content="Ventas | {process.env.NAME_COMMERCE}"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <>
              <Box>
                <Heading w={"100%"}>
                  <Icon as={FiTrello} mr={4} />
                  Reporte de Ventas
                </Heading>
                <Text fontSize="lg">
                  Realiza un seguimiento de las ventas registradas en tu
                  sucursal
                </Text>
              </Box>
              <Divider p={4} />
              <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="24px">
                <RangeDatepicker
                  selectedDates={selectedDates}
                  onDateChange={setSelectedDates}
                  configs={{
                    dateFormat: "dd-MM-yyyy",
                  }}
                  propsConfigs={{
                    inputProps: {
                      size: "md",
                      bg: "white",
                    },
                  }}
                />
                <Button
                  w={"full"}
                  bg={useColorModeValue("#f6ae3e", "gray.900")}
                  color={"white"}
                  onClick={filtrar}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  <Icon as={FiFilter} mr={2} />
                  Filtrar
                </Button>
                <Button
                  w={"full"}
                  bg={useColorModeValue("#f6ae3e", "gray.900")}
                  color={"white"}
                  onClick={limpiar}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  <Icon as={FiDelete} mr={2} />
                  Limpiar
                </Button>
              </SimpleGrid>
              <DeleteVenta
                cancelRef={cancelRef}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                item={selectedItem}
              />
              <Modal onClose={onCloseImage} isOpen={isOpenImage} isCentered>
                <ModalOverlay />
                <ModalContent w={"90%"}>
                  <Image
                    alt="imagen"
                    //@ts-ignore
                    src={`https://tamitut.com/PAYA/facturas/${selectedItem?.foto}`}
                  />
                </ModalContent>
              </Modal>
              <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
                <ModalOverlay />
                <ModalContent w={"90%"}>
                  <ModalVentaEdit venta={venta} onClose={onCloseEdit} />
                </ModalContent>
              </Modal>
              <Card minH="83px" mt={4}>
                <CardBody>
                  <CardTableVentas
                    title="Fichadas"
                    type="Productos"
                    onEdit={openModal}
                    onDelete={onOpenDelete}
                    list={ventas}
                  />
                </CardBody>
              </Card>
            </>
          )}
        </Container>
      </Header>
    </>
  );
}

export async function getServerSideProps({ query }: any) {
  const id = query.id || null;

  return {
    props: { id },
  };
}
