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
import { proyeccionGet } from "@component/store/proyeccionSlice";

const ModalVentasAdd = ({ sucursal, onClose }: any) => {
  const [venta, setVenta] = useState(""); // Estado para el campo "venta"
  const [itbms, setItbms] = useState(""); // Estado para el campo "venta"

  const [periodoInicio, setPeriodoInicio] = useState(""); // Estado para el campo "periodo_inicio"
  const [periodoFinal, setPeriodoFinal] = useState(""); // Estado para el campo "periodo_final"

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = () => {
    const formData = new FormData();
    //@ts-ignore
    console.log(sucursal);
    formData.append("venta", venta); // Agrega "venta" al FormData
    formData.append("itbms", itbms); // Agrega "venta" al FormData

    formData.append("periodo_inicio", periodoInicio); // Agrega "periodo_inicio" al FormData
    formData.append("periodo_final", periodoFinal); // Agrega "periodo_final" al FormData
    formData.append("id_sucursal", sucursal.id_sucursal); // Agrega "periodo_final" al FormData
    formData.append("nombre_sucursal", sucursal.nombre_sucursal); // Agrega "periodo_final" al FormData

    axios
      .post("https://tamitut.com/PAYA/facturas/ventas_editar_api.php", formData)
      .then((data) => {
        dispatch(proyeccionGet({}));
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
        Agregar Ventas
      </Heading>

      <FormControl id="venta" isRequired>
        <FormLabel>Venta Neta</FormLabel>
        <Input
          placeholder="Ingresa la venta con ITBMS incluido"
          _placeholder={{ color: "gray.500" }}
          type="number"
          onChange={(event) => setVenta(event.target.value)}
        />
      </FormControl>
      <FormControl id="venta" isRequired>
        <FormLabel>ITBMS</FormLabel>
        <Input
          placeholder="Ingresa el valor de ITBMS de esta venta"
          _placeholder={{ color: "gray.500" }}
          type="number"
          onChange={(event) => setItbms(event.target.value)}
        />
      </FormControl>
      <FormControl id="periodo_inicio" isRequired>
        <FormLabel>Periodo de inicio</FormLabel>
        <Input
          type="date"
          onChange={(event) => setPeriodoInicio(event.target.value)}
        />
      </FormControl>
      <FormControl id="periodo_final" isRequired>
        <FormLabel>Periodo de finalización</FormLabel>
        <Input
          type="date"
          onChange={(event) => setPeriodoFinal(event.target.value)}
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

export default ModalVentasAdd;
