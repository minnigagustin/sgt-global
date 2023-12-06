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
import { facturasGet } from "@component/store/facturacionSlice";
import { AxiosUrl } from "@component/configs/AxiosConfig";
const ModalPrevisualizar = ({
  data,
  fecha,
  sucursal,
  onClose,
  onCloseEntero,
}: any) => {
  const fileInputRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  // Calcular el total de la factura
  //@ts-ignore
  const totalFactura = data.reduce((total, item) => {
    // Parsear los valores a números para asegurar la suma correcta
    const cantidad = parseFloat(item.cantidad);
    const precio = parseFloat(item.precio);
    const totalItem = parseFloat(item.total);

    // Sumar al total actual
    return (
      total +
      (isNaN(cantidad) || isNaN(precio) || isNaN(totalItem) ? 0 : totalItem)
    );
  }, 0);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("fecha", fecha);
    formData.append("sucursal", sucursal);
    formData.append("data", JSON.stringify(data));
    console.log("La fecha: " + fecha);
    console.log("La sucursal: " + sucursal);

    console.log("Los datos que se enviaran: " + JSON.stringify(formData));

    // Display the values
    //@ts-ignore
    for (var value of formData.values()) {
      console.log("iterando: " + value);
    }

    AxiosUrl
      .post(
        "facturas_editar_api.php",
        formData
      )
      .then((data) => {
        const facturaId = data.data.factura_id; // Obtiene el ID de factura de la respuesta

        // Construye la URL con el ID de factura
        const url = `https://tamitut.com/PAYA/facturas/cotizacionPDF.php?id=${facturaId}`;

        // Abre una nueva ventana en blanco con la URL
        window.open(url, "_blank");

        dispatch(facturasGet());
        console.log(data);
        onClose();
        onCloseEntero();
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
        Previsualización de factura
      </Heading>

      {
        //@ts-ignore
        data.map((item, index) => (
          <div key={index}>
            <p>{`Descripción: ${item.label}`}</p>
            <p>{`Cantidad: ${item.cantidad}`}</p>
            <p>{`Precio: ${item.precio}`}</p>
            <p>{`Total: ${item.total}`}</p>
            <hr />
          </div>
        ))
      }

      <p>
        Total Factura:{" "}
        {isNaN(totalFactura) ? "Error en cálculo" : `$${totalFactura}`}
      </p>

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
          onClick={handleSubmit}
          bg={"blue.400"}
          color={"white"}
          w="full"
          _hover={{
            bg: "blue.500",
          }}
        >
          Crear
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalPrevisualizar;
