import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { store } from "@component/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    fonts: {
      heading: `'Lato', sans-serif`,
      body: `'Lato', sans-serif`,
    },
    colors: {
      gray: {
        700: "#1f2733",
      },
      muni: {
        verde: "#95c840",
        celeste: "#4093C8",
      },
      brand: {
        100: "#f7fafc",
        // ...
        900: "#1a202c",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}
