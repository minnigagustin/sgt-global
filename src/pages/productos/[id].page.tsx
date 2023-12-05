import Head from "next/head";
import { useEffect } from "react";
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
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CardTableFichadas from "@component/components/CardTableFichadas";
import Header from "@component/components/Header";
import moment from "moment";
import "moment/locale/es";
import { FiMoon, FiTruck } from "react-icons/fi";
import CardTablePorDia from "@component/components/CardTablePorDia";
import axios from "axios";
import dynamic from "next/dynamic";
import { ProductoGetId } from "@component/store/productosSlice";

const CardChartProduct = dynamic(
  () => {
    return import("@component/components/CardChartProduct");
  },
  { ssr: false }
);

export default function Home({ id }: any) {
  const dispatch: AppDispatch = useDispatch();
  const { estadisticas, producto, loading } = useSelector(
    (resp: any) => resp.productos
  );

  useEffect(() => {
    dispatch(ProductoGetId({ id }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const colorbox = useColorModeValue("white", "gray.800");
  const colorbutton = useColorModeValue("#151f21", "gray.900");

  // Función para calcular el total de horas por día
  const calcularTotalHorasPorDia = () => {
    const result = {};
    //@ts-ignore
    fichadas.forEach((entry) => {
      const authDate = entry.authDate;
      const authTime = entry.authTime;
      const direction = entry.direction;
      //@ts-ignore
      if (!result[authDate]) {
        //@ts-ignore
        result[authDate] = {
          date: authDate,
          entrada: "",
          salida: "",
          total: { horas: 0, minutos: 0 },
        };
      }

      if (direction === "entrada") {
        //@ts-ignore
        result[authDate].entrada = authTime;
        //@ts-ignore
      } else if (direction === "salida" && result[authDate].entrada !== "") {
        //@ts-ignore
        result[authDate].salida = authTime;
        //@ts-ignore
        const entryDateTime = moment(`2000-01-01T${result[authDate].entrada}`);
        //@ts-ignore
        const exitDateTime = moment(`2000-01-01T${result[authDate].salida}`);
        const diffDuration = moment.duration(exitDateTime.diff(entryDateTime));
        const hours = diffDuration.hours();
        const minutes = diffDuration.minutes();
        //@ts-ignore
        result[authDate].total = { horas: hours, minutos: minutes };
        //@ts-ignore
      }
    });
    // Filtrar los días en los que solo se registre la entrada
    //@ts-ignore
    const filteredResult = Object.values(result)
      //@ts-ignore
      .map((date) => ({
        //@ts-ignore
        date: date.date,
        //@ts-ignore
        entrada: date.entrada,
        //@ts-ignore
        salida: date.salida,
        //@ts-ignore
        total: date.total,
      }));

    return filteredResult;
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
              <Center mb={4}>
                <Box
                  maxW={"100%"}
                  w={"full"}
                  bg={colorbox}
                  boxShadow={"2xl"}
                  rounded={"md"}
                  overflow={"hidden"}
                >
                  <Flex direction={"row"} justify={"center"} mt={12}>
                    <Avatar
                      size={"xl"}
                      src={`/logo.png`}
                      css={{
                        border: "2px solid white",
                      }}
                    />

                    <Stack direction={["column", "row"]} p={6}>
                      <Stack spacing={0} align={"center"} mb={5}>
                        <Heading
                          fontSize={"2xl"}
                          fontWeight={500}
                          fontFamily={"body"}
                        >
                          {producto?.producto}
                        </Heading>
                        <Text color={"gray.500"}>
                          {producto?.precio !== ""
                            ? `$${producto?.precio}`
                            : "Sin Precio"}
                        </Text>
                      </Stack>
                    </Stack>
                  </Flex>
                </Box>
              </Center>
              <Card minH="83px">
                <CardBody>
                  <CardChartProduct product={producto} stats={estadisticas} />
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
