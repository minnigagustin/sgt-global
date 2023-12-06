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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { proveedoresGet } from "@component/store/proveedoresSlice";
import { AxiosUrl } from "@component/configs/AxiosConfig";

const ModalProveedorEdit = ({ person, onClose }: any) => {
  const fileInputRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const [file, setFile] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
  );
  const [show, setShow] = useState(false);

  const [fileimage, setFileImage] = useState(null);
  const [nombre, setNombre] = useState(person?.nombre);
  const [id, setId] = useState(person?.id);
  const [password, setPassword] = useState(person?.password);

  const [legajocontadora, setLegajoContadora] = useState(
    person?.legajo_contadora
  );
  const [tipo, setTipo] = useState(person?.categoria);
  const [DV, setDV] = useState(person?.dv);
  const [RUC, setRUC] = useState(person?.ruc);
  const [API, setAPI] = useState(person?.api);

  const [nacimiento, setNacimiento] = useState(person?.fecha_nacimiento);
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
    formData.append("image", fileimage);
    //@ts-ignore
    formData.append("nombre", nombre); // Agrega el nombre al FormData
    formData.append("id", id); // Agrega el nombre al FormData

    formData.append("categoria", tipo); // Agrega el grupo al FormData
    formData.append("RUC", RUC); // Agrega el grupo al FormData
    formData.append("DV", DV); // Agrega el grupo al FormData
    formData.append("API", API); // Agrega el grupo al FormData
    AxiosUrl
      .post(
        "proveedores_editar_api.php",
        formData
      )
      .then((data) => {
        console.log(data);
        dispatch(proveedoresGet());
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
        Editar: {person?.nombre}
      </Heading>
      <FormControl id="userName">
        <FormLabel>Logo</FormLabel>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar
              size="xl"
              src={`https://tamitut.com/PAYA/facturas/${person?.logo}`}
            />
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
          placeholder="UserName"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
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
      <FormControl id="grupo">
        <FormLabel>Tipo</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setTipo(event.target.value)}
        >
          <option value="insumo" selected={tipo === "insumo"}>
            Insumos
          </option>
          <option value="operacionales" selected={tipo === "operacionales"}>
            Gastos Operacionales
          </option>
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
          Guardar
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalProveedorEdit;
