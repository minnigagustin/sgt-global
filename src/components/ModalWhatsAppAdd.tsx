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
  Textarea,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";

const ModalWhatsAppAdd = ({ product, onClose }: any) => {
  const fileInputRef = useRef(null);
  const [texto, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

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
    axios
      .post("https://backpackpuntaalta.ar:8443/mensajegrupo", {
        celular: tipo,
        texto: texto,
      })
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
        Enviar WhatsApp
      </Heading>

      <FormControl id="userName" isRequired>
        <FormLabel>Producto</FormLabel>
        <Textarea
          value={texto}
          placeholder="Aqui va el mensaje...."
          _placeholder={{ color: "gray.500" }}
          size="sm"
          onChange={(event) => setMensaje(event.target.value)}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Grupo</FormLabel>
        <Select onChange={(event) => setTipo(event.target.value)} value={tipo}>
          <option value="5492932578332@c.us">Agustin</option>
          <option value="5492932457622-1559155405@g.us">
            Panaderia {process.env.NAME_COMMERCE}
          </option>
          <option value="5492932539480-1563321754@g.us">Mostrador</option>
          <option value="5492964617074-1552945300@g.us">Reparto 🚛</option>
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
          bg={"green.400"}
          onClick={handleSubmit}
          color={"white"}
          w="full"
          _hover={{
            bg: "green.500",
          }}
        >
          Enviar {">"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalWhatsAppAdd;
