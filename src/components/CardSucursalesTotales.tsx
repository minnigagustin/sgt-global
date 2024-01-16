import {
  Heading,
  Box,
  Center,
  Image,
  Text,
  Stack,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function CardSucursalesTotales({ item, key, onHandle }: any) {
  const totalVentas = parseFloat(item.total_ventas);
  const totalOperacional = parseFloat(item.total_operacional);
  const totalInsumos = parseFloat(item.total_insumos);
  const totalNomina = parseFloat(item.total_nomina);
  const totalItbms = parseFloat(item.total_itbms);

  // Calcular los porcentajes en relación con las ventas
  const ventasPorcentaje = totalVentas === 0 ? 100 : 100;
  const operacionalPorcentaje =
    totalVentas === 0 ? 0 : ((totalOperacional / totalVentas) * 100).toFixed(2);
  const insumosPorcentaje =
    totalVentas === 0 ? 0 : ((totalInsumos / totalVentas) * 100).toFixed(2);
  const nominaPorcentaje =
    totalVentas === 0 ? 0 : ((totalNomina / totalVentas) * 100).toFixed(2);

  const gananciaBruta =
    totalVentas - (totalInsumos + totalOperacional + totalNomina);

  const ingresosTotales =
    totalVentas + totalInsumos + totalOperacional + totalNomina;
  const utilidadAntesImpuestosPorcentaje = (
    (gananciaBruta / ingresosTotales) *
    100
  ).toFixed(2);

  return (
    <Center py={6} key={key}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Image
              boxSize={"100px"}
              objectFit={
                item.logo === "images/blanco.png" ? "contain" : "cover"
              }
              src={"/nacion-new-logo.png"}
              borderRadius="2xl"
              css={{
                border: "2px solid white",
                filter: "grayscale(100%)",
              }}
            />
            <Heading
              fontSize={"lg"}
              fontWeight={600}
              fontFamily={"body"}
              mt={4}
            >
              {item.nombre_sucursal}
            </Heading>
            <Heading
              fontSize={"3xl"}
              fontWeight={"bold"}
              fontFamily={"body"}
              color={"green"}
              mt={2}
            >
              ${totalVentas.toFixed(2)}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              Ventas ({ventasPorcentaje}%)
            </Text>
            <Heading
              fontSize={"3xl"}
              fontWeight={"bold"}
              fontFamily={"body"}
              color={"orange"}
              mt={2}
            >
              ${totalItbms.toFixed(2)}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              ITBMS
            </Text>
            <Heading
              fontSize={"3xl"}
              fontWeight={"bold"}
              fontFamily={"body"}
              color={"#ef4b80"}
              mt={2}
            >
              ${totalOperacional.toFixed(2)}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              Gastos Operativos ({operacionalPorcentaje}%)
            </Text>
            <Heading
              fontSize={"3xl"}
              fontWeight={"bold"}
              fontFamily={"body"}
              color={"#ef4b80"}
              mt={2}
            >
              ${totalInsumos.toFixed(2)}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              Costo de Ventas ({insumosPorcentaje}%)
            </Text>
            <Heading
              fontSize={"3xl"}
              fontWeight={"bold"}
              fontFamily={"body"}
              color={"#ef4b80"}
              mt={2}
            >
              ${totalNomina.toFixed(2)}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              Gastos de Nomina ({nominaPorcentaje}%)
            </Text>
          </Stack>
          <Divider />
          <Stack spacing={0} align={"center"}>
            <Heading
              fontSize={"3xl"}
              fontWeight={"bold"}
              fontFamily={"body"}
              color={"#ef4b80"}
              mt={2}
            >
              ${gananciaBruta.toFixed(2)}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              Utilidad antes de impuestos ({utilidadAntesImpuestosPorcentaje}%)
            </Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
