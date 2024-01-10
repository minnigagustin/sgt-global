import { AxiosUrl } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const externosGet = createAsyncThunk(
  "user/externos/",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.get(`productos_externos_api.php`);
      //@ts-ignore
      console.log(response.data, "llegaron estos externos ahora:");
      //@ts-ignore
      return response.data;
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
  interno?: any;
  intervenciones: number;
  estadisticas?: any;
  lista: any;
  productos?: any;
  facturas?: any;
  externos?: any;
  internos?: any;
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
  interno: {},
  intervenciones: 0,
  estadisticas: [],
  productos: [],
  facturas: [],
  externos: [],
  internos: [],
  lista: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const externosSlice = createSlice({
  name: "externos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(externosGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(externosGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.externos = payload.Productos;
      console.log(payload, "este es el payload de Internos");
    });
    builder.addCase(externosGet.rejected, (state, action: any) => {
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

export default externosSlice.reducer;
