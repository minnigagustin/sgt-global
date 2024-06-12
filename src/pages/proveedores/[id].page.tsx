import Head from "next/head";
import { useEffect, useState } from "react";
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

export default function Home({ id }: any) {
  const dispatch: AppDispatch = useDispatch();
  const { fichadas, loading, totalhoras, usuario, totalproveedor } =
    useSelector((resp: any) => resp.proveedores);
  const { sucursales } = useSelector((resp: any) => resp.sucursales);
  const [mes, setSelectedMes] = useState("");
  const [sucursal, setSelectedSucursal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  useEffect(() => {
    //@ts-ignore
    dispatch(fichadasGetUser({ id: id, mes: mes, sucursal: sucursal }));
    dispatch(sucursalesGet());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const filtrar = () => {
    const startDate = selectedDates[0].toISOString().split("T")[0]; // Formatear a 'YYYY-MM-DD'
    const endDate = selectedDates[1].toISOString().split("T")[0]; // Formatear a 'YYYY-MM-DD'
    //@ts-ignore
    dispatch(
      fichadasGetUser({
        id: id,
        sucursal: sucursal,
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

  const onImageOpen = (item: any) => {
    setSelectedItem(item);
    onOpenImage();
  };
  return (
    <>
      <Header>
        <Head>
          <title>Proveedores | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content="Proveedores | {process.env.NAME_COMMERCE}"
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
                  Reporte de Facturación
                </Heading>
                <Text fontSize="lg">
                  Realiza un seguimiento de las facturas registradas por tu
                  equipo
                </Text>
              </Box>
              <Divider p={4} />
              <Box
                bg={"white"}
                w={300}
                justifySelf={"center"}
                alignSelf={"center"}
                p={8}
                boxShadow="xl"
                borderRadius={8}
              >
                <Heading fontWeight={"bold"} textAlign={"center"}>
                  ${Number(totalproveedor)?.toFixed(2)}
                </Heading>
                <Text fontSize="lg" textAlign={"center"}>
                  Facturación Total de Resultados de Búsqueda
                </Text>
              </Box>
              <Divider p={4} />
              <SimpleGrid columns={{ sm: 1, md: 2, xl: 5 }} spacing="24px">
                <Input
                  placeholder="Buscar"
                  bg={"white"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />{" "}
                <Select
                  bg={"white"}
                  onChange={(e) => setSelectedSucursal(e.target.value)}
                >
                  <option value="">Sucursal</option>
                  {sucursales?.map((item: any, key: any) => (
                    <option
                      value={item.nombre}
                      key={key}
                      selected={sucursal === item.nombre}
                    >
                      {item.nombre}
                    </option>
                  ))}
                  {/*                 <option value="operacionales">operacionales</option>
                   */}
                </Select>{" "}
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
              <Modal onClose={onCloseImage} isOpen={isOpenImage} isCentered>
                <ModalOverlay />
                <ModalContent w={"90%"}>
                  <Image
                    alt="imagen"
                    //@ts-ignore
                    src={`${process.env.URL_BACKEND}/${selectedItem?.foto}`}
                    fallbackSrc={`https://bot.nacionsushi.com/facturas/${selectedItem?.foto
                      .split("/")
                      .pop()}`}
                  />
                </ModalContent>
              </Modal>
              <Card minH="83px" mt={4}>
                <CardBody>
                  <CardTableFichadas
                    title="Fichadas"
                    type="Productos"
                    onImage={onImageOpen}
                    list={fichadas?.filter((item: any) =>
                      item.numero
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )}
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
