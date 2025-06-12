import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { sucursalesGet } from "@component/store/sucursalesSlice";
import { AxiosUrl } from "@component/configs/AxiosConfig";

const DeleteSucursal = ({ isOpen, onOpen, onClose, cancelRef, item }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await AxiosUrl.delete(`sucursales_editar_api.php?id=${item.id}`);
      dispatch(sucursalesGet());
      toast({
        title: "Sucursal eliminada.",
        description: `La sucursal "${item?.nombre}" fue eliminada correctamente.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error al eliminar la sucursal:", error);
      toast({
        title: "Error al eliminar.",
        description: "Ocurrió un error al intentar eliminar la sucursal.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
        <AlertDialogHeader>Eliminar {item?.nombre}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          ¿Estás seguro de eliminar esta sucursal? Esta acción no se puede
          deshacer.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
            Cancelar
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={handleDelete}
            isLoading={isLoading}
            loadingText="Eliminando..."
            isDisabled={isLoading}
          >
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSucursal;
