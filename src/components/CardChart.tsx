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
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const CardChart = ({ color, title, description, total, icon }: any) => {
  const { reportes } = useSelector((resp: any) => resp.reportes);
  const insumos = reportes.filter((item: any) => item.categoria === "insumo");
  const operacionales = reportes.filter(
    (item: any) => item.categoria === "operacionales"
  );
  const totalinsumos = insumos?.reduce(
    (accumulator: number, item: any) => accumulator + Number(item.total_sum),
    0
  );
  const totaloperacionales = operacionales?.reduce(
    (accumulator: number, item: any) => accumulator + Number(item.total_sum),
    0
  );
  return (
    <Card minH="83px" w={700}>
      <CardBody>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} color={"gray.800"}>
          Resultado de Busqueda de Total de Gastos
        </Text>
        <Chart
          options={{
            dataLabels: {
              enabled: false,
            },
            labels: ["Insumos", "Gastos Operacionales"],
            chart: {
              type: "pie",
            },
            legend: {
              position: "left",
              fontSize: "20",
              fontWeight: "bold",
              //@ts-ignore
              formatter: function (seriesName, opts) {
                return [
                  " ",
                  opts.w.globals.series[opts.seriesIndex].toFixed(2),
                  " - ",
                  seriesName,
                ];
              },
            },
            responsive: [
              {
                breakpoint: 1760,
                options: {
                  chart: {
                    width: 480,
                    height: 900,
                  },
                  legend: {
                    position: "left",
                  },
                },
              },

              {
                breakpoint: 1680,
                options: {
                  chart: {
                    width: 600,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1500,
                options: {
                  chart: {
                    width: 530,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1430,
                options: {
                  chart: {
                    width: 500,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1330,
                options: {
                  chart: {
                    width: 450,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1260,
                options: {
                  chart: {
                    width: 424,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1000,
                options: {
                  chart: {
                    width: 270,
                    height: 500,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 960,
                options: {
                  chart: {
                    width: 600,
                    height: 500,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 800,
                options: {
                  chart: {
                    width: 400,
                    height: 400,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 680,
                options: {
                  chart: {
                    width: 480,
                    height: 480,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                    height: 300,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          }}
          series={[totalinsumos, totaloperacionales]}
          type="donut"
          width="690"
        />
      </CardBody>
    </Card>
  );
};

export default CardChart;
