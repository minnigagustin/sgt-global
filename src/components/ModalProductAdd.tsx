import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Switch,
  Select,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";

const ModalProductAdd = ({ product, onClose }: any) => {
  const fileInputRef = useRef(null);
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState(0);
  const [reparto, setReparto] = useState("");
  const [tipo, setTipo] = useState("");
  const [unidad, setUnidad] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const [file, setFile] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
  );

  const [fileimage, setFileImage] = useState(null);

  const handleButtonClick = () => {
    //@ts-ignore
    fileInputRef?.current?.click();
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    // Aquí puedes realizar acciones con el archivo seleccionado
    console.log("Archivo seleccionado:", file);
    const fileUrl = URL.createObjectURL(file);
    // Asignar la URL al atributo src del Avatar
    console.log(fileUrl);
    setFile(fileUrl);
    setFileImage(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    //@ts-ignore
    //@ts-ignore
    formData.append("nombre", producto);
    //@ts-ignore
    formData.append("unidad", unidad);
    formData.append("categoria", tipo);
    //@ts-ignore
    formData.append("precio", precio);

    axios
      .post(
        "https://tamitut.com/PAYA/facturas/productos_editar_api.php",
        formData
      )
      .then((data) => {
        dispatch(productosGet());
        console.log(data);
        onClose();
      })
      .catch((error) => {
        console.error(error);
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

      <FormControl id="userName" isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre producto"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={producto}
          onChange={(event) => setProducto(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Precio</FormLabel>
        <Input
          placeholder="Precio del producto"
          _placeholder={{ color: "gray.500" }}
          type="number"
          value={precio}
          onChange={(event) => setPrecio(Number(event.target.value))}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Tipo</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setUnidad(event.target.value)}
          value={unidad}
        >
          <option value="onzas">Onzas</option>
          <option value="unidad">Unidad</option>
          {/* <option value="operacionales" selected={tipo === "operacionales"}>
            Gastos Operacionales
          </option> */}
        </Select>
      </FormControl>

      <FormControl id="email">
        <FormLabel>Categoria</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setTipo(event.target.value)}
          value={tipo}
        >
          <option value="insumo">Insumos</option>
          <option value="operacionales" selected={tipo === "operacionales"}>
            Gastos Operacionales
          </option>
          *
        </Select>
      </FormControl>

      <Stack spacing={6} direction={["column", "row"]}>
        <Button
          onClick={onClose}
          bg={"red.400"}
          color={"white"}
          w="full"
          _hover={{
            bg: "red.500",
          }}
        >
          Cancelar
        </Button>
        <Button
          bg={"blue.400"}
          onClick={handleSubmit}
          color={"white"}
          w="full"
          _hover={{
            bg: "blue.500",
          }}
        >
          Agregar
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalProductAdd;
