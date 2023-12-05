import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiTrello } from "react-icons/fi";

const ButtonHistorial = ({ item }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    await router.push(`/ventas/${item.id_sucursal}`);
    setIsLoading(false);
  };

  return (
    <Button
      w={"full"}
      onClick={handleButtonClick}
      isLoading={isLoading}
      loadingText="Cargando..."
      bg={useColorModeValue("#ef4b80", "gray.900")}
      color={"white"}
      rounded={"md"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
    >
      <Icon as={FiTrello} mr={2} />
      Ver historial de Ventas
    </Button>
  );
};

export default ButtonHistorial;
