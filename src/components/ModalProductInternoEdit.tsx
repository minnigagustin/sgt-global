import {
  Button,
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

const ModalProductInternoEdit = ({ person, onClose }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const [nombre, setNombre] = useState(person?.nombre || "");
  const [id, setId] = useState(person?.id);
  const [precio, setPrecio] = useState(person?.precio || "");
  const [inventario, setInventario] = useState(person?.inventario || 0);

  const handleSubmit = () => {
    if (!id) return;

    const data = {
      id: id,
      nombre: nombre,
      precio: precio.toString(), // precio es VARCHAR en PHP
      inventario: parseInt(inventario.toString()),
    };

    axios
      .patch("productos_internos_api.php", new URLSearchParams(data))
      .then((response) => {
        console.log("Actualizado:", response.data);
        dispatch(productosGet());
        onClose();
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
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
        Editar: {person?.nombre}
      </Heading>

      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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
          placeholder="Inventario"
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
          bg={"blue.400"}
          onClick={handleSubmit}
          color={"white"}
          w="full"
          _hover={{ bg: "blue.500" }}
        >
          Guardar
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalProductInternoEdit;
