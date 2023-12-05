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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
} from "@chakra-ui/react";
import CardDashboard from "@component/components/CardDashboard";
import CardTable from "@component/components/CardTable";
import dynamic from "next/dynamic";
import CardTableSimple from "@component/components/CardTableSimple";
import Header from "@component/components/Header";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiUsers,
  FiSearch,
  FiPackage,
  FiPieChart,
  FiTruck,
  FiMessageCircle,
  FiBarChart,
  FiBookOpen,
  FiList,
  FiFilter,
  FiDelete,
  FiActivity,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  comerciosGet,
  DeliveryGet,
  GetProveedoresTotales,
} from "@component/store/inicioSlice";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";
import CardComercioEdit from "@component/components/CardComercioEdit";
import CardProveedoresTotales from "@component/components/CardProveedoresTotales";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import CardTableSubComponent from "@component/components/CardTableSubComponent";
import { proveedoresGet } from "@component/store/proveedoresSlice";
import { reportesGet } from "@component/store/reportesSlice";

const CardChart = dynamic(
  () => {
    return import("@component/components/CardChart");
  },
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [sucursal, setSelectedSucursal] = useState("");

  const [proveedor, setSelectedProveedor] = useState("");
  const [mes, setSelectedMes] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const { proveedores } = useSelector((resp: any) => resp.proveedores);
  const { reportes } = useSelector((resp: any) => resp.reportes);

  const { empleadosregistrados, comercios, delivery, proveedoresTotales } =
    useSelector((resp: any) => resp.inicio);
  const { sucursales } = useSelector((resp: any) => resp.sucursales);

  useEffect(() => {
    dispatch(
      reportesGet({ nombreProveedor: null, fechaInicio: null, fechaFin: null })
    );
    dispatch(proveedoresGet());

    //@ts-ignore
    dispatch(GetProveedoresTotales({ mes: mes, sucursal: sucursal }));
    dispatch(comerciosGet());
    dispatch(productosGet());
    dispatch(DeliveryGet());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateTotal = (): string => {
    const totalGanancias = delivery?.reduce((sum: number, item: any) => {
      return sum + Number(item.total);
    }, 0);
    return totalGanancias;
  };

  const filtrar = () => {
    //@ts-ignore
    const startDate = selectedDates[0].toISOString().split("T")[0]; // Formatear a 'YYYY-MM-DD'
    const endDate = selectedDates[1].toISOString().split("T")[0]; // Formatear a 'YYYY-MM-DD'

    dispatch(
      reportesGet({
        fechaInicio: startDate,
        fechaFin: endDate,
        nombreProveedor: proveedor,
      })
    );
  };

  const limpiar = () => {
    //@ts-ignore
    dispatch(
      reportesGet({
        fechaInicio: null,
        fechaFin: null,
        nombreProveedor: null,
      })
    );
    setSelectedSucursal("");
    setSelectedMes("");
  };
  const totalSum = calculateTotal();
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

  return (
    <>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Box>
            <Heading>
              <Icon as={FiActivity} mr={4} />
              Tabla Comparativa de Gastos
            </Heading>
            <Text fontSize="lg">
              Realiza un seguimiento de los gastos de tu negocio
            </Text>
          </Box>
          <Divider p={4} />
          <CardChart />

          <Divider p={4} />
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 6 }} spacing="24px">
            <Input
              placeholder="Buscar"
              bg={"white"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              bg={"white"}
              onChange={(e) => setSelectedProveedor(e.target.value)}
            >
              <option value="">Proveedor</option>
              {proveedores?.map((item: any, key: any) => (
                <option
                  value={item.nombre}
                  selected={sucursal === item.nombre}
                  key={key}
                >
                  {item.nombre}
                </option>
              ))}
              {/*                 <option value="operacionales">operacionales</option>
               */}
            </Select>

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
              rounded={"md"}
              onClick={limpiar}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              <Icon as={FiDelete} mr={2} />
              Limpiar
            </Button>
          </SimpleGrid>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px" mt={8}>
            <Card minH="83px">
              <CardBody>
                <Text
                  fontWeight={"bold"}
                  fontSize={"xl"}
                  mb={2}
                  color={"gray.800"}
                >
                  Insumos
                </Text>
                <CardTableSubComponent
                  list={reportes.filter(
                    (item: any) =>
                      item.nombre_corto
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                      item.categoria === "insumo"
                  )}
                />
              </CardBody>
            </Card>
            <Card minH="83px">
              <CardBody>
                <Text
                  fontWeight={"bold"}
                  fontSize={"xl"}
                  mb={2}
                  color={"gray.800"}
                >
                  Gastos Operacionales
                </Text>
                <CardTableSubComponent
                  list={reportes.filter(
                    (item: any) =>
                      item.nombre_corto
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                      item.categoria === "operacionales"
                  )}
                />
              </CardBody>
            </Card>
          </SimpleGrid>
        </Container>
      </Header>
    </>
  );
}
