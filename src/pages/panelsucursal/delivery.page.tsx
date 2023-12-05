import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import CardTableSimple from "@component/components/CardTableSimple";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import Header from "@component/components/Header";
import { useEffect } from "react";
import { productosGet } from "@component/store/productosSlice";
import CardTableProductos from "@component/components/CardTableProductos";
import DeleteProduct from "@component/components/DeleteProduct";
import React from "react";
import { useState } from "react";
import ModalProductEdit from "@component/components/ModalProductEdit";
import ModalProductAdd from "@component/components/ModalProductAdd";
import ModalPedidosAdd from "@component/components/ModalPedidosAdd";
import { DeliveryGet } from "@component/store/inicioSlice";
import CardTableDelivery from "@component/components/CardTableDelivery";
import HeaderSucursales from "@component/components/HeaderSucursales";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const cancelRef = React.useRef();
  const [product, setProduct] = useState(null);
  const { delivery } = useSelector((resp: any) => resp.inicio);
  useEffect(() => {
    dispatch(DeliveryGet());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpenDelete = (item: any) => {
    setSelectedItem(item);
    onOpen();
  };

  const openModal = (product: any) => {
    setProduct(product);
    onOpenEdit();
  };
  console.log(delivery);

  return (
    <>
      <HeaderSucursales>
        <Head>
          <title>Delivery | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content="Delivery | {process.env.NAME_COMMERCE}"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Alert status="info" mb={4}>
            <AlertIcon />
            <Box>
              <AlertTitle>Atencion!</AlertTitle>
              <AlertDescription>
                Cobrarle al cliente $300 de envio, es lo que cobra el repartidor
                por llevarlo. Por el momento solo ENVIOS EN EFECTIVO.
              </AlertDescription>
            </Box>
          </Alert>

          <Button colorScheme="blue" onClick={onOpenAdd} mb={4} w="100%" p={10}>
            Pedir Delivery +
          </Button>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            placeholder="Buscar pedidos"
            bg={"white"}
            mb={4}
            size="lg"
          />
          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalPedidosAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          {delivery.length > 0 ? (
            <CardTableDelivery
              title="Historial de pedidos"
              type="Direccion"
              onEdit={openModal}
              onDelete={onOpenDelete}
              list={delivery?.filter((item: any) =>
                item.direccion.toLowerCase().includes(searchQuery.toLowerCase())
              )}
            />
          ) : (
            <Spinner />
          )}

          <Alert status="success" variant="solid" mt={4}>
            <AlertIcon />
            Funcionando desde las 9 de la mañana
          </Alert>
          <Divider />
          <Alert
            mt={4}
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Modo de uso{" "}
            </AlertTitle>
            <AlertDescription>
              - Seleccionar el boton "Pedir Delivery", cargar el monto del
              pedido, la direccion y seleccionar la sucursal de retiro.
              <Divider />
              Al momento de llegar el repartidor, entregar el pedido y pedirle
              el dinero. (el se quedara con los $300 de envio) Seleccionar el
              boton de Pendiente, va a cambiar a "PAGADO"
              <Divider />
              En caso de que el repartidor no pague en el momento, no
              seleccionar el boton de "pendiente" hasta que vuelva con el pago.
            </AlertDescription>
          </Alert>
        </Container>
      </HeaderSucursales>
    </>
  );
}
