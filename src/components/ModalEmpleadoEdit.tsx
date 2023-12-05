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

const ModalEmpleadoEdit = ({ person, onClose }: any) => {
  const fileInputRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const [file, setFile] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
  );
  const [show, setShow] = useState(false);

  const [fileimage, setFileImage] = useState(null);
  const [nombre, setNombre] = useState(person?.nombre);
  const [legajo, setLegajo] = useState(person?.legajo);
  const [password, setPassword] = useState(person?.password);

  const [legajocontadora, setLegajoContadora] = useState(
    person?.legajo_contadora
  );
  const [grupo, setGrupo] = useState(person?.grupo);
  const [nacimiento, setNacimiento] = useState(person?.fecha_nacimiento);
  const [condicion_contrato, setCondicion] = useState(
    person?.condicion_contrato
  );

  const [turno_trabajo, setTurno] = useState(person?.turno_trabajo);

  const [status_empleado, setStatus] = useState(person?.status_empleado);

  const [fecha_ingreso, setFechaIngreso] = useState(person?.fecha_ingreso);
  const [fecha_afip, setFechaAfip] = useState(person?.fecha_afip);

  const [isRepartidor, setIsRepartidor] = useState(
    person.es_repartidor === "1" ? true : false
  );
  const [isNocturno, setIsNocturno] = useState(
    person.es_nocturno === "1" ? true : false
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
    const formData = new FormData();
    //@ts-ignore
    formData.append("image", fileimage);
    //@ts-ignore
    formData.append("nombre", nombre); // Agrega el nombre al FormData
    formData.append("password", password);

    //@ts-ignore
    formData.append("legajo", legajo); // Agrega el legajo al FormData
    formData.append("legajo_contadora", legajocontadora); // Agrega el legajo al FormData

    formData.append("esRepartidor", isRepartidor ? "1" : "0");
    formData.append("esNocturno", isNocturno ? "1" : "0");
    formData.append("grupo", grupo); // Agrega el grupo al FormData
    formData.append("fecha_nacimiento", nacimiento);
    formData.append("condicion_contrato", condicion_contrato);
    formData.append("turno_trabajo", turno_trabajo);
    formData.append("status_empleado", status_empleado);
    formData.append("fecha_afip", fecha_afip);
    formData.append("fecha_ingreso", fecha_ingreso);

    axios
      .post("https://barcentral.com.ar/api/agregarempleado.php", formData)
      .then((data) => {
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
        Editar: {person?.nombre}
      </Heading>
      <FormControl id="userName">
        <FormLabel>Foto de perfil</FormLabel>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar
              size="xl"
              src={`https://barcentral.com.ar/api/${person.foto}`}
            >
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
            </Avatar>
          </Center>
          <Center w="full">
            <Button w="full" onClick={handleButtonClick}>
              Cambiar foto
            </Button>
          </Center>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
        </Stack>
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>Nombre completo</FormLabel>
        <Input
          placeholder="UserName"
          _placeholder={{ color: "gray.500" }}
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
      </FormControl>
      <FormControl id="fecha" isRequired>
        <FormLabel>Fecha de Nacimiento</FormLabel>
        <Input
          placeholder="Selecciona Fecha"
          value={nacimiento}
          onChange={(event) => setNacimiento(event.target.value)}
          size="md"
          type="date"
        />
      </FormControl>
      <FormControl id="grupo">
        <FormLabel>Grupo</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setGrupo(event.target.value)}
        >
          <option value="Salon" selected={grupo === "Salon"}>
            Salón
          </option>
          <option value="Barra" selected={grupo === "Barra"}>
            Barra
          </option>
          <option value="Caja" selected={grupo === "Caja"}>
            Caja
          </option>
          <option value="Cocina" selected={grupo === "Cocina"}>
            Cocina
          </option>
          <option value="Bacha" selected={grupo === "Bacha"}>
            Bacha
          </option>
          <option value="Mantenimiento" selected={grupo === "Mantenimiento"}>
            Mantenimiento
          </option>
          <option value="Encargado" selected={grupo === "Encargado"}>
            Encargado
          </option>
        </Select>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Legajo</FormLabel>
        <Input
          _placeholder={{ color: "gray.500" }}
          type="number"
          value={legajocontadora}
          onChange={(event) => setLegajoContadora(event.target.value)}
        />
      </FormControl>

      <FormControl id="condicion" isRequired>
        <FormLabel>Condición de Contrato</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={(event) => setCondicion(event.target.value)}
        >
          <option
            value="Planta Permanente"
            selected={condicion_contrato === "Planta Permanente"}
          >
            Planta Permanente
          </option>
          <option
            value="Temporario Fijo"
            selected={condicion_contrato === "Temporario Fijo"}
          >
            Temporario Fijo
          </option>
          <option
            value="Temporario"
            selected={condicion_contrato === "Temporario"}
          >
            Temporario
          </option>
          <option
            value="Incorporacion"
            selected={condicion_contrato === "Incorporacion"}
          >
            Incorporación
          </option>
        </Select>
      </FormControl>
      <FormControl id="turno" isRequired>
        <FormLabel>Turno de trabajo</FormLabel>
        <Select
          placeholder="Selecciona una opcion"
          onChange={(event) => setTurno(event.target.value)}
        >
          <option value="Mañana" selected={turno_trabajo === "Mañana"}>
            Mañana
          </option>
          <option value="Tarde" selected={turno_trabajo === "Tarde"}>
            Tarde
          </option>
          <option value="Ambos" selected={turno_trabajo === "Ambos"}>
            Ambos
          </option>
        </Select>
      </FormControl>
      <FormControl id="status" isRequired>
        <FormLabel>Status del empleado</FormLabel>
        <Select
          placeholder="Selecciona una opcion"
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="Completo" selected={status_empleado === "Completo"}>
            Turno Completo
          </option>
          <option value="Medio" selected={status_empleado === "Medio"}>
            Medio Turno
          </option>
          <option value="Hora" selected={status_empleado === "Hora"}>
            Por Hora
          </option>
          <option value="Dia" selected={status_empleado === "Dia"}>
            Por Día
          </option>
        </Select>
      </FormControl>
      <FormControl id="ingreso" isRequired>
        <FormLabel>Fecha de ingreso</FormLabel>
        <Input
          placeholder="Selecciona Fecha"
          size="md"
          type="date"
          onChange={(event) => setFechaIngreso(event.target.value)}
          value={fecha_ingreso}
        />
      </FormControl>
      <FormControl id="alta" isRequired>
        <FormLabel>Fecha de Alta AFIP</FormLabel>
        <Input
          placeholder="Selecciona Fecha"
          size="md"
          type="date"
          onChange={(event) => setFechaAfip(event.target.value)}
          value={fecha_afip}
        />
      </FormControl>

      <Stack direction={"row"}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            ¿Horario nocturno?
          </FormLabel>
          <Switch
            id="nocturno-switch"
            isChecked={isNocturno}
            onChange={(e) => setIsNocturno(e.target.checked)}
          />
        </FormControl>
      </Stack>
      {isRepartidor && (
        <FormControl id="email" isRequired>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={password}
              placeholder="Contraseña reparto"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Ocultar" : "Ver"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      )}
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

export default ModalEmpleadoEdit;
