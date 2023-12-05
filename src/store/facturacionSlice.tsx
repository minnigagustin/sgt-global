import { AxiosUrl } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const facturasGet = createAsyncThunk(
  "user/facturas/",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.get(`facturacion_api.php`);
      //@ts-ignore
      console.log(response.data, "llegaron estas facturas:");
      //@ts-ignore
      return response.data.Facturas;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);
/*
export const ProductoGetId = createAsyncThunk(
  "user/producto/id",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await axios.post(
        `https://appspuntaltenses.com/losmussini/estadisticasproducto.php`,
        { id: data.id }
      );
      //@ts-ignore
      console.log(response.data, "esto llegos");
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);
*/

interface Pros {
  loading: boolean;
  personasregistradas: any;
  gruposfamiliares: number;
  producto?: any;
  factura?: any;
  intervenciones: number;
  estadisticas?: any;
  lista: any;
  productos?: any;
  facturas?: any;
  error: {
    status?: number;
    message: string;
    isPinError?: boolean;
  };
}

const initialState: Pros = {
  loading: false,
  personasregistradas: [],
  gruposfamiliares: 0,
  producto: {},
  factura: {},
  intervenciones: 0,
  estadisticas: [],
  productos: [],
  facturas: [],
  lista: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const facturacionSlice = createSlice({
  name: "facturacion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(facturasGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(facturasGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.facturas = payload;
      console.log(payload, "este es el payload de Facturacion");
    });
    builder.addCase(facturasGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    /*
    builder.addCase(ProductoGetId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ProductoGetId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.producto = payload.Producto;
      state.estadisticas = payload.Estadisticas;

      console.log(payload, "este ess");
    });
    builder.addCase(ProductoGetId.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    */
  },
});

export default facturacionSlice.reducer;
