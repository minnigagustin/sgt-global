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
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import moment from "moment";

const CardChartProduct = ({ stats, product }: any) => {
  const series = stats.map((stat: any) => {
    return stat.precio;
  });

  const categories = stats.map((stat: any) => {
    return moment(stat.fecha).format("DD/MM/YY");
  });
  const options = {
    chart: {
      height: 100,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories,
    },
  };
  return (
    <Card minH="83px">
      <CardBody>
        <ReactApexChart
          //@ts-ignore
          options={options}
          series={[
            {
              name: `${product.producto}`,
              data: series,
            },
          ]}
          type="line"
          width="100%"
        />
      </CardBody>
    </Card>
  );
};

export default CardChartProduct;
