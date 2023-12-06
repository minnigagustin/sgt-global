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
import { productosGet } from "@component/store/productosSlice";
import moment from "moment";
import { ventasGet } from "@component/store/proyeccionSlice";
import { AxiosUrl } from "@component/configs/AxiosConfig";

const ModalVentaEdit = ({ venta, onClose }: any) => {
  const fileInputRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const [file, setFile] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
  );
  const [show, setShow] = useState(false);

  const [fileimage, setFileImage] = useState(null);
  const [monto, setMonto] = useState(venta?.venta);
  const [id, setId] = useState(venta?.id);

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
    formData.append("monto", monto); // Agrega el nombre al FormData
    console.log(monto, 'el nuevo monto')
    formData.append("id", id); // Agrega el nombre al FormData

    AxiosUrl
      .post(
        "venta_editar_api.php",
        formData
      )
      .then((data) => {
        console.log(data);
        dispatch(ventasGet({ id_sucursal: venta?.id_sucursal }));
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
        Editar: {moment(venta.periodo_inicio).format("DD/MM/YY")} al {moment(venta.periodo_fin).format("DD/MM/YY")}
      </Heading>

      <FormControl id="userName" isRequired>
        <FormLabel>Monto</FormLabel>
        <Input
          placeholder="2000"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={monto}
          onChange={(event) => setMonto(event.target.value)}
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

export default ModalVentaEdit;
