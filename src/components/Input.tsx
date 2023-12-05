import React, { useRef } from "react";
import {
  Box,
  AbsoluteCenter,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { internosGet } from "@component/store/internosSlice";
import { AppDispatch } from "@component/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InputFactura({ objValue, onChange, index }: any) {
  const { sucursales } = useSelector((resp: any) => resp.sucursales);
  const { internos } = useSelector((resp: any) => resp.internos);
  const { label, type, value, precio, cantidad, total } = objValue;
  const cantidadInputRef = useRef(null); // Referencia para el campo de cantidad
  const [precioQuery, setprecioQuery] = useState("0");
  const [totalQuery, settotalQuery] = useState<string>("0");
  const dispatch: AppDispatch = useDispatch();
  var interno_precio = "2";
  const sorted = [...internos].sort((a, b) => {
    if (a.nombre.startsWith('Envase') && !b.nombre.startsWith('Envase')) {
      return -1;
    } else if (!a.nombre.startsWith('Envase') && b.nombre.startsWith('Envase')) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <div className="input-group">
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Elemento
        </AbsoluteCenter>
      </Box>
      <FormControl id={"descripcion" + { index }} isRequired>
        <FormLabel>Descripcion elemento {index + 1}: </FormLabel>
        <Select
          placeholder="Seleccione un Producto"
          onChange={(event) => {
            const lista = sorted.filter((item: any) =>
              item.nombre
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
            );
            console.log("la lista " + JSON.stringify(lista));
            console.log("el precio " + lista[0].precio);
            setprecioQuery(lista[0].precio);
            // interno_precio = item.precio
            onChange(
              event,
              index,
              "descripcion",
              cantidad,
              precioQuery,
              parseInt(precioQuery) * parseInt(cantidad)
            );
            //@ts-ignore
            cantidadInputRef.current.focus(); // Enfocar el campo de cantidad
          }}
        >
          {sorted?.map((item: any, index: number) => (
            <option value={item.nombre}>{item.nombre}</option>
          ))
          }
        </Select>
      </FormControl>
      <FormControl id={"cantidad" + { index }} isRequired>
        <FormLabel>Cantidad elemento: </FormLabel>
        <Input
          type="number"
          id={label}
          ref={cantidadInputRef} // Asignar la referencia al campo de cantidad
          value={cantidad || ""}
          onChange={(e) => {
            var myNumber = parseInt(precioQuery) * parseInt(cantidad);
            settotalQuery(myNumber.toString());
            onChange(
              e,
              index,
              "cantidad",
              cantidad,
              precioQuery,
              parseInt(totalQuery)
            );
          }}
        />
      </FormControl>
      <FormControl id={"precio" + { index }} isRequired>
        <FormLabel>Precio elemento: </FormLabel>
        <Input
          type="text"
          disabled
          id={label}
          value={precioQuery || ""}
          onChange={(e) =>
            onChange(
              e,
              index,
              "precio",
              cantidad,
              precioQuery,
              parseInt(totalQuery)
            )
          }
        />
      </FormControl>
      <FormControl id={"total" + { index }} isRequired>
        <FormLabel>Total elemento: </FormLabel>
        <Input
          type="text"
          disabled
          id={label}
          value={total || ""}
          onChange={(e) =>
            onChange(
              e,
              index,
              "total",
              cantidad,
              precioQuery,
              parseInt(totalQuery)
            )
          }
        />
      </FormControl>
      <Divider />
    </div>
  );
}
