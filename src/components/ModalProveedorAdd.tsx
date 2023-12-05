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
import { comerciosGet } from "@component/store/inicioSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";
import { proveedoresGet } from "@component/store/proveedoresSlice";

const ModalProveedorAdd = ({ product, onClose }: any) => {
  const fileInputRef = useRef(null);
  const [nombre, SetNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [cuit, setCuit] = useState("");

  const [celular, setCelular] = useState("");
  const [tipo, setTipo] = useState("");
  const [RUC, setRUC] = useState("");
  const [DV, setDV] = useState("");
  const [API, setAPI] = useState("");

  const { zonas } = useSelector((resp: any) => resp.inicio);

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
    formData.append("image", fileimage);
    //@ts-ignore
    formData.append("nombre", nombre); // Agrega el nombre al FormData

    formData.append("categoria", tipo); // Agrega el grupo al FormData
    formData.append("RUC", RUC); // Agrega el grupo al FormData
    formData.append("DV", DV); // Agrega el grupo al FormData
    formData.append("API", API); // Agrega el grupo al FormData

    axios
      .post(
        "https://tamitut.com/PAYA/facturas/proveedores_editar_api.php",
        formData
      )
      .then((data) => {
        dispatch(proveedoresGet());
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
        Agregar Proveedor
      </Heading>
      <FormControl id="userName" isRequired>
        <FormLabel>Logo</FormLabel>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar size="xl" />
          </Center>
          <Center w="full">
            <Button w="full" onClick={handleButtonClick}>
              Cambiar foto
            </Button>
          </Center>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
        </Stack>
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre fantasia"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(event) => SetNombre(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>RUC</FormLabel>
        <Input
          placeholder="RUC"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={RUC}
          onChange={(event) => setRUC(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>dv</FormLabel>
        <Input
          placeholder="DV"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={DV}
          onChange={(event) => setDV(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Api</FormLabel>
        <Input
          placeholder="Endpoint escaner"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={API}
          onChange={(event) => setAPI(event.target.value)}
        />
      </FormControl>

      <FormControl id="email">
        <FormLabel>Tipo</FormLabel>
        <Select onChange={(event) => setTipo(event.target.value)}>
          <option value={""}>Selecciona el tipo</option>

          <option value={"insumos"}>Insumos</option>
          <option value={"operacionales"}>Gastos Operacionales</option>
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

export default ModalProveedorAdd;
