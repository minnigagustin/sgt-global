import { AxiosUrl } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";

export const GetProveedoresTotales = createAsyncThunk(
  "user/personas/lista",
  async (
    {
      fecha_inicio = null,
      fecha_fin = null,
      sucursal = null,
    }: {
      fecha_inicio?: string | null;
      fecha_fin?: string | null;
      sucursal?: string | null;
    },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      let url = "obtener_total_proveedores.php";

      if (fecha_inicio !== null || fecha_fin !== null || sucursal !== null) {
        url += "?";

        if (fecha_inicio !== null) {
          url += `fecha_inicio=${fecha_inicio}`;
        }

        if (fecha_fin !== null) {
          url +=
            fecha_inicio !== null
              ? `&fecha_fin=${fecha_fin}`
              : `fecha_fin=${fecha_fin}`;
        }

        if (sucursal !== "") {
          url +=
            fecha_inicio !== null || fecha_fin !== null
              ? `&sucursal=${sucursal}`
              : `sucursal=${sucursal}`;
        }
      }

      const response = await AxiosUrl.get(url);
      console.log(response.data, "esto llego");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const comerciosGet = createAsyncThunk(
  "user/comercios",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.get(`zonas.php`);
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

export const DeliveryGet = createAsyncThunk(
  "user/delivery",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.get(`deliverytotal.php`);
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

export const gruposGet = createAsyncThunk(
  "user/grupos",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.get(`cantidad_grupos_familiares`);
      //@ts-ignore
      console.log(response.data, "esto llego");
      //@ts-ignore
      return response.data[0];
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const intervencionesGet = createAsyncThunk(
  "user/intervenciones",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.get(
        `intervensiones_familiares/3&2023`
      );
      //@ts-ignore
      console.log(response.data, "esto llego");
      //@ts-ignore
      return response.data[0];
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
  empleadosregistrados: any;
  gruposfamiliares: number;
  intervenciones: number;
  comercios: any;
  delivery?: any;
  zonas?: any;
  proveedoresTotales?: any;
  error: {
    status?: number;
    message: string;
    isPinError?: boolean;
  };
}

const initialState: Pros = {
  loading: false,
  personasregistradas: [],
  empleadosregistrados: [],
  gruposfamiliares: 0,
  intervenciones: 0,
  comercios: [],
  delivery: [],
  proveedoresTotales: [],

  zonas: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const inicioSlice = createSlice({
  name: "inicio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProveedoresTotales.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetProveedoresTotales.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.proveedoresTotales = payload;
      console.log(payload, "este ess");
    });
    builder.addCase(GetProveedoresTotales.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(DeliveryGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeliveryGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.delivery = payload.Delivery;
      console.log(payload, "este ess");
    });
    builder.addCase(DeliveryGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(intervencionesGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(intervencionesGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.intervenciones = payload.Intervisiones;
      console.log(payload, "este ess");
    });
    builder.addCase(intervencionesGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(comerciosGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(comerciosGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.comercios = payload.Comercios;
      state.zonas = payload.Zonas;

      console.log(payload, "este ess");
    });
    builder.addCase(comerciosGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(gruposGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gruposGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.gruposfamiliares = payload.CGF;
      console.log(payload, "este ess");
    });
    builder.addCase(gruposGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
  },
});

export default inicioSlice.reducer;
