import { AxiosUrl } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";

export const certificadosGet = createAsyncThunk(
  "user/certificados/",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosUrl.post(`certificados_api.php`);
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
  certificados?: any;
  totalhoras?: Number;
  proveedores?: any;
  sucursales?: any;
  usuario?: any;
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
  certificados: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const certificadosSlice = createSlice({
  name: "certificados",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(certificadosGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(certificadosGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.certificados = payload.Certificados;

      console.log(payload, "este ess");
    });
    builder.addCase(certificadosGet.rejected, (state, action: any) => {
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

export default certificadosSlice.reducer;
