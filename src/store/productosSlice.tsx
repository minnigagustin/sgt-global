import { AxiosUrl } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";

export const productosGet = createAsyncThunk(
  "user/productos/",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.get(`productos_internos_api.php`);
      //@ts-ignore
      console.log(response.data, "esto llego");
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const ProductoGetId = createAsyncThunk(
  "user/producto/id",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.post(`estadisticasproducto.php`, {
        id: data.id,
      });
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

/* 
export const changePass = createAsyncThunk(
  "user/changePassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosRequest.put("/api/security/change/password", data);
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeProfileImage = createAsyncThunk(
  "user/changeProfileImage",
  async (data: any, { rejectWithValue }) => {
    try {
      const image = `data:image/jpg;base64,${data.base64}`;
      console.log(image);
      const response: any = await AxiosRequest.post("/api/user/profile_picture", { file: image });
      console.log('funciono');
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error, "falle aqui");
      return rejectWithValue(error.response.data);
    }
  }
); */

interface Pros {
  loading: boolean;
  personasregistradas: any;
  gruposfamiliares: number;
  producto?: any;
  intervenciones: number;
  estadisticas?: any;
  lista: any;
  productos?: any;
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
  intervenciones: 0,
  estadisticas: [],
  productos: [],
  lista: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const productosSlice = createSlice({
  name: "productos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productosGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(productosGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.lista = payload;
      console.log(payload, "este ess");
    });
    builder.addCase(productosGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
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
  },
});

export default productosSlice.reducer;
