import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  Icon,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FiDollarSign,
  FiList,
  FiMoon,
  FiTrello,
  FiTruck,
} from "react-icons/fi";
import ButtonFacturacion from "./ButtonFacturacion";
import ButtonHistorial from "./ButtonHistorial";

export default function CardSucursalesVentas({ item, key, onOpen }: any) {
  const router = useRouter();

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
          {" "}
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
              ${item.total_ventas}
            </Heading>
            <Text fontSize={"sm"} color={"gray.500"}>
              Ventas
            </Text>
          </Stack>
          <Divider />
          <Stack spacing={4} align={"center"}>
            <Button
              w={"full"}
              loadingText="Cargando..."
              onClick={() => onOpen(item)}
              bg={useColorModeValue("#f6ae3e", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              <Icon as={FiDollarSign} mr={2} />
              Agregar Ventas
            </Button>
            <ButtonHistorial item={item} />
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
