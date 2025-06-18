import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";
import { AxiosUrl } from "@component/configs/AxiosConfig";

const ModalProductInternoEdit = ({ product, onClose }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const [nombre, setNombre] = useState(product?.nombre || "");
  const [id, setId] = useState(product?.id);
  const [precio, setPrecio] = useState(product?.precio || "");
  const [inventario, setInventario] = useState(product?.inventario || 0);

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!id) return;

    setIsLoading(true);

    const data = {
      id: id,
      nombre: nombre,
      precio: precio.toString(),
      inventario: parseInt(inventario.toString()),
    };

    AxiosUrl.post("productos_internos_api.php", {
      id, // si hay ID, se actualiza
      nombre,
      precio: precio.toString(),
      inventario: parseInt(inventario.toString()),
    })
      .then((response) => {
        dispatch(productosGet());
        toast({
          title: "Producto actualizado.",
          description: `“${nombre}” fue modificado correctamente.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: "Error al actualizar.",
          description: "No se pudo modificar el producto.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error al actualizar:", error);
      })
      .finally(() => {
        setIsLoading(false);
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
        Editar: {product?.nombre}
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
          isLoading={isLoading}
          loadingText="Guardando"
        >
          Guardar
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalProductInternoEdit;
