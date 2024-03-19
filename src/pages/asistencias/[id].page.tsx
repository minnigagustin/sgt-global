import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { useRouter } from "next/router";
import { fichadasGetUser } from "@component/store/fichadasSlice";
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

export default function Home({ id }: any) {
  const dispatch: AppDispatch = useDispatch();
  const { fichadas, loading, totalhoras, usuario } = useSelector(
    (resp: any) => resp.fichadas
  );

  useEffect(() => {
    dispatch(fichadasGetUser({ id }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const colorbox = useColorModeValue("white", "gray.800");
  const colorbutton = useColorModeValue("#151f21", "gray.900");

  // Función para calcular el total de horas por día
  const calcularTotalHorasPorDia = () => {
    //@ts-ignore
    const result = [];

    //@ts-ignore
    fichadas.forEach((entry) => {
      const authDate = entry.authDate;
      const authTime = entry.authTime;
      const direction = entry.direction;
      //@ts-ignore
      let existingEntry = result.find(
        (item) => item.date === authDate && item.entrada && !item.salida
      );

      if (!existingEntry) {
        existingEntry = {
          date: authDate,
          entrada: "",
          salida: "",
          total: { horas: 0, minutos: 0 },
        };
        result.push(existingEntry);
      }

      if (direction === "entrada") {
        existingEntry.entrada = authTime;
      } else if (
        direction === "salida" &&
        existingEntry.entrada &&
        !existingEntry.salida
      ) {
        existingEntry.salida = authTime;
        const entryDateTime = moment(`2000-01-01T${existingEntry.entrada}`);
        const exitDateTime = moment(`2000-01-01T${existingEntry.salida}`);
        const diffDuration = moment.duration(exitDateTime.diff(entryDateTime));
        const hours = diffDuration.hours();
        const minutes = diffDuration.minutes();
        existingEntry.total = { horas: hours, minutos: minutes };
      }
    });

    // Filtrar los días en los que se registraron tanto entradas como salidas
    //@ts-ignore

    // Reorganizar el resultado en el formato deseado
    const formattedResult = result.flatMap((entry) => {
      //@ts-ignore
      return entry.salida.split(",").map((salida, index) => ({
        date: entry.date,
        entrada: index === 0 ? entry.entrada : "",
        salida: salida.trim(),
        total: entry.total,
      }));
    });

    console.log(formattedResult);
    return formattedResult;
  };

  const totalHorasPorNoche = () => {
    // Función para calcular el total de horas por día
    const result = {};

    for (let i = 0; i < fichadas.length; i += 2) {
      const entrada = new Date(fichadas[i]?.authDateTime);
      const salida = new Date(fichadas[i + 1]?.authDateTime);

      // Calcular la diferencia en milisegundos
      //@ts-ignore
      const diferencia = salida - entrada;

      // Calcular las horas y minutos trabajados
      const horasTrabajadas = Math.floor(diferencia / (1000 * 60 * 60));
      const minutosTrabajados = Math.floor((diferencia / (1000 * 60)) % 60);

      // Sumar las horas trabajadas al total
      //@ts-ignore
      result[fichadas[i].authDate] = {
        date: fichadas[i].authDate,
        entrada: fichadas[i].authTime,
        salida: fichadas[i + 1]?.authTime,
        total: { horas: horasTrabajadas, minutos: minutosTrabajados },
      };
    }

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

  const descargar = async () => {
    axios
      .post(
        "https:///elfenixpanaderia.com/exportar",
        {
          fichadas: totalHorasPorDia,
        },
        { responseType: "blob" }
      )
      .then((response) => {
        // Crear un objeto URL a partir de los datos recibidos
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${usuario?.nombre}_horas.xlsx`);
        document.body.appendChild(link);

        // Hacer clic en el enlace para iniciar la descarga
        link.click();

        // Limpiar el objeto URL y eliminar el enlace temporal
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
      });
  };
  //@ts-ignore
  const calcularTotalHorasTotales = (horasPorDia) => {
    //@ts-ignore
    const totalHorasEnMinutos = horasPorDia.reduce((totalMinutos, entry) => {
      return totalMinutos + entry.total.horas * 60 + entry.total.minutos;
    }, 0);

    const totalHoras = Math.floor(totalHorasEnMinutos / 60);
    const totalMinutos = totalHorasEnMinutos % 60;

    return `${totalHoras}:${totalMinutos}Hs`;
  };

  const totalHorasPorDia =
    usuario?.es_nocturno === "1"
      ? totalHorasPorNoche()
      : calcularTotalHorasPorDia();

  const totalHorasTotales = calcularTotalHorasTotales(totalHorasPorDia);

  return (
    <>
      <Header>
        <Head>
          <title>Fichadas | El Fenix</title>
          <meta name="description" content="Fichadas | El Fenix" />
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
                      src={`https://appspuntaltenses.com/elfenix/${usuario?.foto}`}
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
                          {usuario?.nombre}
                        </Heading>
                        <Text color={"gray.500"}>
                          {usuario?.grupo !== "" ? usuario?.grupo : "Sin Grupo"}
                        </Text>
                      </Stack>
                      <Stack direction={"row"} justify={"center"} spacing={6}>
                        <Stack spacing={0} align={"center"}>
                          <Text fontWeight={600}>
                            {usuario?.legajo_contadora}
                          </Text>
                          <Text fontSize={"sm"} color={"gray.500"}>
                            Legajo
                          </Text>
                        </Stack>
                        {usuario?.es_repartidor === "1" && (
                          <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>
                              <Icon as={FiTruck} />
                            </Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                              Repartidor
                            </Text>
                          </Stack>
                        )}
                        {usuario?.es_nocturno === "1" && (
                          <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>
                              <Icon as={FiMoon} />
                            </Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                              Nocturno
                            </Text>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Flex>

                  <Button
                    w={"full"}
                    mt={2}
                    onClick={descargar}
                    bg={colorbutton}
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    {totalHorasTotales}
                  </Button>
                </Box>
              </Center>
              <Card minH="83px">
                <CardBody>
                  <Tabs isFitted variant="soft-rounded">
                    <TabList mb="1em">
                      <Tab>Fichadas</Tab>
                      <Tab>Por día</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <CardTableFichadas
                          title="Fichadas"
                          type="Productos"
                          list={fichadas}
                        />
                      </TabPanel>
                      <TabPanel>
                        <CardTablePorDia
                          title="Por día"
                          type="Productos"
                          list={totalHorasPorDia}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
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
