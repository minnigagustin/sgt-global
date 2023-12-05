import React from "react";
import {
  Text,
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  HStack,
} from "@chakra-ui/react";

const CardTableSubComponent = ({ list }: any) => {
  const total = list?.reduce(
    (accumulator: number, item: any) => accumulator + Number(item.total_sum),
    0
  );

  return (
    <>
      <TableContainer>
        <Table variant="simple" size={["sm", "sm"]}>
          <Tbody>
            {list?.map((item: any, index: number) => (
              <Tr key={index}>
                <Td>{item.nombre_corto}</Td>
                <Td fontWeight={"bold"} isNumeric>
                  ${Number(item.total_sum).toFixed(2)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack w={"100%"} justify={"space-between"}>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"#ef4b80"}>
          Total
        </Text>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"#ef4b80"}>
          ${total?.toFixed(2)}
        </Text>
      </HStack>
    </>
  );
};

export default CardTableSubComponent;
