import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
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
import CardEmpleado from "@component/components/CardEmpleado";
import { comerciosGet } from "@component/store/inicioSlice";
import CardEmpleadoEdit from "@component/components/CardEmpleadoEdit";
import { useState } from "react";
import ModalEmpleadoEdit from "@component/components/ModalEmpleadoEdit";
import CardComercioEdit from "@component/components/CardComercioEdit";
import ModalComercioEdit from "@component/components/ModalComercioEdit";
import ModalComercioAdd from "@component/components/ModalComercioAdd";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const { comercios } = useSelector((resp: any) => resp.inicio);
  useEffect(() => {
    dispatch(comerciosGet());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [comercio, setComercio] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (comercio: any) => {
    setComercio(comercio);
    onOpen();
  };

  return (
    <>
      <Header>
        <Head>
          <title>Comercios | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content="Comercio | {process.env.NAME_COMMERCE}"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Button colorScheme="blue" onClick={onOpenAdd} mb={4}>
            Agregar comercio +
          </Button>
          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalComercioAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalComercioEdit comercio={comercio} onClose={onClose} />
            </ModalContent>
          </Modal>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            {comercios.map((item: any, key: any) => (
              <CardComercioEdit item={item} key={key} onHandle={openModal} />
            ))}
          </SimpleGrid>
        </Container>
      </Header>
    </>
  );
}
