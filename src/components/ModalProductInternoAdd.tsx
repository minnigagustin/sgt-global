import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";
import { AxiosUrl } from "@component/configs/AxiosConfig";

const ModalProductInternoAdd = ({ onClose }: any) => {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [inventario, setInventario] = useState(0);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = () => {
    const data = {
      nombre: producto,
      precio: precio.toString(), // En PHP precio es varchar
      inventario: parseInt(inventario.toString()),
    };

    AxiosUrl.post("productos_internos_api.php", data)
      .then((response) => {
        console.log("Producto agregado:", response.data);
        dispatch(productosGet());
        onClose();
      })
      .catch((error) => {
        console.error("Error al agregar producto:", error);
      });
  };

  return (
    <Stack
      spacing={4}
      w={"full"}
      maxW={"md"}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
    >
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        Agregar Producto
      </Heading>

      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre del producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Precio</FormLabel>
        <Input
          placeholder="Precio"
          type="text"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Inventario</FormLabel>
        <Input
          placeholder="Cantidad en inventario"
          type="number"
          value={inventario}
          onChange={(e) => setInventario(parseInt(e.target.value))}
        />
      </FormControl>

      <Stack spacing={6} direction={["column", "row"]}>
        <Button
          onClick={onClose}
          bg={"red.400"}
          color={"white"}
          w="full"
          _hover={{ bg: "red.500" }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          bg={"blue.400"}
          color={"white"}
          w="full"
          _hover={{ bg: "blue.500" }}
        >
          Agregar
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalProductInternoAdd;
