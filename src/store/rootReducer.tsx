import { combineReducers } from "@reduxjs/toolkit";
import fichadasSlice from "./proveedoresSlice";
import inicioSlice from "./inicioSlice";
import productosSlice from "./productosSlice";
import sucursalesSlice from "./sucursalesSlice";
import usuariosSlice from "./usuariosSlice";
import certificadosSlice from "./certificadosSlice";
import facturacionSlice from "./facturacionSlice";
import internosSlice from "./internosSlice";
import reportesSlice from "./reportesSlice";
import proyeccionSlice from "./proyeccionSlice";
import externosSlice from "./externosSlice";

export default combineReducers({
  inicio: inicioSlice,
  productos: productosSlice,
  proveedores: fichadasSlice,
  sucursales: sucursalesSlice,
  usuarios: usuariosSlice,
  certificados: certificadosSlice,
  facturacion: facturacionSlice,
  internos: internosSlice,
  reportes: reportesSlice,
  proyeccion: proyeccionSlice,
  externos: externosSlice,
});
