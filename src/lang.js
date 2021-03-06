export default {
  es: {
    table: {
      // for filter panel
      page: "Página",
      more: "Más",
      to: "A",
      of: "De",
      next: "Siguiente",
      last: "Último",
      first: "Primero",
      previous: "Previo",
      loadingOoo: "Cargando...",
      // for set filter
      selectAll: "Seleccionar Todo",
      searchOoo: "Buscar...",
      blanks: "Nada",
      // for number filter and text filter
      filterOoo: "Filtro...",
      applyFilter: "Aplicar Filtro...",
      equals: "Igual",
      notEquals: "No Igual",
      notEqual: "No Igual",
      // for number filter
      lessThan: "Menor",
      greaterThan: "Mayor",
      lessThanOrEqual: "Menor o igual",
      greaterThanOrEqual: "Mayor o igual",
      inRange: "Rango",
      // for text filter
      contains: "Contiene",
      notContains: "No contiene",
      startsWith: "Comienza por",
      endsWith: "Acaba en",
      // the header of the default group column
      group: "Agrupado",
      // tool panel
      columns: "Columnas",
      filters: "Filtros",
      rowGroupColumns: "Agrupar (Cols)",
      rowGroupColumnsEmptyMessage: "Arrastra aquí columnas para agruparlas",
      valueColumns: "Valores (Cols)",
      pivotMode: "Modo Pivote",
      groups: "Grupos",
      values: "Valores",
      pivots: "Pivotes",
      valueColumnsEmptyMessage: "Arrastra aquí columnas para cálculos",
      pivotColumnsEmptyMessage: "Arrastra aquí columnas para pivotes",
      toolPanelButton: "Panel de herramientas",
      // other
      noRowsToShow: "No hay Datos",
      // enterprise menu
      pinColumn: "Fijar Columna",
      valueAggregation: "Calcular Valor",
      autosizeThiscolumn: "Ajustar esta columna",
      autosizeAllColumns: "Ajustar todas las columnas",
      groupBy: "Agrupar por",
      ungroupBy: "Desagrupar por",
      resetColumns: "Resetear estas columnas",
      expandAll: "Expandir todo",
      collapseAll: "Contraer todo",
      toolPanel: "Panel Herramientas",
      export: "Exportar",
      csvExport: "Exportar a CSV",
      excelExport: "Exportar a Excel",
      // enterprise menu pinning
      pinLeft: "Izquierda",
      pinRight: "Derecha",
      noPin: "No fijar",
      // enterprise menu aggregation and status bar
      sum: "Suma",
      min: "Mínimo",
      max: "Máximo",
      none: "Nada",
      count: "Contar",
      avg: "Promedio",
      average: "Promedio",
      // standard menu
      copy: "Copiar",
      copyWithHeaders: "Copiar con Cabeceras",
      ctrlC: "Control+C",
      paste: "Pegar",
      ctrlV: "Control+V",
      // añadidos de prueba en status Bar
      filteredRowCount: "Filtrados",
      rowCount: "Registros totales",
      selectedRowCount: "Seleccionado",

    },
    error404: {
      PaginaError: "Página inexistente",
      PaginaText: "Lo sentimos, la página solicitada no existe, fué eliminada, cambiada de nombre o está temporalmente indisponible"
    },
    // MENU
    menu: {
      Recibos: "Recibos",
      Liquidaciones: "Liquidaciones",
      Polizas: "Polizas",
      Clientes: "Clientes",
      Siniestros: "Siniestros",
      Usuarios: "Usuarios",
      Registros: "Registros"
    },
    // BASE DATOS
    db: {
      Usuario: "Usuario",
      Nombre: "Nombre",
      Correo: "Correo",
      Oficina: "Oficina",
      AClientes: "Acceso Clientes",
      ARecibos: "Acceso Recibos",
      APolizas: "Acceso Polizas",
      ASiniestros: "Acceso Siniestros",
      AUsuarios: "Acceso Usuarios",
      Filtro: "Filtro",
      SM: "SubMediador",
      Mensajes: "Mensajes",
      // RECIBOS
      Estado: "Estado",
      FechaEfecto: "Fecha Efecto",
      Gestion: "Gestión",
      FechaGestion: "Fecha Gestion",
      NombreTomador: "Nombre",
      CodigoPoliza: "Poliza",
      Importe: "Importe",
      Cobrado: "Cobrado",
      CodigoRecibo: "Recibo",
      CodigoRamo: "Ramo",
      Situacion: "Fecha Situación",
      CodigoMediador: "Mediador",
      CodigoGestor: "Gestor",
      FechaVencimiento: "Fecha Vencimiento",
      ImporteBonificacion: "Importe Bonificación",
      ImporteNeto: "Importe Neto",
      FormaPago: "Forma Pago",
      CIA: "Compañia",
      BitManual: "Bit Manual",
      // POLIZAS
      FechaAlta: "Fecha Alta",
      FechaBaja: "Fecha Baja",
      FechaVencimientoSuplemento: "Fecha Vencimiento",
      Documento: "NIF",
      Apellidos: "Apellidos",
      Nombre: "Nombre",
      Ramo: "Ramo",
      Modalidad: "Modalidad",
      CodigoModelo: "Modelo",
      Matricula: "Matrícula",
      SubCodigoMediador: "SM",
      TipoInformacion: "Tipo",
      // CONFIGURACION
      DiasUrgentes: "Días Urgentes",
      Oficina: "Oficina",
      ActRecibos: "Fecha Act. Recibos",
      ActPolizas: "Fecha Act. Polizas",
      // CLIENTES
      NombreCompleto: "Nombre Completo",
      Correo: "Correo",
      Telefono: "Teléfono",
      Direccion: "Dirección",
      Ciudad: "Ciudad",
      Provincia: "Provincia",
      CP: "CP",
      NIF: "NIF",
      CuentaCorriente: "Cuenta Corriente",
      Tipo: "Tipo",
      Aviso: "Aviso",
      Idioma: "Idioma",
      // RECIBOS GESTION
      FechaGestion: "Fecha Gestión",
      Cliente: "Cliente",
      Comentarios: "Comentarios",
      FechaAviso: "Fecha Aviso",
      Fecha: "Fecha",
      Operacion: "Operacion",
      // CAJA
      Concepto: "Concepto"
    },
    // GESTION
    gestion: [
      {
        value: "PEPE",
        text: "PENDIENTE (Pendiente)"
      },
      {
        value: "PEAS",
        text: "PENDIENTE (Asesoría)"
      },
      {
        value: "PERJ",
        text: "PENDIENTE (RJ)"
      },
      {
        value: "COME",
        text: "COBRADO (Metálico)"
      },
      {
        value: "COTA",
        text: "COBRADO (Tarjeta)"
      },
      {
        value: "COTR",
        text: "COBRADO (Transferencia)"
      },
      {
        value: "COBA",
        text: "COBRADO (Banco)"
      },
      {
        value: "ANAJ",
        text: "ANULADO (Ajuste)"
      },
      {
        value: "ANBA",
        text: "ANULADO (Baja)"
      }
    ],
    // ESTADOS
    estados: [
      {
        value: "PENDIENTE",
        text: "PENDIENTE"
      },
      {
        value: "DEVUELTO",
        text: "DEVUELTO"
      },
      {
        value: "COBRADO",
        text: "COBRADO"
      },
      {
        value: "ANULADO",
        text: "ANULADO"
      },
      {
        value: "EMITIDO",
        text: "EMITIDO"
      }
    ],
    // FILTER BY USER
    userby: [
      {
        value: "NombreTomador",
        text: "Cliente"
      },
      {
        value: "CodigoRecibo",
        text: "Recibo"
      },
      {
        value: "CodigoPoliza",
        text: "Poliza"
      }
    ],
    // CAJA GESTION
    caja: [
      {
        value: "COME",
        text: "Metálico"
      },
      {
        value: "COTR",
        text: "Transferencia"
      },
    ],
    ayuda: [
      "Recibos sin tratamiento",
      "Recibos Pendientes y en curso",
      "Recibos anulados por Reale u Oficina",
      "Recibos cobrados por Reale u Oficina",
      "Recibos Urgentes con más de 25 días sin resolver",
      "Recibos que tienen un error de gestión"
    ],
    // PAGINA PRINCIPAL
    InicioSesion: "Inicio de sesión",
    Usuario: "Usuario",
    Clave: "Clave",
    UsuarioClaveIncorrecta: "Usuario o clave incorrecta",
    Bienvenido: "Bienvenid@ ",
    Desconectado: "Desconectado correctamente",
    ErrorRed: "Error de Red",
    CerrarSesion: "Cerrar Sesion",
    Aceptar: "Aceptar",
    Cancelar: "Cancelar",
    // GENERAL
    NuevoRecibo: "Nuevo Recibo",
    EliminarRecibo: "Eliminar Recibo",
    NuevaGestion: "Nueva Gestión",
    NuevoMovimiento: "Nuevo Movimiento",
    EditarGestion: "Editar",
    EliminarGestion: "Eliminar Gestión",
    EliminarGestionT: "Eliminar gestión del recibo",
    FiltroRapido: "Filtro Rápido",
    FiltrosDeEstado: "Filtros de Estado",
    HistorialUsuario: "Historial de recibos por:",
    TodosLosRegistrosT: "Por defecto se filtran los últimos 13 meses",
    TodosLosRegistros: "Mostrar Todos los Recibos",
    Gestion: "Gestión",
    Altas: "Altas",
    Bajas: "Bajas",
    BajasPendientes: "Bajas pendientes",
    ano: "Año",
    mes: "Mes",
    semana: "Semana",
    Liquidacion: "Liquidación",
    SinAutorizacion: "Sin Autorización",
    //REGISTROS
    Nuevo: "Nuevo",
    Editar: "Editar",
    Eliminar: "Eliminar",
    Guardar: "Guardar",
    Cerrar: "Cerrar",
    DatosGuardados: "Datos Guardados",
    ErrorOperacion: "Error en la operación",
    EliminarRegistro: "¿Desea eliminar este registro?",
    CampoObligatorio: "Campo obligatorio"
  },
  ca: {
    table: {
      // for filter panel
      page: "Pàgina",
      more: "Més",
      to: "A",
      of: "De",
      next: "Següent",
      last: "Últim",
      first: "Primer",
      previous: "Previ",
      loadingOoo: "Carregant...",
      // for set filter
      selectAll: "Seleccionar Tot",
      searchOoo: "Buscar...",
      blanks: "Res",
      // for number filter and text filter
      filterOoo: "Filtre...",
      applyFilter: "Aplicar Filtre...",
      equals: "Igual",
      notEquals: "No Igual",
      notEqual: "No Igual",
      // for number filter
      lessThan: "Menor",
      greaterThan: "Major",
      lessThanOrEqual: "Menor o igual",
      greaterThanOrEqual: "Major o igual",
      inRange: "Rang",
      // for text filter
      contains: "Conté",
      notContains: "No conté",
      startsWith: "Comença per",
      endsWith: "Acaba en",
      // the header of the default group column
      group: "Agrupat",
      // tool panel
      columns: "Columnes",
      filters: "Filtres",
      rowGroupColumns: "Agrupar (Cols)",
      rowGroupColumnsEmptyMessage: "Arrossega aqui columnes para agrupar-les",
      valueColumns: "Valors (Cols)",
      pivotMode: "Mode Pivot",
      groups: "Grups",
      values: "Valors",
      pivots: "Pivots",
      valueColumnsEmptyMessage: "Arrossega aqui cloumnes per càlculs",
      pivotColumnsEmptyMessage: "Arrossega aqui cloumnes per pivots",
      toolPanelButton: "Panel d'eines",
      // other
      noRowsToShow: "No hi han dades",
      // enterprise menu
      pinColumn: "Fixar Columna",
      valueAggregation: "Calcular Valor",
      autosizeThiscolumn: "Ajusta aquesta columna",
      autosizeAllColumns: "Ajusta totes les columnes",
      groupBy: "Agrupar per",
      ungroupBy: "Desagrupar per",
      resetColumns: "Resetejar aquestes columnes",
      expandAll: "Expandir tot",
      collapseAll: "Contraure tot",
      toolPanel: "Panel d'eines",
      export: "Exportar",
      csvExport: "Exportar a CSV",
      excelExport: "Exportar a Excel",
      // enterprise menu pinning
      pinLeft: "Esquerra",
      pinRight: "Dreta",
      noPin: "No fixar",
      // enterprise menu aggregation and status bar
      sum: "Suma",
      min: "Mínim",
      max: "Máxim",
      none: "Res",
      count: "Contar",
      avg: "Promig",
      average: "Promig",
      // standard menu
      copy: "Copiar",
      copyWithHeaders: "Copiaramb capceleres",
      ctrlC: "Control+C",
      paste: "Pegar",
      ctrlV: "Control+V",
      // añadidos de prueba en status Bar
      filteredRowCount: "Filtrats",
      rowCount: "Registres totals",
      selectedRowCount: "Seleccionat"
    },
    error404: {
      PaginaError: "Pàgina inexistent",
      PaginaText: "Disculpeu, la pàgina sol·licitada no existeix, va ser esborrada, canviada de nom o està temporalment indisponible"
    },
    // MENU
    menu: {
      Recibos: "Rebuts",
      Liquidaciones: "Liquidacions",
      Polizas: "Pòlisses",
      Clientes: "Clients",
      Siniestros: "Sinistres",
      Usuarios: "Usuaris",
      Registros: "Registres"
    },
    db: {
      Usuario: "Usuari",
      Nombre: "Nom",
      Correo: "Correu",
      Oficina: "Oficina",
      AClientes: "Accés Clients",
      ARecibos: "Accés Rebuts",
      APolizas: "Accés Pòlisses",
      ASiniestros: "Accés Sinistres",
      AUsuarios: "Accés Usuaris",
      Filtro: "Filtre",
      SM: "SubMediador",
      Mensajes: "Missatjes",
      // RECIBOS
      Estado: "Estat",
      FechaEfecto: "Data Efecte",
      Gestion: "Gestió",
      FechaGestion: "Data Gestió",
      NombreTomador: "Nom",
      CodigoPoliza: "Pòlissa",
      Importe: "Import",
      Cobrado: "Cobrat",
      CodigoRecibo: "Rebut",
      CodigoRamo: "Ram",
      Situacion: "Data Situació",
      CodigoMediador: "Mediador",
      CodigoGestor: "Gestor",
      FechaVencimiento: "Data Venciment",
      ImporteBonificacion: "Import Bonificació",
      ImporteNeto: "Import Net",
      FormaPago: "Forma Pagament",
      CIA: "Companyia",
      BitManual: "Bit Manual",
      // POLIZAS
      FechaAlta: "Data Alta",
      FechaBaja: "Data Baixa",
      FechaVencimientoSuplemento: "Data Vencimient",
      Documento: "NIF",
      Apellidos: "Cognoms",
      Nombre: "Nom",
      Ramo: "Ram",
      Modalidad: "Modalitat",
      CodigoModelo: "Model",
      Matricula: "Matricula",
      SubCodigoMediador: "SM",
      TipoInformacion: "Tipus",
      // CONFIGURACION
      DiasUrgentes: "Dies Urgents",
      Oficina: "Oficina",
      ActRecibos: "Data Act. Rebuts",
      ActPolizas: "Data Act. Pòlisses",
      // CLIENTES
      NombreCompleto: "Nom Complert",
      Correo: "Correu",
      Telefono: "Telèfon",
      Direccion: "Adreça",
      Ciudad: "Ciutat",
      Provincia: "Provincia",
      CP: "CP",
      NIF: "NIF",
      CuentaCorriente: "Compte Corrent",
      Tipo: "Tipus",
      Aviso: "Avís",
      Idioma: "Idioma",
      // RECIBOS GESTION
      FechaGestion: "Data Gestió",
      Cliente: "Client",
      Comentarios: "Comentaris",
      FechaAviso: "Data Avís",
      Fecha: "Data",
      Operacion: "Operació",
      // CAJA
      Concepto: "Concepte"
    },
    // GESTIO
    gestion: [
      {
        value: "PEPE",
        text: "PENDENT (Pendent)"
      },
      {
        value: "PEAS",
        text: "PENDENT (Assesoria)"
      },
      {
        value: "PERJ",
        text: "PENDENT (RJ)"
      },
      {
        value: "COME",
        text: "COBRAT (Metàlic)"
      },
      {
        value: "COTA",
        text: "COBRAT (Tarja)"
      },
      {
        value: "COTR",
        text: "COBRAT (Transfèrencia)"
      },
      {
        value: "COBA",
        text: "COBRAT (Banc)"
      },
      {
        value: "ANAJ",
        text: "ANUL·LAT (Ajust)"
      },
      {
        value: "ANBA",
        text: "ANUL·LAT (Baixa)"
      }
    ],
    // FILTER BY USER
    userby: [
      {
        value: "NombreTomador",
        text: "Client"
      },
      {
        value: "CodigoRecibo",
        text: "Rebut"
      },
      {
        value: "CodigoPoliza",
        text: "Pòlissa"
      }
    ],
    // ESTADOS
    estados: [
      {
        value: "PENDIENTE",
        text: "PENDENT"
      },
      {
        value: "DEVUELTO",
        text: "TORNAT"
      },
      {
        value: "COBRADO",
        text: "COBRAT"
      },
      {
        value: "ANULADO",
        text: "ANUL·LAT"
      },
      {
        value: "EMITIDO",
        text: "EMÉS"
      }
    ],
    // CAJA GESTION
    caja: [
      {
        value: "COME",
        text: "Metàlic"
      },
      {
        value: "COTR",
        text: "Transferència"
      },
    ],
    ayuda: [
      "Rebuts sense tractament",
      "Rebuts Pendents i en curs",
      "Rebuts anul·lats per Reale o oficina",
      "Rebuts cobrats per Reale o oficina",
      "Rebuts Urgents amb més de 25 dies sense resoldre",
      "Rebuts que tenen un error de gestió"
    ],
    // PAGINA PRINCIPAL
    InicioSesion: "Inici de sesió",
    Usuario: "Usuari",
    Clave: "Contrasenya",
    UsuarioClaveIncorrecta: "Usuari o clau incorrecta",
    Bienvenido: "Benvingut ",
    Desconectado: "Desconectay correctament",
    ErrorRed: "Error de Xarxa",
    CerrarSesion: "Tancar Sessió",
    Aceptar: "Acceptar",
    Cancelar: "Cancelar",
    // GENERAL
    NuevoRecibo: "Nou Rebut",
    EliminarRecibo: "Eliminar rebut",
    NuevaGestion: "Nova Gestió",
    NuevoMovimiento: "Nou Moviment",
    EditarGestion: "Editar",
    EditarGestionT: "Editar gestió de rebut seleccionat",
    EliminarGestion: "Eliminar Gestió",
    FiltroRapido: "Filtre Ràpid",
    FiltrosDeEstado: "Filtres d'estat",
    HistorialUsuario: "Historial de rebuts per:",
    TodosLosRegistrosT: "Per defecte, es mostren els últims 13 messos",
    TodosLosRegistros: "Ensenya tots els rebuts",
    Gestion: "Gestió",
    Altas: "Altes",
    Bajas: "Baixes",
    BajasPendientes: "Baixes pendents",
    ano: "Any",
    mes: "Mes",
    semana: "Setmana",
    Liquidacion: "Liquidació",
    SinAutorizacion: "Sense autorització",
    //REGISTROS
    Nuevo: "Nou",
    Editar: "Editar",
    Eliminar: "Eliminar",
    Guardar: "Guardar",
    Cerrar: "Tancar",
    DatosGuardados: "Dades enregistrades",
    ErrorOperacion: "Error en la operació",
    EliminarRegistro: "Vols esborrar aquest registre?",
    CampoObligatorio: "Camp obligatori"
  }
};
