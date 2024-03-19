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
} from "@chakra-ui/react";
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
// Componente para seleccionar una ubicación en el mapa
function LocationMarker({ setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null; // No es necesario retornar el Marker aquí, se manejará desde el componente padre
}

const ModalSucursalEdit = ({ person, onClose }) => {
  const [nombre, setNombre] = useState(person?.nombre);
  const [alias, setAlias] = useState(person?.alias);
  const [apiKey, setApiKey] = useState(person?.apiKey);
  const markerRef = useRef(null);

  const [position, setPosition] = useState({
    lat: person?.lat || 8.537981,
    lng: person?.lng || -80.782127,
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

  // Función de envío aquí...
  const handleSubmit = () => {
    // Aquí iría tu lógica para enviar la información actualizada, por ejemplo:
    console.log("Guardar:", { nombre, alias, apiKey, lat, lng });
    // onClose(); // Cerrar modal después de guardar
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
      <FormControl id="nombre" isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </FormControl>
      <FormControl id="alias" isRequired>
        <FormLabel>Alias</FormLabel>
        <Input
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </FormControl>
      <FormControl id="apiKey" isRequired>
        <FormLabel>API Key</FormLabel>
        <Input
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </FormControl>
      <FormControl id="latitud" isRequired>
        <FormLabel>Latitud</FormLabel>
        <Input
          placeholder="Latitud"
          type="number"
          value={position.lat}
          onChange={(e) =>
            setPosition({ ...position, lat: parseFloat(e.target.value) })
          }
        />
      </FormControl>
      <FormControl id="longitud" isRequired>
        <FormLabel>Longitud</FormLabel>
        <Input
          placeholder="Longitud"
          type="number"
          value={position.lng}
          onChange={(e) =>
            setPosition({ ...position, lng: parseFloat(e.target.value) })
          }
        />
      </FormControl>

      {/* Mapa para seleccionar ubicación */}
      <FormControl id="location" isRequired>
        <FormLabel>Ubicación</FormLabel>
        <div style={{ height: "300px" }}>
          <MapContainer
            center={[position.lat, position.lng]}
            zoom={10}
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
          </MapContainer>
        </div>
      </FormControl>

      {/* Botones de acción */}
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

export default ModalSucursalEdit;
