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

  // MENU
  menu: {
    Recibos: "Rebuts",
    Polizas: "Pòlisses",
    Clientes: "Clients",
    Siniestros: "Sinistres",
    Usuarios: "Usuaris"
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
    Operacion: "Operació"
  },
  // GESTIO
  gestion: [
    { value: "PEPE", label: "PENDENT (Pendent)" },
    { value: "PEAS", label: "PENDENT (Assesoria)" },
    { value: "PERJ", label: "PENDENT (RJ)" },
    { value: "COME", label: "COBRAT (Metàlic)" },
    { value: "COTA", label: "COBRAT (Tarja)" },
    { value: "COTR", label: "COBRAT (Transfèrencia)" },
    { value: "COBA", label: "COBRAT (Banc)" },
    { value: "COOF", label: "COBRAT (Oficina)" },
    { value: "ANAJ", label: "ANUL·LAT (Ajust)" },
    { value: "ANBA", label: "ANUL·LAT (Baixa)" }
  ],
  // ESTADOS
  estados: [
    { value: "PENDIENTE", label: "PENDENT" },
    { value: "DEVUELTO", label: "TORNAT" },
    { value: "COBRADO", label: "COBRAT" },
    { value: "ANULADO", label: "ANUL·LAT" },
    { value: "EMITIDO", label: "EMÉS" }
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
  // GENERAL
  NuevoRecibo: "Nou Rebut",
  EliminarRecibo: "Eliminar rebut",
  NuevaGestion: "Nova Gestió",
  EditarGestion: "Editar",
  EditarGestionT: "Editar gestió de rebut seleccionat",
  EliminarGestion: "Eliminar Gestió",
  RecibosSinTratamiento: "Rebuts sense tractament",
  RecibosPendientes: "Rebuts Pendents i en curs",
  RecibosAnulados: "Rebuts anul·lats per Reale o oficina",
  RecibosCobrados: "Rebuts cobrats per Reale o oficina",
  RecibosUrgentes: "Rebuts Urgents amb més de 25 dies sense resoldre",
  RecibosError: "Rebuts que tenen un error de gestió",
  FiltroRapido: "Filtre Ràpid",
  FiltrosDeEstado: "Filtres de estat",
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
  ControlCaja: "Control Caixa",
  //REGISTROS
  Nuevo: "Nou",
  Editar: "Editar",
  Guardar: "Guardar",
  Cerrar: "Tancar",
  DatosGuardados: "Dades enregistrades"
}
