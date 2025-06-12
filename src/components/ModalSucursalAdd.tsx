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
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useMemo, useRef, useState } from "react";
import axios from "axios";
import { comerciosGet } from "@component/store/inicioSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";
import { proveedoresGet } from "@component/store/proveedoresSlice";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { AxiosUrl } from "@component/configs/AxiosConfig";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const ModalSucursalAdd = ({ product, onClose }: any) => {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [nombre, SetNombre] = useState("");
  const [alias, setAlias] = useState("");
  const [file, setFile] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
  );
  const [fileimage, setFileImage] = useState(null);
  const [position, setPosition] = useState({
    lat: 9.0091336,
    lng: -79.5370962,
  });
  const [isLoading, setIsLoading] = useState(false);

  const markerRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setFile(fileUrl);
    setFileImage(file);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("ALIAS", alias);

    AxiosUrl.post("sucursales_editar_api.php", formData)
      .then((data) => {
        dispatch(sucursalesGet());
        toast({
          title: "Sucursal agregada.",
          description: "Se agregó la sucursal correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error al agregar.",
          description: "Ocurrió un error al intentar agregar la sucursal.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
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
        Agregar Sucursal
      </Heading>

      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(e) => SetNombre(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Alias</FormLabel>
        <Input
          placeholder="Alias"
          _placeholder={{ color: "gray.500" }}
          type="text"
          onChange={(e) => setAlias(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Ubicación</FormLabel>
        <div style={{ height: "300px" }}>
          <MapContainer
            center={[position.lat, position.lng]}
            zoom={12}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[position.lat, position.lng]}
              draggable
              ref={markerRef}
              eventHandlers={eventHandlers}
              icon={
                new L.Icon({
                  iconUrl: markerIcon.src,
                  iconRetinaUrl: markerIcon2x.src,
                  shadowUrl: markerShadow.src,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                })
              }
            />
          </MapContainer>
        </div>
      </FormControl>

      <Stack direction={{ base: "column", md: "row" }}>
        <FormControl isRequired>
          <FormLabel>Latitud</FormLabel>
          <Input
            type="number"
            value={position.lat}
            onChange={(e) =>
              setPosition({ ...position, lat: parseFloat(e.target.value) })
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Longitud</FormLabel>
          <Input
            type="number"
            value={position.lng}
            onChange={(e) =>
              setPosition({ ...position, lng: parseFloat(e.target.value) })
            }
          />
        </FormControl>
      </Stack>

      <Stack spacing={6} direction={["column", "row"]}>
        <Button
          onClick={onClose}
          bg={"red.400"}
          color={"white"}
          w="full"
          _hover={{ bg: "red.500" }}
          isDisabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          bg={"blue.400"}
          color={"white"}
          w="full"
          _hover={{ bg: "blue.500" }}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Agregar
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalSucursalAdd;
