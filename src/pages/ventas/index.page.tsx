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
  FiArrowUpRight,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProveedoresTotales } from "@component/store/inicioSlice";
import { AppDispatch } from "@component/store";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { proyeccionGet } from "@component/store/proyeccionSlice";
import CardSucursalesVentas from "@component/components/CardSucursalesVentas";
import ModalVentaAdd from "@component/components/ModalVentaAdd";
import ModalVentasAdd from "@component/components/ModalVentasAdd";
import moment from "moment";
import "moment/locale/es"; // Importa el paquete de idioma en español
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [sucursal, setSelectedSucursal] = useState("");
  const [mes, setSelectedMes] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sucursalseleccionada, setSucursal] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { sucursales, loading } = useSelector((resp: any) => resp.proyeccion);

  useEffect(() => {
    dispatch(proyeccionGet({}));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtrar = () => {
    //@ts-ignore
    const startDate = selectedDates[0].toISOString().split("T")[0]; // Formatear a 'YYYY-MM-DD'
    const endDate = selectedDates[1].toISOString().split("T")[0]; // Formatear a 'YYYY-MM-DD'

    dispatch(
      proyeccionGet({
        fecha_inicio: startDate,
        fecha_fin: endDate,
      })
    );
  };

  const limpiar = () => {
    //@ts-ignore
    dispatch(GetProveedoresTotales({ mes: "", sucursal: "" }));
    setSelectedSucursal("");
    setSelectedMes("");
  };
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

  const openModal = (sucursal: any) => {
    setSucursal(sucursal);
    onOpen();
  };
  const currentMonth = moment().format("MMMM");

  return (
    <>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Box>
            <Heading>
              <Icon as={FiDollarSign} mr={4} />
              Ventas {!showDatePicker && `- ${currentMonth}`}
            </Heading>
            <Text fontSize="lg">
              Realiza un seguimiento de las ventas en sucursales
            </Text>
          </Box>
          <Divider p={4} />
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalVentasAdd
                sucursal={sucursalseleccionada}
                onClose={onClose}
              />
            </ModalContent>
          </Modal>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            <Input
              placeholder="Buscar"
              bg={"white"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {showDatePicker ? (
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
            ) : (
              <Button
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                color={"#ef4b80"}
                onClick={() => setShowDatePicker(true)} // Mostrar el rango de fechas al hacer clic
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                <Text fontSize="lg">
                  <Icon as={FiCalendar} /> {currentMonth}
                </Text>
              </Button>
            )}

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
          {loading ? (
            <Spinner
              size={"xl"}
              justifyContent={"center"}
              alignContent={"center"}
              alignItems={"center"}
              alignSelf={"center"}
            />
          ) : (
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
              {sucursales
                ?.filter((item: any) =>
                  item.nombre_sucursal
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                ?.map((item: any, key: any) => (
                  <CardSucursalesVentas
                    item={item}
                    key={key}
                    onOpen={openModal}
                  />
                ))}
            </SimpleGrid>
          )}
        </Container>
      </Header>
    </>
  );
}
