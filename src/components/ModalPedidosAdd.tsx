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
import { DeliveryGet } from "@component/store/inicioSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";

const ModalPedidosAdd = ({ product, onClose }: any) => {
  const fileInputRef = useRef(null);
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");
  const [reparto, setReparto] = useState("");
  const [sucursal, setSucursal] = useState("Mitre");

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
    console.log(sucursal);
    axios
      .post("https://backpackpuntaalta.ar:8443/mussinipedido/", {
        direccion: direccion,
        precio: precio,
        sucursal: sucursal,
      })
      .then((data) => {
        dispatch(DeliveryGet());
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
        Pedir Delivery | BackPack
      </Heading>

      <FormControl isRequired>
        <FormLabel>Direccion</FormLabel>
        <Input
          placeholder="Direccion de la casa"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={direccion}
          onChange={(event) => setDireccion(event.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Precio Efectivo</FormLabel>
        <Input
          _placeholder={{ color: "gray.500" }}
          type="number"
          placeholder="Precio Efectivo"
          value={precio}
          onChange={(event) => setPrecio(event.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Sucursal</FormLabel>
        <Select
          onChange={(event) => setSucursal(event.target.value)}
          value={sucursal}
        >
          <option value="Mitre">Mitre</option>
          <option value="Pellegrini">Pellegrini</option>
          <option value="Passo">Passo</option>
        </Select>
      </FormControl>
      <h2>Envio: $300</h2>
      {precio && <h2>Total: ${Number(precio) + 300}</h2>}
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
          Pedir
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalPedidosAdd;
