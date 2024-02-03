import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
  AbsoluteCenter,
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
  ModalContent,
  ModalOverlay,
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
import CardDashboard from "@component/components/CardDashboard";
import CardTable from "@component/components/CardTable";
import dynamic from "next/dynamic";
import CardTableSimple from "@component/components/CardTableSimple";
import Header from "@component/components/Header";
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
  FiCalendar,
  FiEye,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  comerciosGet,
  GetProveedoresTotales,
} from "@component/store/inicioSlice";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";
import CardComercioEdit from "@component/components/CardComercioEdit";
import CardProveedoresTotales from "@component/components/CardProveedoresTotales";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import moment from "moment";
import "moment/locale/es"; // Importa el paquete de idioma en español
import CardProveedoresEscaner from "@component/components/CardProveedoresEscaner";
import ModalScanAdd from "@component/components/ModalScanAdd";
import ModalFacturaAdd from "@component/components/ModalFacturaAdd";
import ModalManualAdd from "@component/components/ModalManualAdd";
import { useRouter } from "next/router";
import { externosGet } from "@component/store/externosSlice";
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
  const router = useRouter();
  const [mes, setSelectedMes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [person, setPerson] = useState();

  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const {
    isOpen: isOpenScan,
    onOpen: onOpenScan,
    onClose: onCloseScan,
  } = useDisclosure();

  const {
    empleadosregistrados,
    comercios,
    delivery,
    proveedoresTotales,
    loading,
  } = useSelector((resp: any) => resp.inicio);
  const { sucursales } = useSelector((resp: any) => resp.sucursales);

  useEffect(() => {
    dispatch(sucursalesGet());
    dispatch(externosGet());

    //@ts-ignore
    dispatch(GetProveedoresTotales({ mes: mes, sucursal: sucursal }));

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
      GetProveedoresTotales({
        fecha_inicio: startDate,
        fecha_fin: endDate,
        sucursal: sucursal,
      })
    );
  };

  const limpiar = () => {
    //@ts-ignore
    dispatch(GetProveedoresTotales({ mes: "", sucursal: "" }));
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

  const proveedoresinsumos = proveedoresTotales.filter(
    (item: any) => item.tipo === "insumos" || item.tipo === "insumo"
  );
  // Filtra los empleados que NO tienen el rol de "administrador"
  const proveedoresoperacionales = proveedoresTotales.filter(
    (item: any) => item.tipo === "operacionales"
  );
  const currentMonth = moment().format("MMMM");

  const openModal = (person: any) => {
    console.log("eladio");
    console.log(person);
    setPerson(person);
    onOpenScan();
  };

  const openModalAdd = (person: any) => {
    console.log("eladio");
    console.log(person);
    setPerson(person);
    onOpenAdd();
  };

  return (
    <>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Box>
            <Heading>
              <Icon as={FiEye} mr={4} />
              Escaneo de Facturas
            </Heading>
          </Box>
          <Divider p={4} />
          <Modal onClose={onCloseScan} isOpen={isOpenScan} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalScanAdd person={person} onClose={onCloseScan} />
            </ModalContent>
          </Modal>
          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalManualAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="24px">
            <Input
              placeholder="Buscar"
              bg={"white"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SimpleGrid>
          {loading ? (
            <Spinner
              size={"xl"}
              justifyContent={"center"}
              alignContent={"center"}
              alignItems={"center"}
              alignSelf={"center"}
            />
          ) : (
            <Flex justifyContent="space-between">
              <Box flex="1" marginRight="4">
                <Text fontSize={"2xl"} mb={-3} mt={2}>
                  Insumos
                </Text>
                {proveedoresinsumos?.length > 0 ? (
                  <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
                    {proveedoresinsumos
                      ?.filter((item: any) =>
                        item.nombre
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      ?.map((item: any, key: any) => (
                        <CardProveedoresEscaner
                          item={item}
                          key={key}
                          onOpen={openModal}
                          onAdd={openModalAdd}
                        />
                      ))}
                  </SimpleGrid>
                ) : (
                  <>
                    <Text fontSize={"xl"} mt={14} fontWeight={"bold"}>
                      No hay proveedores, debes agregarlos.
                    </Text>
                    <Text fontSize="8xl" textAlign="center" my="4">
                      😢
                    </Text>
                    <Button
                      colorScheme="green"
                      w={"100%"}
                      onClick={() => router.push("/proveedores")}
                    >
                      Ir a Proveedores {">"}
                    </Button>
                  </>
                )}
              </Box>
              <Box bg="gray.200" width="2px" alignSelf="stretch" />{" "}
              {/* Línea vertical */}
              <Box flex="1" marginLeft="4">
                <Text fontSize={"2xl"} mb={-3} mt={2}>
                  Gastos Operacionales
                </Text>
                {proveedoresoperacionales?.length > 0 ? (
                  <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
                    {proveedoresoperacionales
                      .filter((item: any) =>
                        item.nombre
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((item: any, key: any) => (
                        <CardProveedoresEscaner
                          item={item}
                          key={key}
                          onOpen={openModal}
                          onAdd={openModalAdd}
                        />
                      ))}
                  </SimpleGrid>
                ) : (
                  <>
                    <Text fontSize={"xl"} mt={14} fontWeight={"bold"}>
                      No hay proveedores, debes agregarlos.
                    </Text>
                    <Text fontSize="8xl" textAlign="center" my="4">
                      😢
                    </Text>
                    <Button
                      colorScheme="green"
                      w={"100%"}
                      onClick={() => router.push("/proveedores")}
                    >
                      Ir a Proveedores {">"}
                    </Button>
                  </>
                )}
              </Box>
            </Flex>
          )}
        </Container>
      </Header>
    </>
  );
}
