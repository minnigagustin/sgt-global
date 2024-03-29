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
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  HStack,
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
} from "@chakra-ui/react";
import CardTableSimple from "@component/components/CardTableSimple";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import Header from "@component/components/Header";
import { useEffect } from "react";
import { productosGet } from "@component/store/productosSlice";
import CardTableProductos from "@component/components/CardTableProductos";
import CardEmpleado from "@component/components/CardEmpleado";
import { empleadosRegistrados } from "@component/store/inicioSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch: AppDispatch = useDispatch();

  const { empleadosregistrados, comercios } = useSelector(
    (resp: any) => resp.inicio
  );
  useEffect(() => {
    dispatch(empleadosRegistrados());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header>
        <Head>
          <title>Fichadas | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content={`Fichadas | {process.env.NAME_COMMERCE}`}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            {empleadosregistrados.map((item: any, key: any) => (
              <CardEmpleado item={item} key={key} />
            ))}
          </SimpleGrid>
        </Container>
      </Header>
    </>
  );
}
