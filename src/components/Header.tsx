import React, { ReactNode, ReactText, useEffect, useState } from "react";
import Head from "next/head";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Spinner,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiUsers,
  FiSearch,
  FiPackage,
  FiPieChart,
  FiMessageCircle,
  FiClock,
  FiShoppingCart,
  FiTruck,
  FiShoppingBag,
  FiArchive,
  FiHeart,
  FiBarChart,
  FiMessageSquare,
  FiActivity,
  FiAward,
  FiLogOut,
  FiEye,
  FiArrowUpRight,
  FiDollarSign,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthStore } from "@component/stores/auth";

interface LinkItemProps {
  name: string;
  path?: string;
  icon: any;
  disabled?: boolean;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", path: "/", icon: FiBarChart },
  { name: "Proyección", path: "/proyeccion", icon: FiArrowUpRight },
  { name: "Ventas", path: "/ventas", icon: FiDollarSign },

  { name: "Ingresar Facturas", path: "/escanear", icon: FiEye },
  /* {
    name: "Asistencias",
    path: "/asistencias",
    icon: FiClock,
  },
  {
    name: "Empleados",
    path: "/empleados",
    icon: FiUsers,
  },
  { name: "Sucursales", path: "/sucursales", icon: FiHeart },

  {
    name: "Usuarios",
    path: "/usuarios",
    icon: FiUsers,
  }, */
  {
    name: "Certificados",
    path: "/certificados",
    icon: FiAward,
    disabled: process.env.DESHABILITAR_FUNCIONES === "true", // deshabilita basado en la variable de entorno
  },
  {
    name: "Proveedores",
    path: "/proveedores",
    icon: FiTruck,
  },
  {
    name: "Insumos y Gastos",
    path: "/insumos",
    icon: FiArchive,
  },
  {
    name: "Facturacion Interna",
    path: "/facturacioninterna",
    icon: FiShoppingBag,
    disabled: process.env.DESHABILITAR_FUNCIONES === "true", // deshabilita basado en la variable de entorno
  },
  {
    name: "Reportes",
    path: "/reportes",
    icon: FiActivity,
  },
  {
    name: "Ayuda",
    path: "/ayuda",
    icon: FiMessageSquare,
    disabled: true,
  },
];

export default function Header({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const color = useColorModeValue("gray.100", "gray.900");
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);
  if (isLoading) {
    return <Spinner w="50px" h="50px" thickness="5px" />;
  }

  return (
    <>
      <Head>
        <title>Indicadores | {process.env.NAME_COMMERCE}</title>
        <meta
          name="description"
          content="Indicadores | {process.env.NAME_COMMERCE}"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minH="100vh" bg={color}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 280 }} p="4">
          {children}
        </Box>
      </Box>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const handleLogout = () => {
  // Llama a la función logout del estado de autenticación
  useAuthStore.getState().logout();
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      w={{ base: "full", md: 280 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {/* Contenido del encabezado */}
      <Box h="full" display="flex" flexDirection="column">
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          {process.env.LOGO_COMMERCE ? (
            <Image
              objectFit="contain"
              src={process.env.LOGO_COMMERCE}
              w={{ base: "30%", md: "70%" }}
              h="80%"
            />
          ) : (
            <Text>{process.env.NAME_COMMERCE}</Text>
          )}

          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>

        {/* Elementos de navegación */}
        {LinkItems.filter((link) => !link.disabled).map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            path={link.disabled ? `${link.disabled}/desactivado` : link.path}
          >
            {link.name}
          </NavItem>
        ))}

        {/* Botón de Cerrar sesión */}
        <Box mt={{ base: 20, md: "auto" }}>
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "gray.100",
            }}
            onClick={handleLogout}
          >
            <Icon mr="4" fontSize="20" as={FiLogOut} />
            Cerrar Sesión
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path?: string;
}
const NavItem = ({ icon, children, path = "/", ...rest }: NavItemProps) => {
  const router = useRouter();
  return (
    <Link href={path} passHref={true} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={router.pathname == path ? "#231F20" : ""}
        color={router.pathname == path ? "white" : ""}
        _hover={{
          bg: router.pathname !== path ? "gray.100" : "",
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="20" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      display={{ base: "flex", md: "none" }}
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      {/*  <Image
        objectFit={"contain"}
        src={"/logo.png"}
        display={{ base: "flex", md: "none" }}
        w="40%"
        h="100%"
      /> */}
      {process.env.LOGO_COMMERCE ? (
        <Image
          objectFit="contain"
          src={process.env.LOGO_COMMERCE}
          w={{ base: "30%", md: "70%" }}
          h="80%"
        />
      ) : (
        <Text>{process.env.NAME_COMMERCE}</Text>
      )}
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Admin</Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Cerrar sesion</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
