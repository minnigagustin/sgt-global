import React, { useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { AxiosUrl } from "@component/configs/AxiosConfig";

// Icono Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

// Componente para clickear en el mapa
function LocationMarker({ setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}

const ModalSucursalEdit = ({ person, onClose }) => {
  const [nombre, setNombre] = useState(person?.nombre || "");
  const [alias, setAlias] = useState(person?.ALIAS || "");
  const [apiKey, setApiKey] = useState(person?.token || "");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const markerRef = useRef(null);

  const [position, setPosition] = useState({
    lat: person?.lat || 9.0091336,
    lng: person?.lng || -79.5370962,
  });

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

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", person?.id);
    formData.append("nombre", nombre);
    formData.append("ALIAS", alias);
    formData.append("lat", position.lat);
    formData.append("lng", position.lng);

    try {
      const response = await AxiosUrl.post(
        "sucursales_editar_api.php",
        formData
      );

      if (response.data.success) {
        toast({
          title: "Sucursal actualizada",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: error.message || "Ocurrió un error inesperado",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        Editar: {nombre}
      </Heading>

      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Alias</FormLabel>
        <Input
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Ubicación</FormLabel>
        <div style={{ height: "300px" }}>
          <MapContainer
            center={[position.lat, position.lng]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[position.lat, position.lng]}
              draggable={true}
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
            <LocationMarker setPosition={setPosition} />
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
          Guardar
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalSucursalEdit;
