import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CardTableSimple from "@component/components/CardTableSimple";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import Header from "@component/components/Header";
import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import HeaderSucursales from "@component/components/HeaderSucursales";
import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setFileSelected(true);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("archivo", selectedFile);

      setUploading(true);

      axios
        .post("https://backpackpuntaalta.ar:8443/generar-imagen", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Procesar la respuesta del servidor si es necesario
          console.log(response);
          setFileUploaded(true);
          setUploading(false);
        })
        .catch((error) => {
          // Manejar el error en caso de fallo en la solicitud
          console.error(error);
          setUploading(false);
        });
    } else {
      console.log("No se ha seleccionado ningún archivo");
    }
  };

  return (
    <>
      <HeaderSucursales>
        <Head>
          <title>Cierres | {process.env.NAME_COMMERCE}</title>
          <meta
            name="description"
            content="Cierres | {process.env.NAME_COMMERCE}"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Alert status="info" mb={4}>
            <AlertIcon />
            <Box>
              <AlertTitle>Atención!</AlertTitle>
              <AlertDescription>
                Deben generar el excel y enviarlo aquí.
              </AlertDescription>
            </Box>
          </Alert>
          <Stack
            spacing={4}
            w={"full"}
            align="center"
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Agregar cierre de caja
            </Heading>
            <FormControl id="userName" isRequired>
              <FormLabel>Archivo</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center w="full">
                  <Button as="label" htmlFor="fileInput" w="full">
                    {fileSelected ? (
                      <>
                        <CheckIcon mr={2} />
                        Archivo seleccionado
                      </>
                    ) : (
                      "Subir excel"
                    )}
                  </Button>
                  <input
                    id="fileInput"
                    type="file"
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Center>
              </Stack>
            </FormControl>

            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleFileUpload}
                disabled={!fileSelected || uploading}
              >
                {uploading ? (
                  <Spinner size="sm" color="white" mr={2} />
                ) : (
                  <CheckIcon mr={2} />
                )}
                Enviar
              </Button>
            </Stack>
          </Stack>
          {fileUploaded && (
            <Alert status="success" mt={8}>
              <AlertIcon />
              <Box>
                <AlertTitle>¡Excelente!</AlertTitle>
                <AlertDescription>
                  Recibimos el cierre de caja, ¡gracias!
                </AlertDescription>
              </Box>
            </Alert>
          )}
        </Container>
      </HeaderSucursales>
    </>
  );
}
