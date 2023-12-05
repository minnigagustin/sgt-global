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
import { FiCamera, FiList, FiMoon, FiTrello, FiTruck } from "react-icons/fi";
import ButtonFacturacion from "./ButtonFacturacion";
import ButtonEscaner from "./ButtonEscaner";

export default function CardProveedoresEscaner({ item, key, onOpen }: any) {
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
        minH="300px" // Establece una altura mínima para igualar el tamaño
      >
        <Box p={6}>
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
          </Stack>
          <Divider />
          <Button
            w={"full"}
            onClick={() => onOpen(item)}
            loadingText="Cargando..."
            bg={useColorModeValue("#f6ae3e", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Icon as={FiCamera} mr={2} />
            Escanear
          </Button>{" "}
        </Box>
      </Box>
    </Center>
  );
}
