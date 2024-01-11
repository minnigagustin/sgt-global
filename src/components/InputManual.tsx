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
import { Select as Select2 } from "chakra-react-select";

import { sucursalesGet } from "@component/store/sucursalesSlice";
import { internosGet } from "@component/store/internosSlice";
import { AppDispatch } from "@component/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InputManual({ objValue, onChange, index }: any) {
  const { sucursales } = useSelector((resp: any) => resp.sucursales);
  const { internos } = useSelector((resp: any) => resp.internos);
  const { externos } = useSelector((resp: any) => resp.externos);

  const { label, type, value, precio, cantidad, total } = objValue;
  const cantidadInputRef = useRef(null); // Referencia para el campo de cantidad
  const [precioQuery, setprecioQuery] = useState("0");
  const [totalQuery, settotalQuery] = useState<string>("0");
  const dispatch: AppDispatch = useDispatch();
  var interno_precio = "2";

  return (
    <div className="input-group">
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Elemento
        </AbsoluteCenter>
      </Box>
      <FormControl id={"descripcion" + { index }} isRequired>
        <Select2
          placeholder="Agregar producto..."
          tagVariant="filled"
          onChange={(event) => {
            const lista = externos.filter((item: any) =>
              item.nombre.toLowerCase().includes(event.value.toLowerCase())
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
          chakraStyles={{
            container: (provided) => ({
              ...provided,
              width: "100%",
            }),
          }}
          options={externos.map((item: any) => {
            return {
              label: item.nombre,
              value: item.nombre,
            };
          })}
        />
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
