export default {
  isoName: 'es',
  nativeName: 'Español',
  label: {
    clear: 'Borrar',
    ok: 'OK',
    cancel: 'Cancelar',
    close: 'Cerrar',
    set: 'Establecer',
    select: 'Seleccionar',
    reset: 'Restablecer',
    remove: 'Eliminar',
    update: 'Actualizar',
    create: 'Crear',
    search: 'Buscar',
    filter: 'Filtrar',
    refresh: 'Actualizar'
  },
  date: {
    days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
    daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true
  },
  table: {
    noData: 'Sin datos disponibles',
    noResults: 'No se encontraron resultados',
    loading: 'Cargando...',
    selectedRecords: function (rows) {
      return rows > 1
        ? rows + ' filas seleccionadas.'
        : (rows === 0 ? 'Sin' : '1') + ' fila seleccionada.'
    },
    recordsPerPage: 'Filas por página:',
    allRows: 'Todas',
    pagination: function (start, end, total) {
      return start + '-' + end + ' de ' + total
    },
    columns: 'Columnas'
  },
  editor: {
    url: 'URL',
    bold: 'Negrita',
    italic: 'Itálico',
    strikethrough: 'Tachado',
    underline: 'Subrayado',
    unorderedList: 'Lista Desordenada',
    orderedList: 'Lista Ordenada',
    subscript: 'Subíndice',
    superscript: 'Superíndice',
    hyperlink: 'Hipervínculo',
    toggleFullscreen: 'Alternar pantalla completa',
    quote: 'Cita',
    left: 'Alineación izquierda',
    center: 'Alineación centro',
    right: 'Alineación derecha',
    justify: 'Justificar alineación',
    print: 'Imprimir',
    outdent: 'Disminuir indentación',
    indent: 'Aumentar indentación',
    removeFormat: 'Eliminar formato',
    formatting: 'Formato',
    fontSize: 'Tamaño de Fuente',
    align: 'Alinear',
    hr: 'Insertar línea horizontal',
    undo: 'Deshacer',
    redo: 'Rehacer',
    header1: 'Encabezado 1',
    header2: 'Encabezado 2',
    header3: 'Encabezado 3',
    header4: 'Encabezado 4',
    header5: 'Encabezado 5',
    header6: 'Encabezado 6',
    paragraph: 'Párrafo',
    code: 'Código',
    size1: 'Muy pequeño',
    size2: 'Pequeño',
    size3: 'Normal',
    size4: 'Mediano',
    size5: 'Grande',
    size6: 'Muy grande',
    size7: 'Máximo',
    defaultFont: 'Fuente por defecto'
  },
  tree: {
    noNodes: 'Sin nodos disponibles',
    noResults: 'No se encontraron nodos correspondientes'
  },

  // NUEVA TRADUCCION
  Aceptar: "Aceptar",
  Cancelar: "Cancelar",
  login: {
    InicioSesion: "Inicio de sesión",
    Usuario: "Usuario",
    Clave: "Clave",
    Recordarme: "Recordarme"
  },
  recibo: {
    NuevoRecibo: "Nuevo Recibo",
    NuevoReciboT: "Crear nuevo recibo Temporal",
    EliminarRecibo: "Eliminar Recibo",
    EliminarReciboT: "Eliminar recibo de la base de datos",
    NuevaGestion: "Nueva Gestión",
    NuevaGestionT: "Gestionar Recibo seleccionado",
    EditarGestion: "Editar Gestión",
    EditarGestionT: "Editar gestión de recibo seleccionada",
    EliminarGestion: "Eliminar Gestión",
    EliminarGestionT: "Eliminar gestión del recibo",
    AyudaReciboT: "Ayuda sobre los colores de los recibos",
    RecibosSinTratamiento: "Recibos sin tratamiento",
    RecibosPendientes: "Recibos Pendientes y en curso",
    RecibosAnulados: "Recibos anulados por Reale u Oficina",
    RecibosCobrados: "Recibos cobrados por Reale u Oficina",
    RecibosUrgentes: "Recibos Urgentes con más de 25 días sin resolver",
    FiltroRapido: "Filtro Rápido",
    FiltrosDeEstado: "Filtros de Estado",
    SeleccionarFechas: "Seleccionar Fechas"
  },
  menu: {
    Recibos: "Reciboss",
    GestionDeRecibos: "Gestión de Recibos",
    BajasProvisionales: "Baja provisionales",
    Polizas: "Polizas",
    NuevaProduccion: "Nueva Producción",
    BajasDefinitivas: "Bajas Definitivas",
    Clientes: "Clientes",
    ListaDeClientes: "Lista de clientes",
    Siniestros: "Siniestros",
    ListaDeSiniestros: "Lista de siniestros",
    Usuarios:"Usuarios",
    GestionDeUsuarios: "Gestion de usuarios"

  }
}