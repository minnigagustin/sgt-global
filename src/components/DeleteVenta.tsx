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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { productosGet } from "@component/store/productosSlice";
import { ventasGet } from "@component/store/proyeccionSlice";

const DeleteVenta = ({ isOpen, onOpen, onClose, cancelRef, item }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://tamitut.com/PAYA/facturas/ventas_editar_api.php?id=${item.id}`
      );
      // Aquí puedes agregar cualquier lógica adicional después de eliminar el producto, como actualizar el estado o mostrar un mensaje de éxito.
      dispatch(ventasGet({ id_sucursal: item?.id_sucursal }));
      onClose();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      // Aquí puedes agregar lógica para manejar errores, como mostrar un mensaje de error al usuario.
    }
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Eliminar Venta</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Estas seguro de eliminar este venta? Se eliminara permanentemente en.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleDelete}>
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVenta;
