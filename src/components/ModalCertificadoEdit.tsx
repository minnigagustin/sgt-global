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
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { proveedoresGet } from "@component/store/proveedoresSlice";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { usuariosGet } from "@component/store/usuariosSlice";
import { certificadosGet } from "@component/store/certificadosSlice";

const ModalCertificadoEdit = ({ person, onClose }: any) => {
  const fileInputRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const [file, setFile] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
  );
  const [show, setShow] = useState(false);
  const { sucursales } = useSelector((resp: any) => resp.sucursales);

  const [fileimage, setFileImage] = useState(null);
  const [usuario, setUsuario] = useState(person?.usuario);
  const [id, setId] = useState(person?.id);
  const [password, setPassword] = useState(person?.password);
  const [sucursal, setSucursal] = useState(person?.sucursal);
  const [cargo, setCargo] = useState(person?.cargo);
  const [nombre, setNombre] = useState(person?.nombre);
  const [apellido, setApellido] = useState(person?.apellido);

  const [nacimiento, setNacimiento] = useState(person?.fecha_nacimiento);
  const [numero, setNumero] = useState(person?.numero);
  const [monto, setMonto] = useState(person?.monto);
  const [estado, setEstado] = useState(person?.estado);
  const [cliente, setCliente] = useState(person?.usuario);

  const [condicion_contrato, setCondicion] = useState(
    person?.condicion_contrato
  );

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
    formData.append("numero", numero); // Agrega el nombre al FormData
    formData.append("monto", monto); // Agrega el nombre al FormData
    formData.append("sucursal", sucursal); // Agrega el nombre al FormData
    formData.append("cliente", cliente); // Agrega el nombre al FormData
    formData.append("estado", estado); // Agrega el nombre al FormData

    formData.append("id", id); // Agrega el nombre al FormData
    axios
      .post(
        "https://tamitut.com/PAYA/facturas/certificados_editar_api.php",
        formData
      )
      .then((data) => {
        console.log(data);
        dispatch(certificadosGet());
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
        Editar: {person?.usuario}
      </Heading>
      <FormControl id="userName" isRequired>
        <FormLabel>Numero</FormLabel>
        <Input
          placeholder="Numero"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={numero}
          onChange={(event) => setNumero(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Monto</FormLabel>
        <Input
          placeholder="Monto"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={monto}
          onChange={(event) => setMonto(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Estado</FormLabel>
        <Input
          placeholder="Estado"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={estado}
          onChange={(event) => setEstado(event.target.value)}
        />
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Sucursal</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setSucursal(event.target.value)}
        >
          {sucursales?.map((item: any, key: any) => (
            <option
              value={item.nombre}
              selected={sucursal === item.nombre}
              key={key}
            >
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
          value={cliente}
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
          Guardar
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalCertificadoEdit;
