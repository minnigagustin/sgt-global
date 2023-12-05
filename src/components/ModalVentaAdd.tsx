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

const ModalVentaAdd = ({ comercio, onClose }: any) => {
  const fileInputRef = useRef(null);
  const [nombre, setNombre] = useState(comercio?.comercio);
  const [direccion, setDireccion] = useState(comercio?.direccion);
  const [celular, setCelular] = useState(comercio?.celular);
  const [cuit, setCuit] = useState(comercio?.cuit);

  const [id, setId] = useState(comercio?.id);
  const [tipo, setTipo] = useState(comercio?.zona);
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
    formData.append("id_sucursal", nombre);
    //@ts-ignore
    formData.append("venta", celular);
    formData.append("periodo_inicio", cuit);
    formData.append("periodo_final", cuit);

    axios
      .post(
        "https://appspuntaltenses.com/losmussini/editarcomercio.php",
        formData
      )
      .then((data) => {
        dispatch(comerciosGet());
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
        Editar: {comercio.comercio}
      </Heading>

      <FormControl id="userName">
        <FormLabel>Foto de perfil</FormLabel>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar size="xl" src={`${comercio.fondo}`}>
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
            </Avatar>
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
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre producto"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
      </FormControl>
      <FormControl id="grupo">
        <FormLabel>Direccion</FormLabel>
        <Input
          placeholder="Sarmiento 343"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={direccion}
          onChange={(event) => setDireccion(event.target.value)}
        />
      </FormControl>
      <FormControl id="grupo">
        <FormLabel>CUIT</FormLabel>
        <Input
          placeholder="20.44.082.259.3"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={cuit}
          onChange={(event) => setCuit(event.target.value)}
        />
      </FormControl>
      <FormControl id="grupo">
        <FormLabel>Celular</FormLabel>
        <Input
          placeholder="29325783..."
          _placeholder={{ color: "gray.500" }}
          type="number"
          value={celular}
          onChange={(event) => setCelular(event.target.value)}
        />
      </FormControl>

      <FormControl id="email">
        <FormLabel>Zona</FormLabel>
        <Select onChange={(event) => setTipo(event.target.value)} value={tipo}>
          {zonas?.map((item: any, key: any) => (
            <option value={item.id} key={key}>
              {item.nombre}
            </option>
          ))}
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

export default ModalVentaAdd;
