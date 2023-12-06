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
import { certificadosGet } from "@component/store/certificadosSlice";
import { AxiosUrl } from "@component/configs/AxiosConfig";

const ModalCertificadoAdd = ({ product, onClose }: any) => {
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
  const [numero, setNumero] = useState("");
  const [monto, setMonto] = useState("");
  const [cliente, setCliente] = useState("");
  const [estado, setEstado] = useState("");

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
    formData.append("numero", numero); // Agrega el nombre al FormData
    formData.append("monto", monto); // Agrega el nombre al FormData
    formData.append("sucursal", sucursal); // Agrega el nombre al FormData
    formData.append("cliente", cliente); // Agrega el nombre al FormData
    formData.append("estado", estado); // Agrega el nombre al FormData

    AxiosUrl
      .post(
        "certificados_editar_api.php",
        formData
      )
      .then((data) => {
        dispatch(certificadosGet());
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
        Agregar Certificado
      </Heading>

      <FormControl id="userName" isRequired>
        <FormLabel>Numero</FormLabel>
        <Input
          placeholder="Numero"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(event) => setNumero(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Monto</FormLabel>
        <Input
          placeholder="Monto"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(event) => setNombre(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Estado</FormLabel>

        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setEstado(event.target.value)}
        >
          <option value={"DISPONIBLE"}>Disponible</option>
          <option value={"USADO"}>Usado</option>
        </Select>
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
        <FormLabel>Cliente</FormLabel>
        <Input
          placeholder="Cliente"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(event) => setCliente(event.target.value)}
        />
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

export default ModalCertificadoAdd;
