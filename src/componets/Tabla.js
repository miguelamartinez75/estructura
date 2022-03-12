import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Icon } from '@mui/material';
import Internacional from '../service/Internacional'
import EditarDialog from './EditarDialog';
import DetalleDialog from './DetalleDialog'
import EliminarDialog from './EliminarDialog';
import InsertarDialog from './InsertarDialog';

function Tabla() {
  const [dialogInsertar, setdialogInsertar] = useState(false);
  const [dialogEditar, setdialogEditar] = useState(false);
  const [dialogEliminar, setdialogEliminar] = useState(false);
  const [dialogDetalle, setdialogDetalle] = useState(false);
  const [cargoSeleccionado, setCargoSeleccionado] = useState({
    id: "",
    name: "",
    parent: ""
  })
  
  // Selecciona el cargo para:
  const seleccionarCargo = (cargo, accion) => {
    setCargoSeleccionado(cargo);
    (accion === "Insertar") ? abrirCerrardialogInsertar()
      :
      (accion === "Editar") ? abrirCerrardialogEditar()
        :
        (accion === "Detalle") ? abrirCerrardialogDetalle()
          :
          abrirCerrardialogEliminar()
  }

  // Abrir o Cerrar ventana dialog (insertar)
  const abrirCerrardialogInsertar = () => {
    setdialogInsertar(!dialogInsertar);
  }

  // Abrir o Cerrar ventana dialog (editar)
  const abrirCerrardialogEditar = () => {
    setdialogEditar(!dialogEditar);
  }

  // Abrir o Cerrar ventana dialog (Borrar)
  const abrirCerrardialogEliminar = () => {
    setdialogEliminar(!dialogEliminar);
  }

  // Abrir o Cerrar ventana dialog (Detalle)
  const abrirCerrardialogDetalle = () => {
    setdialogDetalle(!dialogDetalle);
  }

  // Obtiene los datos JSON
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    fetch("http://localhost:8000/api/est/")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [tableData])

  return (
    <div>
      <MaterialTable
        title="Estructura"
        data={tableData}
        collapseContent={true}
        actions={[
          {
            icon: () => <Icon color="primary">addbox</Icon>,
            tooltip: 'Agregar dependencia',
            onClick: (event, rowData) => {
              // Funcion para ver el detalleS
              seleccionarCargo(rowData, "Insertar")
            }
          },
          {
            icon: () => <Icon color="primary">article</Icon>,
            tooltip: 'Ver detalle',
            onClick: (event, rowData) => {
              // Funcion para ver el detalleS
              seleccionarCargo(rowData, "Detalle")
            }
          },
          {
            icon: () => <Icon color="success">edit</Icon>,
            tooltip: 'Editar cargo',
            onClick: (event, rowData) => {
              // Funcion para editar
              seleccionarCargo(rowData, "Editar")
            }
          },
          {
            icon: () => <Icon color="warning">delete_forever</Icon>,
            tooltip: 'Borrar cargo',
            onClick: (event, rowData) => {
              // Funcion de borrado
              seleccionarCargo(rowData, "Eliminar")
            }
          },
          {
            icon: () => <Icon color='secondary'>add_circle</Icon>,
            tooltip: 'Crear nuevo cargo',
            isFreeAction: true,
            onClick: (event, rowData) => {
              // Funcion para crear uno nuevo
              seleccionarCargo(rowData, "Insertar")
            }
          }]}
        columns={[
          { title: 'Nombre', field: 'name' },
          // { title: 'Mission', field: 'mission' },
          // { title: 'Function', field: 'function' },
        ]}
        localization={Internacional}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parent)}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      {/* Dialogo Detalle*/}
      <Dialog fullWidth maxWidth="sm" open={dialogDetalle} onClose={abrirCerrardialogDetalle}>
        <DialogTitle>Ver detalle del Cargo</DialogTitle>
        <DialogContent>
          <DetalleDialog cargoSeleccionado={cargoSeleccionado} datosNuevos={tableData} abrirCerrardialogEditar={abrirCerrardialogEditar} />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => abrirCerrardialogDetalle()}>Cerrar</Button>
        </DialogActions >
      </Dialog>

      {/* Dialogo Editar*/}
      <Dialog fullWidth maxWidth="sm" open={dialogEditar} onClose={abrirCerrardialogEditar}>
        <DialogTitle>Editar el cargo</DialogTitle>
        <DialogContent>
          <EditarDialog cargoSeleccionado={cargoSeleccionado} datos={tableData} abrirCerrardialogEditar={abrirCerrardialogEditar} />
        </DialogContent>
      </Dialog>

      {/* Dialogo Insertar*/}
      <Dialog fullWidth maxWidth="sm" open={dialogInsertar} onClose={abrirCerrardialogInsertar}>
        <DialogTitle>Editar el cargo</DialogTitle>
        <DialogContent>
          <InsertarDialog cargoSeleccionado={cargoSeleccionado} datos={tableData} abrirCerrardialogInsertar={abrirCerrardialogInsertar} />
        </DialogContent>
      </Dialog>

      {/* Dialogo Elininar*/}
      <Dialog fullWidth maxWidth="sm" open={dialogEliminar} onClose={abrirCerrardialogEliminar}>
        <EliminarDialog cargoSeleccionado={cargoSeleccionado} abrirCerrardialogEliminar={abrirCerrardialogEliminar} />
      </Dialog>
    </div>
  );
}
export default Tabla;