import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import * as XLSX from "xlsx"; // Asegúrate de importar esto
import { FiDownload } from "react-icons/fi";

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
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
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
import { FiPlus, FiShoppingCart } from "react-icons/fi";
import DeleteProductInterno from "@component/components/DeleteProductInterno";
import ModalProductInternoAdd from "@component/components/ModalProductInternoAdd";
import ModalProductInternoEdit from "@component/components/ModalProductInternoEdit";

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

  const handleDownloadExcel = () => {
    const dataToExport = lista.map(({ nombre, precio, inventario }: any) => ({
      Nombre: nombre,
      Precio: precio,
      Stock: inventario,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    XLSX.writeFile(workbook, "productos.xlsx");
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
          <Box>
            <Heading>
              <Icon as={FiShoppingCart} mr={4} />
              Gestión de Productos
            </Heading>
            <Text fontSize="lg">
              Gestione todos los productos y el inventario.
            </Text>
          </Box>
          <Divider p={4} />
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mb={4}
            spacing={4}
          >
            <Flex direction={"row"} flex={1}>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="filled"
                placeholder="Buscar productos"
                bg={"white"}
                mr={4}
                size="lg"
              />
            </Flex>

            <HStack spacing={4}>
              <Button
                w={60}
                leftIcon={<FiDownload />}
                bg="green.500"
                color="white"
                onClick={handleDownloadExcel}
                rounded="md"
                _hover={{
                  bg: "green.600",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Descargar Excel
              </Button>
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
                Agregar producto
              </Button>
            </HStack>
          </Stack>

          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalProductInternoAdd onClose={onCloseAdd} />
            </ModalContent>
          </Modal>
          <Modal onClose={onCloseEdit} isOpen={isOpenEdit} isCentered>
            <ModalOverlay />
            <ModalContent w={"90%"}>
              <ModalProductInternoEdit
                product={product}
                onClose={onCloseEdit}
              />
            </ModalContent>
          </Modal>
          <DeleteProductInterno
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
              item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
            )}
          />
        </Container>
      </Header>
    </>
  );
}
