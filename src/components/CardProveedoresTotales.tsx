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
import { FiList, FiMoon, FiTrello, FiTruck } from "react-icons/fi";
import ButtonFacturacion from "./ButtonFacturacion";

export default function CardProveedoresTotales({ item, key, onHandle }: any) {
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
        minH="340px" // Establece una altura mínima para igualar el tamaño
      >
        <Box p={6}>
          {" "}
          <Stack spacing={0} align={"center"} mb={5}>
            <Image
              boxSize={"100px"}
              objectFit={
                item.logo === "images/blanco.png" ? "contain" : "cover"
              }
              src={
                item.logo === "images/blanco.png"
                  ? "/nacion-new-logo.png"
                  : `https://tamitut.com/PAYA/facturas/${item.logo}`
              }
              borderRadius="2xl"
              css={{
                border: "2px solid white",
                filter:
                  item.logo === "images/blanco.png"
                    ? "grayscale(100%)"
                    : "none",
              }}
            />
            <Heading
              fontSize={"lg"}
              fontWeight={600}
              fontFamily={"body"}
              mt={4}
            >
              {item.nombre}
            </Heading>
            <Heading
              fontSize={"3xl"}
              fontWeight={"bold"}
              fontFamily={"body"}
              color={"#ef4b80"}
              mt={2}
            >
              ${item.total.toFixed(2)}
            </Heading>
          </Stack>
          <Divider />
          <ButtonFacturacion item={item} />
        </Box>
      </Box>
    </Center>
  );
}
