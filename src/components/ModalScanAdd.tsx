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
  Spinner,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { proveedoresGet } from "@component/store/proveedoresSlice";
import { productosGet } from "@component/store/productosSlice";
import ModalScanResult from "./ModalScanResult";

const ModalScanAdd = ({ person, onClose }: any) => {
  const fileInputRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const [file, setFile] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
  );
  const [show, setShow] = useState(false);

  const [fileimage, setFileImage] = useState(null);
  const [nombre, setNombre] = useState(person?.nombre);
  const [id, setId] = useState(person?.id);
  const [precio, setPrecio] = useState(person?.precio);
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState(person?.password);

  const [legajocontadora, setLegajoContadora] = useState(
    person?.legajo_contadora
  );
  const [tipo, setTipo] = useState(person?.categoria);
  const [DV, setDV] = useState(person?.dv);
  const [RUC, setRUC] = useState(person?.ruc);
  const [API, setAPI] = useState(person?.api);
  const [unidad, setUnidad] = useState(person?.tipo_medicion);
  const { sucursales } = useSelector((resp: any) => resp.sucursales);
  const [showModal, setShowModal] = useState(false);
  const [mindeeData, setMindeeData] = useState(null);
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
    setIsLoading(true); // Iniciar la carga

    const formData = new FormData();
    //@ts-ignore
    formData.append("document", fileimage); // Asegúrate de que el nombre del campo sea "file"

    axios
      .post(
        "https://api.mindee.net/v1/products/mindee/invoices/v4/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token 996e37ffe201d6474a5a8521a93238f2", // Reemplaza con tu clave de API Mindee
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMindeeData(response.data);
        setShowModal(true);
        // Maneja la respuesta de Mindee según tus necesidades
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Finalizar la carga
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
        Nueva factura: {person?.nombre}
      </Heading>
      <ModalScanResult
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={mindeeData}
        proveedor={person}
        sucursal={tipo}
        cerrarModal={onClose}
      />

      <FormControl id="email">
        <FormLabel>Sucursal</FormLabel>
        <Select onChange={(event) => setTipo(event.target.value)}>
          {sucursales?.map((item: any, key: any) => (
            <option value={item.nombre} key={key}>
              {item.nombre}
            </option>
          ))}
        </Select>
      </FormControl>
      <Center w="full">
        <Button w="full" onClick={handleButtonClick}>
          Agregar Factura
        </Button>
      </Center>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />

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
          _hover={{ bg: "blue.500" }}
          isLoading={isLoading}
          loadingText="Escanear"
        >
          {isLoading ? <Spinner size="sm" /> : "Escanear"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalScanAdd;
