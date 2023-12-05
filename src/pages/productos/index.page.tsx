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
  Input,
  Modal,
  ModalContent,
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
import DeleteProduct from "@component/components/DeleteProduct";
import React from "react";
import { useState } from "react";
import ModalProductEdit from "@component/components/ModalProductEdit";
import ModalProductAdd from "@component/components/ModalProductAdd";

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
  const { lista } = useSelector((resp: any) => resp.productos);
  useEffect(() => {
    dispatch(productosGet());

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

  return (
    <>
      <Header>
        <Head>
          <title>Productos | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content="Productos | {process.env.NAME_COMMERCE}"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Button colorScheme="blue" onClick={onOpenAdd} mb={4}>
            Agregar producto +
          </Button>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            placeholder="Buscar productos"
            bg={"white"}
            mb={4}
            size="lg"
          />
          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalProductAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalProductEdit product={product} onClose={onCloseEdit} />
            </ModalContent>
          </Modal>
          <DeleteProduct
            cancelRef={cancelRef}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            item={selectedItem}
          />
          <CardTableProductos
            title="Productos"
            type="Productos"
            onEdit={openModal}
            onDelete={onOpenDelete}
            list={lista.filter((item: any) =>
              item.producto.toLowerCase().includes(searchQuery.toLowerCase())
            )}
          />
        </Container>
      </Header>
    </>
  );
}
