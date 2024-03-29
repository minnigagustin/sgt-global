import { CloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  IconButton,
  Flex,
  ModalFooter,
} from "@chakra-ui/react";
import { AxiosUrl } from "@component/configs/AxiosConfig";
import { useEffect, useState } from "react";

const ModalScanResult = ({
  isOpen,
  onClose,
  data,
  proveedor,
  sucursal,
  cerrarModal,
}: any) => {
  const [invoiceDetails, setInvoiceDetails] = useState({
    fecha: "",
    dueDate: "",
    invoiceNumber: "",
    totalAmount: 0,
    lineItems: [],
  });
  const [loading, setLoading] = useState(false);

  // Efecto para parsear y establecer los datos de la factura
  useEffect(() => {
    if (data) {
      const { date, due_date, invoice_number, line_items, total_net } =
        data.document.inference.prediction;
      setInvoiceDetails({
        fecha: date?.value || "",
        dueDate: due_date?.value || "",
        invoiceNumber: invoice_number?.value || "",
        totalAmount: total_net?.value || 0,
        lineItems:
          //@ts-ignore
          line_items?.map((item) => ({
            description: item.description || "",
            quantity: item.quantity || 0,
            unitPrice: item.unit_price || 0,
            total: item.total_amount || 0,
          })) || [],
      });
    }
  }, [data]);

  // Función para añadir un nuevo ítem al carrito
  const addNewItem = () => {
    //@ts-ignore
    setInvoiceDetails((prevDetails) => ({
      ...prevDetails,
      lineItems: [
        ...prevDetails.lineItems,
        { description: "", quantity: 0, unitPrice: 0, total: 0 },
      ],
    }));
  };

  // Actualizar un artículo en particular
  //@ts-ignore
  const updateLineItem = (index, field, value) => {
    const newLineItems = [...invoiceDetails.lineItems];
    //@ts-ignore
    const updatedItem = { ...newLineItems[index], [field]: value };

    // Si se actualiza la cantidad o el precio, recalculamos el total
    if (field === "quantity" || field === "unitPrice") {
      updatedItem.total =
        parseFloat(updatedItem.quantity) * parseFloat(updatedItem.unitPrice);
    }
    //@ts-ignore
    newLineItems[index] = updatedItem;
    setInvoiceDetails({ ...invoiceDetails, lineItems: newLineItems });

    // Actualizar el total general
    const newTotalAmount = newLineItems.reduce(
      //@ts-ignore
      (acc, curr) => acc + curr.total,
      0
    );
    setInvoiceDetails((prev) => ({ ...prev, totalAmount: newTotalAmount }));
  };

  // Función para eliminar un ítem específico
  //@ts-ignore
  const removeLineItem = (index) => {
    const newLineItems = invoiceDetails.lineItems.filter((_, i) => i !== index);
    setInvoiceDetails({ ...invoiceDetails, lineItems: newLineItems });

    // Actualizar el total general después de la eliminación
    const newTotalAmount = newLineItems.reduce(
      //@ts-ignore
      (acc, curr) => acc + curr.total,
      0
    );
    setInvoiceDetails((prev) => ({ ...prev, totalAmount: newTotalAmount }));
  };

  // Función que se ejecutará cuando se haga clic en el botón "GUARDAR FACTURA"

  const saveInvoice = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("sucursal", sucursal);
    formData.append("fecha", invoiceDetails.fecha);
    formData.append("addNumero", invoiceDetails.invoiceNumber);
    formData.append("addRuc", proveedor.ruc);
    // Aquí usamos el total calculado
    formData.append("addTotal", invoiceDetails.totalAmount.toString());

    // Añadir los detalles de los elementos del formulario

    try {
      const response = await AxiosUrl.post(
        `db_desglose_api.php?id=${proveedor?.id}`,
        formData
      );
      console.log(response.data);
      // Manejo de la respuesta del servidor
      // Por ejemplo, puedes cerrar el modal y recargar datos si es necesario
      cerrarModal();
      setLoading(false);
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al enviar los datos: ", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles de la Factura</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Fecha de la factura</FormLabel>
              <Input type="date" value={invoiceDetails.fecha} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Número de factura</FormLabel>
              <Input value={invoiceDetails.invoiceNumber} readOnly />
            </FormControl>

            {invoiceDetails.lineItems.map((item, index) => (
              <VStack spacing={2} align="stretch" w={"100%"}>
                <Flex
                  key={index}
                  align="center"
                  justify="space-between"
                  w={"100%"}
                >
                  <FormControl>
                    <FormLabel>Descripción del elemento {index + 1}</FormLabel>
                    <Input
                      //@ts-ignore
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(index, "description", e.target.value)
                      }
                    />
                  </FormControl>
                  <IconButton
                    aria-label="Eliminar ítem"
                    icon={<CloseIcon />}
                    onClick={() => removeLineItem(index)}
                    variant="ghost"
                    size="sm"
                  />
                </Flex>
                <FormControl>
                  <FormLabel>Precio</FormLabel>
                  <Input
                    type="number"
                    //@ts-ignore
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateLineItem(index, "unitPrice", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Cantidad</FormLabel>
                  <Input
                    type="number"
                    //@ts-ignore
                    value={item.quantity}
                    onChange={(e) =>
                      updateLineItem(index, "quantity", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Total</FormLabel>
                  <Input
                    type="number"
                    //@ts-ignore
                    value={item.total.toFixed(2)}
                    readOnly
                  />
                </FormControl>
              </VStack>
            ))}
            <Button onClick={addNewItem} colorScheme="blue">
              Agregar Ítem
            </Button>

            <FormControl>
              <FormLabel>Total de la factura</FormLabel>
              <Input value={invoiceDetails.totalAmount} readOnly />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={saveInvoice}
            isLoading={loading}
            loadingText={"Subiendo..."}
          >
            GUARDAR FACTURA {">"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalScanResult;
