import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiCamera, FiTrello } from "react-icons/fi";

const ButtonEscaner = ({ item, onOpen }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    await router.push(`/proveedores/${item.id}`);
    setIsLoading(false);
  };

  return (
    <Button
      w={"full"}
      onClick={() => onOpen()}
      isLoading={isLoading}
      loadingText="Cargando..."
      bg={useColorModeValue("#f6ae3e", "gray.900")}
      color={"white"}
      rounded={"md"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
    >
      <Icon as={FiCamera} mr={2} />
      Escanear
    </Button>
  );
};

export default ButtonEscaner;
