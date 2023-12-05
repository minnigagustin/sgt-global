import React from "react";
import {
  VStack,
  Button,
  Text,
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Card,
  CardBody,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import CardTableSimple from "./CardTableSimple";
import CardTableSubComponent from "./CardTableSubComponent";
import CardTableEmpleo from "./CardTableEmpleo";

const CardTable = ({ color, title, description, total, icon }: any) => {
  return (
    <Card maxHeight="400px" overflowY="auto">
      <CardBody>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"gray.800"}>
          Empleados
        </Text>
        <Tabs align="center" variant="soft-rounded" isFitted>
          <TabList>
            <Tab _selected={{ color: "white", bg: "#6690F4" }}>Empleados</Tab>
            <Tab isDisabled _selected={{ color: "white", bg: "#6690F4" }}>
              Administracion
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CardTableEmpleo />
            </TabPanel>
            <TabPanel>
              <CardTableSubComponent />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default CardTable;
