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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiMoon, FiTruck } from "react-icons/fi";

export default function CardComercioEdit({ item, key, onHandle }: any) {
  const router = useRouter();

  return (
    <Center py={6} key={key}>
      <Box
        maxW={"280px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={"panaderia.jpeg"}
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={`${item.fondo}`}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {item.comercio}
            </Heading>
            <Text color={"gray.500"}>
              {item.zona_nombre !== ""
                ? `Zona ${item.zona_nombre}`
                : "Sin zona"}
            </Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{item.direccion}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Direccion
              </Text>
            </Stack>
            {item.es_repartidor === "1" && (
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>
                  <Icon as={FiTruck} />
                </Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Repartidor
                </Text>
              </Stack>
            )}
            {item.es_nocturno === "1" && (
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

          <Button
            w={"full"}
            onClick={() => onHandle(item)}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Editar {">"}
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
