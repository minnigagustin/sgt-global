import {
  Button,
  Box,
  Divider,
  AbsoluteCenter,
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
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { comerciosGet } from "@component/store/inicioSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";
import { facturasGet } from "@component/store/facturacionSlice";
import { proveedoresGet } from "@component/store/proveedoresSlice";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { FiEye } from "react-icons/fi";
import ModalPrevisualizar from "./ModalPrevisualizar";
import { AxiosUrl } from "@component/configs/AxiosConfig";
import InputManual from "./InputManual";

const ModalManualAdd = ({ product, onClose }: any) => {
  const [nombre, SetNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [factura, setFactura] = useState("");
  const [ruc, setRuc] = useState("");

  const [sucursal, setSucursal] = useState("");
  const formRef = useRef(null);
  const [previewData, setPreviewData] = useState([]);

  const {
    isOpen: isOpenPre,
    onOpen: onOpenPre,
    onClose: onClosePre,
  } = useDisclosure();
  const { sucursales } = useSelector((resp: any) => resp.sucursales);
  const dispatch: AppDispatch = useDispatch();

  const [formValues, setFormValues] = useState([
    {
      label: "Descripcion elemento: ",
      type: "select",
      value: "",
      precio: "",
      cantidad: "",
      total: "",
    },
  ]);
  const [toggle, setToggle] = useState(false);
  const indexRef = useRef(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: any,
    label: string,
    cantidad: any,
    precio: any,
    total: any
  ) => {
    const values = [...formValues];
    values[index].value = e.value;
    if (label === "precio") {
      values[index].precio = e.value;
      values[index].cantidad = cantidad;
      // values[index].precio = precio;
      values[index].total = total;
    }
    if (label === "descripcion") {
      values[index].label = e.value;
      values[index].cantidad = e.value;
      //  values[index].cantidad = cantidad;
      values[index].precio = precio;
      values[index].total = "0";
    }
    if (label === "cantidad") {
      values[index].cantidad = e.target.value;
      //  values[index].cantidad = cantidad;
      values[index].precio = precio;
      values[index].total = (
        parseFloat(precio) * parseFloat(e.target.value)
      ).toString();
    }
    if (label === "total") {
      values[index].total = e.toString();
      values[index].precio = precio;
      values[index].cantidad = cantidad;
    }
    indexRef.current = index;
    console.log("este es el value: " + e.value);
    console.log("este es el index en handleChange: " + index);
    setFormValues(values);
    console.log(
      "estos son los valores de formValues: " + JSON.stringify(formValues)
    );
  };

  const handleAddField = (e: any) => {
    e.preventDefault();
    const values = [...formValues];
    console.log("este es el index " + indexRef.current);

    values.push({
      label: "label",
      type: "text",
      value: String(indexRef.current),
      precio: "",
      cantidad: "",
      total: "",
    });
    setFormValues(values);
    setToggle(false);
    //@ts-ignore

    // Desplazar el scroll al final del formulario después de un breve retraso
    setTimeout(() => {
      if (formRef.current) {
        //@ts-ignore
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }, 100); // Ajusta el valor del tiempo de espera si es necesario
  };

  const handlePreview = () => {
    //@ts-ignore
    setPreviewData([...formValues]); // Copia los elementos actuales
    onOpenPre();
  };

  const handleSubmit = async () => {
    const totalSum = formValues.reduce((acc, current) => {
      return acc + parseFloat(current.total || "0");
    }, 0);

    const formData = new FormData();
    formData.append("sucursal", sucursal);
    formData.append("fecha", fecha);
    formData.append("addNumero", factura);
    formData.append("addRuc", ruc);
    // Aquí usamos el total calculado
    formData.append("addTotal", totalSum.toString());

    // Añadir los detalles de los elementos del formulario
    formValues.forEach((item, index) => {
      formData.append(`items[${index}][descripcion]`, item.label);
      formData.append(`items[${index}][precio]`, item.precio);
      formData.append(`items[${index}][cantidad]`, item.cantidad);
      formData.append(`items[${index}][total]`, item.total);
    });

    try {
      const response = await AxiosUrl.post(
        `db_desglose_api.php?id=${product?.id}`,
        formData
      );
      console.log(response.data);
      // Manejo de la respuesta del servidor
      // Por ejemplo, puedes cerrar el modal y recargar datos si es necesario
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al enviar los datos: ", error);
    }
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
      <Modal onClose={onClosePre} isOpen={isOpenPre} isCentered>
        <ModalOverlay />
        <ModalContent w={"90%"}>
          <ModalPrevisualizar
            data={previewData}
            fecha={fecha}
            sucursal={sucursal}
            onClose={onClosePre}
            onCloseEntero={onClose}
          />
        </ModalContent>
      </Modal>
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        Crear Factura Manual
      </Heading>

      <form ref={formRef}>
        <Stack spacing={2}>
          <FormControl id="sucursal" isRequired>
            <FormLabel>SUCURSAL: </FormLabel>
            <Select
              placeholder="Seleccione una sucursal"
              onChange={(event) => setSucursal(event.target.value)}
            >
              {sucursales?.map((item: any, index: number) => (
                <option value={item.nombre}>{item.nombre}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="fecha" isRequired>
            <FormLabel>FECHA: </FormLabel>
            <Input
              placeholder="Seleccione la fecha"
              size="md"
              _placeholder={{ color: "gray.500" }}
              type="date"
              onChange={(event) => setFecha(event.target.value)}
            />
          </FormControl>
          <Stack direction={{ base: "column", md: "row" }}>
            <FormControl id="numfactura" isRequired>
              <FormLabel>Num Factura: </FormLabel>
              <Input
                placeholder="Numero de factura"
                size="md"
                _placeholder={{ color: "gray.500" }}
                type="number"
                onChange={(event) => setFactura(event.target.value)}
              />
            </FormControl>
            <FormControl id="ruc" isRequired>
              <FormLabel>R.U.C: </FormLabel>
              <Input
                placeholder="RUC"
                size="md"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(event) => setRuc(event.target.value)}
              />
            </FormControl>
          </Stack>
        </Stack>
        {formValues.map((obj, index) => (
          <FormControl id={obj.label} isRequired>
            <InputManual
              key={index}
              objValue={obj}
              onChange={handleChange}
              index={index}
            />
          </FormControl>
        ))}
        <Box position="relative" padding="10">
          <Divider />
        </Box>
        {!toggle ? (
          <div className="center">
            <Button w="full" onClick={handleAddField}>
              Agregar Nuevo Elemento
            </Button>
          </div>
        ) : (
          <div className="dialog-box">
            <Button w="full" onClick={handleAddField}>
              Agregar Elemento
            </Button>
          </div>
        )}
      </form>
      <Button w="full" onClick={handlePreview} bg={"#f6ae3e"} color={"white"}>
        <Icon as={FiEye} me={2} /> Previsualizar factura
      </Button>
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
          Crear Factura
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalManualAdd;
