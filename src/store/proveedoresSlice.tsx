import { AxiosUrl } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";

export const fichadasGetUser = createAsyncThunk(
  "user/fichadasusuario/",
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
      let url = `obtener_facturas_proveedores.php?proveedor=${id}`;

      if (sucursal !== null || fecha_inicio !== null || fecha_fin !== null) {
        if (sucursal !== "") {
          url += `&sucursal=${sucursal}`;
        }

        if (fecha_inicio !== null) {
          url +=
            sucursal !== null
              ? `&fecha_inicio=${fecha_inicio}`
              : `fecha_inicio=${fecha_inicio}`;
        }

        if (fecha_fin !== null) {
          url +=
            sucursal !== null || fecha_inicio !== null
              ? `&fecha_fin=${fecha_fin}`
              : `fecha_fin=${fecha_fin}`;
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
  gruposfamiliares: number;
  intervenciones: number;
  fichadas: any;
  totalhoras?: Number;
  proveedores?: any;
  usuario?: any;
  totalproveedor: Number;
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

  gruposfamiliares: 0,
  intervenciones: 0,
  totalhoras: 0,
  totalproveedor: 0,
  usuario: {},
  fichadas: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const fichadasSlice = createSlice({
  name: "fichadas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fichadasGetUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fichadasGetUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.fichadas = payload.facturas;
      state.totalproveedor = payload.total_suma;
      state.usuario = payload.Usuario;

      console.log(payload, "este ess");
    });
    builder.addCase(fichadasGetUser.rejected, (state, action: any) => {
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

export default fichadasSlice.reducer;
