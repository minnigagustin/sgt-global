import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Input } from "@chakra-ui/react";

const FileInputExample = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("archivo", selectedFile); // Cambia "filePath" por "archivo"

      axios
        .post("https://backpackpuntaalta.ar:8443/generar-imagen", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Procesar la respuesta del servidor si es necesario
          console.log(response);
        })
        .catch((error) => {
          // Manejar el error en caso de fallo en la solicitud
          console.error(error);
        });
    } else {
      console.log("No se ha seleccionado ningún archivo");
    }
  };

  return (
    <form>
      <Box>
        <h2>Input de Archivo</h2>
        <Input type="file" onChange={handleFileChange} />
      </Box>
      <Button onClick={handleFileUpload}>Subir Archivo</Button>
    </form>
  );
};

export default FileInputExample;
