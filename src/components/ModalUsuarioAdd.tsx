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
  InputGroup,
  InputRightElement,
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
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { usuariosGet } from "@component/store/usuariosSlice";

const ModalUsuarioAdd = ({ product, onClose }: any) => {
  const fileInputRef = useRef(null);
  const [direccion, setDireccion] = useState("");
  const [cuit, setCuit] = useState("");

  const [celular, setCelular] = useState("");
  const [tipo, setTipo] = useState("");
  const [token, setToken] = useState("");
  const [alias, setAlias] = useState("");
  const [API, setAPI] = useState("");
  const [show, setShow] = useState(false);
  const { sucursales } = useSelector((resp: any) => resp.sucursales);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [cargo, setCargo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

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
    //@ts-ignore
    formData.append("usuario", usuario); // Agrega el nombre al FormData
    formData.append("password", password); // Agrega el nombre al FormData
    formData.append("sucursal", sucursal); // Agrega el nombre al FormData
    formData.append("cargo", cargo); // Agrega el nombre al FormData
    formData.append("nombre", nombre); // Agrega el nombre al FormData
    formData.append("apellido", apellido); // Agrega el nombre al FormData
    axios
      .post(
        "https://tamitut.com/PAYA/facturas/usuarios_editar_api.php",
        formData
      )
      .then((data) => {
        dispatch(usuariosGet());
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
        Agregar Usuario
      </Heading>

      <FormControl id="userName" isRequired>
        <FormLabel>Usuario</FormLabel>
        <Input
          placeholder="UserName"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(event) => setUsuario(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(event) => setNombre(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Apellido</FormLabel>
        <Input
          placeholder="Apellido"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(event) => setApellido(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Sucursal</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setSucursal(event.target.value)}
        >
          {sucursales?.map((item: any, key: any) => (
            <option value={item.nombre} key={key}>
              {item.nombre}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="userName" isRequired>
        <FormLabel>Cargo</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setCargo(event.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="colaborador">colaborador</option>
          <option value="franquicia">Franquicia</option>
        </Select>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Contraseña</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Ocultar" : "Ver"}
            </Button>
          </InputRightElement>
        </InputGroup>
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

export default ModalUsuarioAdd;
