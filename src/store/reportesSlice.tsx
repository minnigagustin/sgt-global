import { AxiosUrl } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";

export const reportesGet = createAsyncThunk(
  "user/reportes/",
  async (
    {
      nombreProveedor = null,
      fechaInicio = null,
      fechaFin = null,
    }: {
      nombreProveedor?: string | null;
      fechaInicio?: string | null;
      fechaFin?: string | null;
    },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const url =
        "categorias_desglose_api.php";

      const formData = new FormData();
      if (nombreProveedor !== null) {
        formData.append("nombreProveedor", nombreProveedor);
      }
      if (fechaInicio !== null) {
        formData.append("fechaInicio", fechaInicio);
      }
      if (fechaFin !== null) {
        formData.append("fechaFin", fechaFin);
      }

      const response = await AxiosUrl.post(url, formData);
      console.log(response.data, "esto llego");
      return response.data;
    } catch (error) {
      throw error; // Reject with the error object
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
      const response: any = await axios.get(
        `http://128.0.202.248:8000/cantidad_grupos_familiares`
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
  reportes?: any;
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
  reportes: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const reportesSlice = createSlice({
  name: "reportes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(reportesGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(reportesGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.reportes = payload.Desglose;
      console.log(payload, "este ess");
    });
    builder.addCase(reportesGet.rejected, (state, action: any) => {
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

export default reportesSlice.reducer;
