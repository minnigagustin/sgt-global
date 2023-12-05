import { AxiosUrl } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";

export const proyeccionGet = createAsyncThunk(
  "user/proyeccion/",
  async (
    {
      sucursal = null,
      id = null,
      fecha_inicio = null,
      fecha_fin = null,
    }: {
      sucursal?: string | null;
      id?: string | null;
      fecha_inicio?: string | null;
      fecha_fin?: string | null;
    },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      // Crear un objeto que contendrá los parámetros que deseas enviar en la solicitud GET
      const params: Record<string, string | null> = {};

      // Agregar fecha_inicio y fecha_fin solo si no son nulos
      if (fecha_inicio !== null) {
        params.fecha_inicio = fecha_inicio;
      }
      if (fecha_fin !== null) {
        params.fecha_fin = fecha_fin;
      }

      const response: any = await AxiosUrl.get(`proyeccion_api.php`, {
        params: params, // Pasar los parámetros al request GET
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

export const ventasGet = createAsyncThunk(
  "user/proyeccion/ventas",
  async (
    {
      id_sucursal = null,
      fecha_inicio = null,
      fecha_fin = null,
    }: {
      id_sucursal?: string | null;
      fecha_inicio?: string | null;
      fecha_fin?: string | null;
    },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      // Crear un objeto que contendrá los parámetros que deseas enviar en la solicitud GET
      const params: Record<string, string | null> = {};

      // Agregar fecha_inicio y fecha_fin solo si no son nulos
      params.id_sucursal = id_sucursal;
      if (fecha_inicio !== null) {
        params.periodo_inicio = fecha_inicio;
      }
      if (fecha_fin !== null) {
        params.periodo_fin = fecha_fin;
      }

      const response: any = await AxiosUrl.get(`ventas_api.php`, {
        params: params, // Pasar los parámetros al request GET
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
export const proveedoresGet = createAsyncThunk(
  "user/proveedores",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.get(`proveedores_api.php`);
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
      const response: any = await axios.get(
        `http://128.0.202.248:8000/intervensiones_familiares/3&2023`
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
  gruposfamiliares: number;
  intervenciones: number;
  fichadas: any;
  totalhoras?: Number;
  proveedores?: any;
  sucursales?: any;
  usuario?: any;
  ventas?: any;
  error: {
    status?: number;
    message: string;
    isPinError?: boolean;
  };
}

const initialState: Pros = {
  loading: false,
  personasregistradas: [],
  proveedores: [],
  sucursales: [],
  gruposfamiliares: 0,
  intervenciones: 0,
  totalhoras: 0,
  usuario: {},
  fichadas: [],
  ventas: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const proyeccionSlice = createSlice({
  name: "proyeccion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(proyeccionGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(proyeccionGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.sucursales = payload;

      console.log(payload, "este ess");
    });
    builder.addCase(proyeccionGet.rejected, (state, action: any) => {
      state.loading = true;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(ventasGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ventasGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.ventas = payload;

      console.log(payload, "este ess");
    });
    builder.addCase(ventasGet.rejected, (state, action: any) => {
      state.loading = true;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(proveedoresGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(proveedoresGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.proveedores = payload.Proveedores;
      console.log(payload, "este ess");
    });
    builder.addCase(proveedoresGet.rejected, (state, action: any) => {
      state.loading = true;
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

export default proyeccionSlice.reducer;
