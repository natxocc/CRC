(function(e){function t(t){for(var o,l,s=t[0],r=t[1],c=t[2],u=0,m=[];u<s.length;u++)l=s[u],n[l]&&m.push(n[l][0]),n[l]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);d&&d(t);while(m.length)m.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],o=!0,l=1;l<a.length;l++){var r=a[l];0!==n[r]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var o={},n={app:0},i=[];function l(e){return s.p+"crc/js/"+({}[e]||e)+"."+{"chunk-2d0cba77":"3eb78ecd","chunk-2d0deb55":"c702fe82"}[e]+".js"}function s(t){if(o[t])return o[t].exports;var a=o[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(e){var t=[],a=n[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise(function(t,o){a=n[e]=[t,o]});t.push(a[2]=o);var i,r=document.createElement("script");r.charset="utf-8",r.timeout=120,s.nc&&r.setAttribute("nonce",s.nc),r.src=l(e),i=function(t){r.onerror=r.onload=null,clearTimeout(c);var a=n[e];if(0!==a){if(a){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,l=new Error("Loading chunk "+e+" failed.\n("+o+": "+i+")");l.type=o,l.request=i,a[1](l)}n[e]=void 0}};var c=setTimeout(function(){i({type:"timeout",target:r})},12e4);r.onerror=r.onload=i,document.head.appendChild(r)}return Promise.all(t)},s.m=e,s.c=o,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(a,o,function(t){return e[t]}.bind(null,o));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var u=0;u<r.length;u++)t(r[u]);var d=c;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"1a8b":function(e,t,a){e.exports=a.p+"crc/img/office.82bedbac.jpg"},"27f3":function(e,t,a){},"34c1":function(e,t,a){"use strict";a.r(t);a("28a5"),a("cadf"),a("551c"),a("097d");t["default"]={isoName:"es",nativeName:"Español",label:{clear:"Borrar",ok:"OK",cancel:"Cancelar",close:"Cerrar",set:"Establecer",select:"Seleccionar",reset:"Restablecer",remove:"Eliminar",update:"Actualizar",create:"Crear",search:"Buscar",filter:"Filtrar",refresh:"Actualizar"},date:{days:"Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),daysShort:"Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),months:"Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),monthsShort:"Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),firstDayOfWeek:1,format24h:!0},table:{noData:"Sin datos disponibles",noResults:"No se encontraron resultados",loading:"Cargando...",selectedRecords:function(e){return e>1?e+" filas seleccionadas.":(0===e?"Sin":"1")+" fila seleccionada."},recordsPerPage:"Filas por página:",allRows:"Todas",pagination:function(e,t,a){return e+"-"+t+" de "+a},columns:"Columnas"},editor:{url:"URL",bold:"Negrita",italic:"Itálico",strikethrough:"Tachado",underline:"Subrayado",unorderedList:"Lista Desordenada",orderedList:"Lista Ordenada",subscript:"Subíndice",superscript:"Superíndice",hyperlink:"Hipervínculo",toggleFullscreen:"Alternar pantalla completa",quote:"Cita",left:"Alineación izquierda",center:"Alineación centro",right:"Alineación derecha",justify:"Justificar alineación",print:"Imprimir",outdent:"Disminuir indentación",indent:"Aumentar indentación",removeFormat:"Eliminar formato",formatting:"Formato",fontSize:"Tamaño de Fuente",align:"Alinear",hr:"Insertar línea horizontal",undo:"Deshacer",redo:"Rehacer",header1:"Encabezado 1",header2:"Encabezado 2",header3:"Encabezado 3",header4:"Encabezado 4",header5:"Encabezado 5",header6:"Encabezado 6",paragraph:"Párrafo",code:"Código",size1:"Muy pequeño",size2:"Pequeño",size3:"Normal",size4:"Mediano",size5:"Grande",size6:"Muy grande",size7:"Máximo",defaultFont:"Fuente por defecto"},tree:{noNodes:"Sin nodos disponibles",noResults:"No se encontraron nodos correspondientes"},inicio:{InicioSesion:"Inicio de sesión",Usuario:"Usuario",Clave:"Clave",Recordarme:"Recordarme",CambiarIdiomaT:"Pulsa para cambiar el idioma",UsuarioClaveIncorrecta:"Usuario o clave incorrecta",SesionIniciada:"Sesion Iniciada"},recibo:{NuevoRecibo:"Nuevo Recibo",NuevoReciboT:"Crear nuevo recibo Temporal",EliminarRecibo:"Eliminar Recibo",EliminarReciboT:"Eliminar recibo de la base de datos",NuevaGestion:"Nueva Gestión",NuevaGestionT:"Gestionar Recibo seleccionado",EditarGestion:"Editar Gestión",EditarGestionT:"Editar gestión de recibo seleccionada",EliminarGestion:"Eliminar Gestión",EliminarGestionT:"Eliminar gestión del recibo",AyudaReciboT:"Ayuda sobre los colores de los recibos",RecibosSinTratamiento:"Recibos sin tratamiento",RecibosPendientes:"Recibos Pendientes y en curso",RecibosAnulados:"Recibos anulados por Reale u Oficina",RecibosCobrados:"Recibos cobrados por Reale u Oficina",RecibosUrgentes:"Recibos Urgentes con más de 25 días sin resolver",RecibosError:"Recibos que tienen un error de gestión",FiltroRapido:"Filtro Rápido",FiltrosDeEstado:"Filtros de Estado",TodosLosRegistrosT:"Por defecto se filtran los últimos 13 meses",TodosLosRegistros:"Mostrar Todos los Recibos",Gestion:"Gestión",GestionT:"Gestión de recibos",Bajas:"Bajas",BajasT:"Listado de Anulaciones Temporales",ano:"Año",mes:"Mes"},menu:{Recibos:"Recibos",Polizas:"Polizas",Clientes:"Clientes",Siniestros:"Siniestros",Usuarios:"Usuarios"}}},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("097d");var o=a("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("q-layout",[a("q-header",{attrs:{bordered:!0,elevated:!0,reveal:!0}},[a("q-toolbar",[a("q-btn",{attrs:{dense:"",flat:"",icon:"menu",round:""},on:{click:function(t){e.menu.left=!e.menu.left}}}),a("q-toolbar-title",[a("strong",[e._v("CRC")]),e._v(" Reale\n        ")]),a("q-space"),a("q-btn",{attrs:{label:e.lang,color:"secondary",size:"sm","text-color":"primary"}},[a("q-tooltip",[e._v(e._s(e.$q.lang.inicio.CambiarIdiomaT))]),a("q-menu",[a("q-list",{attrs:{dense:""}},[a("q-item",{directives:[{name:"close-menu",rawName:"v-close-menu"}],attrs:{clickable:""},on:{click:function(t){e.lang="ca"}}},[a("q-item-section",[e._v("CATALÀ")])],1),a("q-item",{directives:[{name:"close-menu",rawName:"v-close-menu"}],attrs:{clickable:""},on:{click:function(t){e.lang="es"}}},[a("q-item-section",[e._v("ESPAÑOL")])],1),a("q-separator")],1)],1)],1),a("q-btn",{attrs:{dense:"",flat:"",icon:"bug_report",round:""},on:{click:e.sendBug}}),a("q-btn",{attrs:{dense:"",flat:"",icon:"person",round:""},on:{click:e.userClick}})],1)],1),a("q-page-container",[a("div",{staticClass:"justify-around"},[a("q-dialog",{model:{value:e.user.dialog,callback:function(t){e.$set(e.user,"dialog",t)},expression:"user.dialog"}},[a("q-card",[a("q-card-section",{staticClass:"row items-center"},[a("q-avatar",{attrs:{color:"primary",icon:"person","text-color":"white"}}),a("span",{staticClass:"q-ml-sm text-h4"},[e._v(e._s(e.$q.lang.inicio.InicioSesion))])],1),a("q-card-section",{staticClass:"row items-center"},[a("div",{staticClass:"row q-col-gutter-x-2 q-col-gutter-y-sm"},[a("div",{staticClass:"col-12"},[a("q-input",{attrs:{label:e.$q.lang.inicio.Usuario,type:"text"},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}},[a("q-icon",{attrs:{slot:"prepend",name:"person"},slot:"prepend"}),a("q-icon",{staticClass:"cursor-pointer",attrs:{slot:"append",name:"close"},on:{click:function(t){e.user.name=""}},slot:"append"})],1)],1),a("div",{staticClass:"col-12"},[a("q-input",{attrs:{label:e.$q.lang.inicio.Clave,type:e.user.passShow?"text":"password"},model:{value:e.user.pass,callback:function(t){e.$set(e.user,"pass",t)},expression:"user.pass"}},[a("q-icon",{attrs:{slot:"prepend",name:"lock"},slot:"prepend"}),a("q-icon",{staticClass:"cursor-pointer",attrs:{slot:"append",name:"close"},on:{click:function(t){e.user.pass=""}},slot:"append"}),a("q-icon",{staticClass:"cursor-pointer",attrs:{slot:"append",name:e.user.passShow?"visibility":"visibility_off"},on:{click:function(t){e.user.passShow=!e.user.passShow}},slot:"append"})],1)],1),a("div",{staticClass:"col-12"},[a("q-checkbox",{attrs:{label:e.$q.lang.inicio.Recordarme,dense:""},model:{value:e.user.remember,callback:function(t){e.$set(e.user,"remember",t)},expression:"user.remember"}})],1)])]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{attrs:{label:e.$q.lang.label.cancel,color:"negative",flat:""},on:{click:e.close}}),a("q-btn",{attrs:{label:e.$q.lang.label.ok,color:"primary",flat:""},on:{click:e.login}})],1)],1)],1)],1),e.user.logged?a("q-drawer",{attrs:{bordered:!0,elevated:!0,overlay:!0,side:"right"},model:{value:e.menu.right,callback:function(t){e.$set(e.menu,"right",t)},expression:"menu.right"}}):e._e(),a("q-drawer",{attrs:{bordered:!0,elevated:!0,overlay:!0,side:"left"},model:{value:e.menu.left,callback:function(t){e.$set(e.menu,"left",t)},expression:"menu.left"}},[a("q-btn",{staticClass:"full-width",attrs:{flat:"",icon:"home",inline:"",to:"/"}}),a("q-list",{attrs:{separator:!0,bordered:""}},e._l(e.menu.leftList,function(t,o){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:o,attrs:{to:t.to,clickable:""}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:t.icon,color:"primary"}})],1),a("q-item-section",[e._v(e._s(e.$q.lang.menu[t.name]))])],1)}),1)],1),a("transition",{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut",mode:"out-in"}},[a("router-view")],1)],1)],1)],1)},i=[],l=a("bc3a"),s=a.n(l),r={data:function(){return{lang:this.$q.lang.isoName,menu:{left:!1,right:!1,leftList:[{icon:"euro_symbol",name:"Recibos",to:"/recibos/gestion"},{icon:"timeline",name:"Polizas",to:"/polizas"},{icon:"contacts",name:"Clientes",to:"/clientes"},{icon:"healing",name:"Siniestros",to:"/recibos"},{icon:"person",name:"Usuarios",to:"/recibos"}]},user:{name:null,pass:null,passShow:!0,remember:!1,dialog:!1}}},methods:{close:function(){this.user.dialog=!1},login:function(){var e=this;s.a.post(localStorage.url,{cmd:"login",user:this.user,pass:this.pass}).then(function(t){console.log(t),t.data.success?(localStorage.sid=t.data.sid,localStorage.logged=!0,e.user.remember?localStorage.remember=!0:localStorage.remember=!1,e.$q.notify({message:e.$q.lang.inicio.SesionIniciada,color:"positive"})):e.$q.notify({message:e.$q.lang.inicio.UsuarioClaveIncorrecta,color:"negative"})}),this.user.dialog=!1},userClick:function(){this.user.logged?this.menu.right=!this.menu.right:this.user.dialog=!0},sendBug:function(){window.open("https://github.com/natxocc/CRC/issues","_system")}},watch:{lang:function(e){var t=this;a("5892")("./".concat(e)).then(function(e){t.$q.lang.set(e.default)})}},beforeMount:function(){localStorage.remember&&localStorage.logged&&(this.user.name=localStorage.user,this.user.pass=localStorage.pass),localStorage.url="http://servidor/crc/php/post.php","localhost"!=window.location.hostname&&(localStorage.url="http://"+window.location.hostname+"/crc/php/post.php")},created:function(){}},c=r,u=a("2877"),d=Object(u["a"])(c,n,i,!1,null,null,null),m=d.exports,p=a("8c4f"),b=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("q-img",{attrs:{src:a("1a8b"),alt:"Image",ratio:16/9,"spinner-color":"white",contain:""}})],1)},f=[],g={name:"home",data:function(){return{openDialog:!1,user:{name:"",pass:""}}},methods:{}},h=g,v=Object(u["a"])(h,b,f,!1,null,null,null),C=v.exports,q=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("q-tabs",{staticClass:"bg-secondary text-primary",attrs:{"active-bg-color":"primary","active-color":"white",dense:"","indicator-color":"transparent","inline-label":"","top-indicator":""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-route-tab",{attrs:{label:e.$q.lang.recibo.Gestion,icon:"assignment_turned_in",name:"gestion",to:"/recibos/gestion"}}),a("q-route-tab",{attrs:{label:e.$q.lang.recibo.Bajas,icon:"assignment_returned",name:"bajas",to:"/recibos/bajas"}}),a("q-tab",{staticClass:"text-primary",attrs:{label:e.calculos.importe,disabled:"",icon:"euro_symbol"}})],1),"gestion"==e.tab?a("div",[a("div",{staticClass:"row text-center"},[a("div",{staticClass:"col-xs-12 col-md-5",staticStyle:{padding:"10px"}},[a("q-input",{attrs:{label:e.$q.lang.recibo.FiltroRapido,dense:"",type:"text"},model:{value:e.quickFilter,callback:function(t){e.quickFilter=t},expression:"quickFilter"}},[a("q-icon",{attrs:{slot:"prepend",name:"filter_list"},slot:"prepend"}),a("q-icon",{staticClass:"cursor-pointer",attrs:{slot:"append",name:"close"},on:{click:function(t){e.quickFilter=""}},slot:"append"})],1)],1),a("div",{staticClass:"col-xs-12 col-md-5",staticStyle:{padding:"10px"}},[a("q-select",{attrs:{label:e.$q.lang.recibo.FiltrosDeEstado,options:e.filter.Estados,dense:"",expandBesides:"",multiple:"",optionsDense:""},on:{input:e.callDataGestion},model:{value:e.filter.EstadosSel,callback:function(t){e.$set(e.filter,"EstadosSel",t)},expression:"filter.EstadosSel"}})],1),a("div",{staticClass:"col-xs-12 col-md-2",staticStyle:{padding:"10px"}},[a("q-toggle",{attrs:{label:e.$q.lang.recibo.TodosLosRegistros,dense:""},on:{input:e.callDataGestion},model:{value:e.filter.alldata,callback:function(t){e.$set(e.filter,"alldata",t)},expression:"filter.alldata"}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle"}},[e._v(e._s(e.$q.lang.recibo.TodosLosRegistrosT))])],1)],1)])]):e._e(),"bajas"==e.tab?a("div",[a("div",{staticClass:"row text-center"},[a("div",{staticClass:"col-xs-12 col-sm-4",staticStyle:{padding:"10px"}},[a("q-input",{attrs:{label:e.$q.lang.recibo.FiltroRapido,dense:"",type:"text"},model:{value:e.quickFilter,callback:function(t){e.quickFilter=t},expression:"quickFilter"}},[a("q-icon",{attrs:{slot:"prepend",name:"filter_list"},slot:"prepend"}),a("q-icon",{staticClass:"cursor-pointer",attrs:{slot:"append",name:"close"},on:{click:function(t){e.quickFilter=""}},slot:"append"})],1)],1),a("div",{staticClass:"col-xs-12 col-sm-4",staticStyle:{padding:"10px"}},[a("q-select",{attrs:{label:e.$q.lang.recibo.ano,options:e.filter.years,dense:"",expandBesides:"",optionsDense:""},on:{input:e.callDataBajas},model:{value:e.filter.year,callback:function(t){e.$set(e.filter,"year",t)},expression:"filter.year"}})],1),a("div",{staticClass:"col-xs-12 col-sm-4",staticStyle:{padding:"10px"}},[a("q-select",{attrs:{label:e.$q.lang.recibo.mes,options:e.filter.months,dense:"",expandBesides:"",optionsDense:""},on:{input:e.callDataBajas},model:{value:e.filter.month,callback:function(t){e.$set(e.filter,"month",t)},expression:"filter.month"}})],1)]),a("q-bar",{staticClass:"bg-primary text-white"},[a("q-btn",{attrs:{disabled:e.recibo.selected,dense:"",flat:"",icon:"add"}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle"}},[e._v(e._s(e.$q.lang.recibo.NuevoReciboT))]),e._v("\n        "+e._s(e.$q.lang.recibo.NuevoRecibo)+"\n      ")],1),a("q-btn",{attrs:{disabled:!e.recibo.selected,color:"warning",dense:"",flat:"",icon:"delete"},on:{click:e.deleteRecord}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle"}},[e._v(e._s(e.$q.lang.recibo.EliminarReciboT))]),e._v("\n        "+e._s(e.$q.lang.recibo.EliminarRecibo)+"\n      ")],1),a("q-btn",{attrs:{disabled:!e.recibo.selected,dense:"",flat:"",icon:"add"}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle"}},[e._v(e._s(e.$q.lang.recibo.NuevaGestionT))]),e._v("\n        "+e._s(e.$q.lang.recibo.NuevaGestion)+"\n      ")],1),a("q-btn",{attrs:{disabled:!e.recibo.selectedSub,dense:"",flat:"",icon:"edit"}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle"}},[e._v(e._s(e.$q.lang.recibo.EditarGestionT))]),e._v("\n        "+e._s(e.$q.lang.recibo.EditarGestion)+"\n      ")],1),a("q-btn",{attrs:{disabled:!e.recibo.selectedSub,color:"warning",dense:"",flat:"",icon:"delete"}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle"}},[e._v(e._s(e.$q.lang.recibo.EliminarGestionT))]),e._v("\n        "+e._s(e.$q.lang.recibo.EliminarGestion)+"\n      ")],1),!e.client.selected&&e.recibo.selected?a("q-btn",{attrs:{dense:"",flat:"",icon:"perm_contact_calendar"},on:{click:function(t){e.client.dialog=!0}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle"}},[e._v("Crear nuevo Cliente")]),e._v("Nuevo Cliente\n      ")],1):e._e(),e.client.selected?a("q-btn",{attrs:{dense:"",flat:"",icon:"perm_contact_calendar"},on:{click:function(t){e.client.dialog=!0}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle"}},[e._v("Información de Contacto")]),a("span",{staticClass:"text-weight-bold",staticStyle:{margin:"2px"}},[e._v(e._s(e.client.name)+e._s(e.client.telf1)+" "+e._s(e.client.telf2)+" "+e._s(e.client.mail))])],1):e._e(),a("q-space"),a("div",[a("q-btn",{attrs:{color:"primary",icon:"help_outline",size:"sm"}},[a("q-tooltip",[e._v(e._s(e.$q.lang.recibo.AyudaReciboT))]),a("q-popup-proxy",[a("q-list",{attrs:{dense:""}},[a("q-item",[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$q.lang.recibo.RecibosSinTratamiento))])],1)],1),a("q-item",{staticStyle:{"background-color":"#fcf18e"}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$q.lang.recibo.RecibosPendientes))])],1)],1),a("q-item",{staticStyle:{"background-color":"#88c9ff"}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$q.lang.recibo.RecibosAnulados))])],1)],1),a("q-item",{staticStyle:{"background-color":"rgb(182, 255, 191)"}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$q.lang.recibo.RecibosCobrados))])],1)],1),a("q-item",{staticStyle:{"background-color":"rgb(252, 151, 151)"}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$q.lang.recibo.RecibosUrgentes))])],1)],1),a("q-item",{staticStyle:{"background-color":"#a8a8a7"}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.$q.lang.recibo.RecibosError))])],1)],1)],1)],1)],1),a("q-tooltip",[e._v(e._s(e.$q.lang.recibo.AyudaReciboT))])],1)],1)],1):e._e(),a("n-tables",{attrs:{columnDefs:e.columnDefs,columnDefsSub:e.columnDefsSub,masterDetail:!0,quickFilter:e.quickFilter,rowClassRules:e.rowClassRules,rowData:e.rowData,table:"Recibos"},on:{gridData:e.gridData,rowSelected:e.rowSelected,rowSelectedSub:e.rowSelectedSub}}),a("n-dialog",{attrs:{columns:e.client.columns,data:e.client.data,model:e.client.dialog,table:null},on:{cancel:function(t){e.client.dialog=!1},onSave:e.saveDataClient}})],1)},_=[],y=(a("c5f6"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"text-align":"left"}},[a("ag-grid-vue",{staticClass:"ag-theme-balham",staticStyle:{height:"500px"},attrs:{animateRows:!0,columnDefs:e.columnDefs,columnTypes:e.columnTypes,defaultColDef:e.defaultColDef,detailCellRendererParams:e.detailCellRendererParams,enableCellChangeFlash:!0,enableRangeSelection:!0,floatingFilter:!1,localeText:e.localeText,masterDetail:e.masterDetail,rowClassRules:e.rowClassRules,rowData:e.rowData,sideBar:e.sideBar,sizeColsToFix:!0,statusBar:e.statusBar,suppressColumnVirtualisation:!0,suppressDragLeaveHidesColumns:!0,suppressMakeColumnVisibleAfterUnGroup:!0,suppressSizeToFit:!0,multiSortKey:"ctrl",rowGroupPanelShow:"always"},on:{"cell-clicked":e.onCellClicked,"cell-value-changed":e.onCellValueChanged,"filter-changed":e.onFilterChanged,"grid-ready":e.onGridReady,"row-data-changed":e.onRowDataChanged,"selection-changed":e.onSelectionChanged}})],1)}),S=[],w=(a("ac6a"),a("401b")),R=a("e10a"),D={name:"NTables",props:{columnDefs:null,columnDefsSub:null,rowData:null,table:null,masterDetail:null,rowClassRules:null,filters:null,quickFilter:null},data:function(){return{gridApi:null,columnApi:null,detailCellRendererParams:null,rowSelection:null,defaultColDef:{enablePivot:!1,editable:!1,resizable:!0,filter:!0,sortable:!0},columnTypes:{dateColumn:{filter:"agSetColumnFilter"},textColumn:{filter:"agSetColumnFilter"},numberColumn:{filter:"agNumberColumnFilter",enableValue:!0,enableRowGroup:!0},generalColumn:{filter:"agSetColumnFilter",enableRowGroup:!0},bitColumn:{filter:"agSetColumnFilter",enableRowGroup:!0,cellRenderer:function(e){return"<input type='checkbox' onclick=\"return false;\" ".concat(e.value?"checked":""," />")}}},statusBar:{statusPanels:[{statusPanel:"agTotalRowCountComponent",align:"left"},{statusPanel:"agFilteredRowCountComponent"},{statusPanel:"agSelectedRowCountComponent"},{statusPanel:"agAggregationComponent"}]},sideBar:{toolPanels:[{id:"columns",labelDefault:"Columns",labelKey:"columns",iconKey:"columns",toolPanel:"agColumnsToolPanel"}],defaultToolPanel:"",enablePivot:!1},localeText:R["default"]}},components:{AgGridVue:w["AgGridVue"]},methods:{onGridReady:function(e){e.api&&e.columnApi&&(this.gridApi=e.api,this.columnApi=e.columnApi,this.gridApi.sizeColumnsToFit())},onRowDataChanged:function(e){e.api&&e.columnApi&&(this.gridApi=e.api,this.columnApi=e.columnApi,this.gridApi.sizeColumnsToFit(),this.createSubtable(),this.autoFilter())},autoSizeColumns:function(){var e=[];this.columnApi&&(this.columnApi.getAllColumns().forEach(function(t){e.push(t.colId)}),this.columnApi.autoSizeColumns(e))},autoFilter:function(){this.gridApi&&(this.gridApi.setFilterModel(this.filters),this.onFilterChanged())},onFilterChanged:function(e){this.gridApi&&this.$emit("gridData",this.gridApi.rowModel.rootNode.childrenAfterFilter)},onCellClicked:function(e){this.$emit("cellClicked",e)},onSelectionChanged:function(e){var t=this.gridApi.getSelectedRows();this.$emit("rowSelected",t)},onCellValueChanged:function(e){},createSubtable:function(){var e=this;this.detailCellRendererParams={detailGridOptions:{enableRangeSelection:!0,columnDefs:this.columnDefsSub,defaultColDef:this.defaultColDef,columnTypes:this.columnTypes,localeText:R["default"],onGridReady:function(e){this.gridApi=e.api},onFirstDataRendered:function(e){e.api.sizeColumnsToFit()},onCellValueChanged:function(e){},onSelectionChanged:function(t){var a=this.gridApi.getSelectedRows();e.$emit("rowSelectedSub",a)}},getDetailRowData:function(e){e.successCallback(e.data.callRecords)},template:function(e){return'<div style="height: 100%; background-color: #EDF6FF; padding: 20px; box-sizing: border-box;">  <div ref="eDetailGrid" style="height: 90%;"></div></div>'}}}},beforeMount:function(){},created:function(){},watch:{quickFilter:function(){this.gridApi.setQuickFilter(this.quickFilter)},filters:{handler:function(e){this.autoFilter()},deep:!0}}},k=D,x=Object(u["a"])(k,y,S,!1,null,null,null),E=x.exports,A=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("q-dialog",{attrs:{maximized:!0,"transition-hide":"slide-down","transition-show":"slide-up"},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}},[a("q-card",[a("q-bar",{staticClass:"bg-primary text-white"},[a("q-btn",{staticClass:"text-white",attrs:{dense:"",flat:"",icon:"add"},on:{click:function(t){e.readonly=!1}}},[e._v("NUEVO\n          "),a("q-tooltip",[e._v("Nuevo")])],1),a("q-btn",{staticClass:"text-white",attrs:{disable:!e.readonly,dense:"",flat:"",icon:"edit"},on:{click:function(t){e.readonly=!1}}},[e._v("EDITAR\n          "),a("q-tooltip",[e._v("Editar")])],1),a("q-btn",{staticClass:"text-white",attrs:{disable:e.readonly,dense:"",flat:"",icon:"save"},on:{click:e.onSave}},[e._v("GUARDAR\n          "),a("q-tooltip",[e._v("Editar")])],1),a("q-space"),a("q-btn",{staticClass:"text-white",attrs:{dense:"",flat:"",icon:"close"},on:{click:function(t){e.readonly=!0,e.$emit("cancel",!0)}}},[a("q-tooltip",[e._v("Cerrar")])],1)],1),a("div",{staticClass:"row"},e._l(e.data,function(t,o,n){return a("div",{key:o,staticClass:"col-xs-12 col-sm-6 col-md-4 col-lg-3"},[a("q-card-section",["textColumn"==e.columns[n].type?a("q-input",{attrs:{label:o,readonly:e.readonly,dense:"","stack-label":"",type:"text"},model:{value:e.data[o],callback:function(t){e.$set(e.data,o,t)},expression:"data[key]"}}):e._e(),"numberColumn"==e.columns[n].type?a("q-input",{attrs:{label:o,readonly:e.readonly,dense:"","stack-label":"",type:"number"},model:{value:e.data[o],callback:function(t){e.$set(e.data,o,t)},expression:"data[key]"}}):e._e(),"bitColumn"==e.columns[n].type?a("q-toggle",{attrs:{disable:e.readonly,label:o,dense:""},model:{value:e.data[o],callback:function(t){e.$set(e.data,o,t)},expression:"data[key]"}}):e._e(),"dateColumn"==e.columns[n].type?a("q-input",{attrs:{disable:e.readonly,label:o,dense:"",mask:"date"},model:{value:e.data[o],callback:function(t){e.$set(e.data,o,t)},expression:"data[key]"}},[a("q-icon",{staticClass:"cursor-pointer",attrs:{slot:"append",name:"event"},slot:"append"},[a("q-popup-proxy",[a("q-date",{style:e.style,attrs:{minimal:"",todayBtn:""},model:{value:e.data[o],callback:function(t){e.$set(e.data,o,t)},expression:"data[key]"}})],1)],1)],1):e._e()],1)],1)}),0)],1)],1)],1)},F=[],$={name:"NDialog",props:{model:null,columns:null,data:null,table:null},data:function(){return{readonly:null}},methods:{onSave:function(){this.$emit("onSave",!0)},onCancel:function(){this.model=!1,this.$emit("onCancel",!0)}},beforeMount:function(){this.readonly=!0}},T=$,N=Object(u["a"])(T,A,F,!1,null,null,null),O=N.exports,P=a("fe09");function M(e){P["a"].show(e)}function G(e){P["a"].hide(e)}var I={components:{NTables:E,NDialog:O},data:function(){return{columnDefs:[],columnDefsSub:[],rowData:null,quickFilter:null,filter:{EstadosSel:["PENDIENTE"],Estados:["PENDIENTE","DEVUELTO","COBRADO","ANULADO","EMITIDO"],alldata:!1,years:["2020","2019","2018","2017"],months:["","01","02","03","04","05","06","07","08","09","10","11","12"],month:("0"+((new Date).getMonth()+1)).slice(-2),year:(new Date).getFullYear()},rowClassRules:{error:"data.Estado.includes('COBRADO') && data.MIEstado.includes('ANULADO')",pendiente:"data.Estado.includes('PENDIENTE') && data.MIEstado.includes('PENDIENTE')",anulado:"data.Estado.includes('ANULADO') || (data.MIEstado.includes('ANULADO') && !data.Estado.includes('COBRADO'))",cobrado:"data.Estado.includes('COBRADO') || (data.MIEstado.includes('COBRADO') && data.Importe == data.Cobrado)"},client:{columns:null,data:null,name:null,telf:null,mail:null,dialog:!1,selected:!1},recibo:{selected:null,selectedSub:!1},tab:this.$route.params.recibo,calculos:{importe:null,cobrado:null}}},methods:{deleteRecord:function(){this.$q.dialog({title:"Confirmar",message:"Desea Eliminar este Registro",cancel:!0}).onOk(function(){}).onCancel(function(){})},saveDataClient:function(){var e=this;s.a.post(localStorage.url,{cmd:"updateRecord",table:"Clientes",idkey:"NIF",idvalue:e.client.data["NIF"],data:e.client.data}).then(function(e){})},callDataGestion:function(){var e=this,t=new Date;t.setMonth(t.getMonth()-13),t=t.toISOString().substr(0,10);for(var a=(new Date).toISOString().substr(0,10),o="(",n="",i=0;i<this.filter.EstadosSel.length;i++)o+=n+"Estado LIKE '"+this.filter.EstadosSel[i]+"%'",n=" OR ";o+=")";var l=[" AND (FechaEfecto BETWEEN '"+t+"' AND '"+a+"')"];this.filter.alldata||(o+=l),M(),s.a.post(localStorage.url,{cmd:"getRecords",table:"Recibos",subtable:"RecibosGestion",id:"CodigoRecibo",orderby:"Situacion DESC",where:o}).then(function(t){e.columnDefs=t.data.columns,e.columnDefsSub=t.data.columnsSub,G(),e.rowData=t.data.data})},callDataBajas:function(){var e=this,t="(MIEstado LIKE 'ANULADO') AND (FechaEfecto LIKE '"+this.filter.year+"-"+this.filter.month+"%')";M(),s.a.post(localStorage.url,{cmd:"getRecords",table:"Recibos",where:t,orderby:!1,subtable:!1,id:!1}).then(function(t){e.columnDefs=t.data.columns,e.columnDefsSub=t.data.columnsSub,G(),e.rowData=t.data.data})},callDataRecibo:function(){var e=this,t="(CodigoRecibo='"+this.$route.params.recibo+"')";M(),s.a.post(localStorage.url,{cmd:"getRecords",table:"Recibos",where:t,orderby:!1,subtable:!1,id:!1}).then(function(t){e.columnDefs=t.data.columns,e.columnDefsSub=t.data.columnsSub,G(),e.rowData=t.data.data})},rowSelectedSub:function(e){0!=e.length?this.recibo.selectedSub=!0:this.recibo.selectedSub=!1},rowSelected:function(e){if(0==e.length)return this.recibo.selected=!1,void(this.client.selected=!1);this.recibo.selected=!0;var t=this;if(e[0].NombreTomador){var a="NombreCompleto = '"+e[0].NombreTomador+"'";s.a.post(localStorage.url,{cmd:"getRecords",table:"Clientes",where:a,orderby:!1,subtable:!1,id:!1}).then(function(e){e.data.data.length?(t.client.columns=e.data.columns,t.client.data=e.data.data[0],t.client.selected=!0,t.client.name=e.data.data[0].NombreCompleto,t.client.telf=e.data.data[0].Telefono,t.client.mail=e.data.data[0].CorreoElectronico):(t.client.selected=!1,t.client.telf=t.client.mail=t.client.name=null,t.client.columns=t.client.data=null)})}},gridData:function(e){for(var t=0,a=0,o=0;o<e.length;o++)t+=e[o].data.Cobrado,a+=e[o].data.Importe;this.calculos.importe=Number(a).toFixed(1),this.calculos.cobrado=Number(t).toFixed(1)},init:function(){switch(this.$route.params.recibo){case"bajas":this.callDataBajas();break;case"gestion":this.callDataGestion();break;default:console.log("numero"),this.callDataRecibo();break}}},beforeMount:function(){this.init();for(var e=(new Date).getFullYear(),t=[],a=0;a<20;a++)t[a]=e-a;this.filter.years=t},watch:{$route:"init"}},j=I,z=Object(u["a"])(j,q,_,!1,null,null,null),B=z.exports,L=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"row text-center"},[a("div",{staticClass:"col-xs-12",staticStyle:{padding:"10px"}},[a("q-input",{attrs:{label:e.$q.lang.recibo.FiltroRapido,dense:"",type:"text"},model:{value:e.quickFilter,callback:function(t){e.quickFilter=t},expression:"quickFilter"}},[a("q-icon",{attrs:{slot:"prepend",name:"filter_list"},slot:"prepend"}),a("q-icon",{staticClass:"cursor-pointer",attrs:{slot:"append",name:"close"},on:{click:function(t){e.quickFilter=""}},slot:"append"})],1)],1)]),a("n-tables",{attrs:{columnDefs:e.columnDefs,quickFilter:e.quickFilter,rowData:e.rowData,table:"Clientes"}})],1)},U=[];function V(e){P["a"].show(e)}function J(e){P["a"].hide(e)}var K={components:{NTables:E},data:function(){return{columnDefs:[],rowData:null,quickFilter:null}},methods:{callDataClients:function(){var e=this;V(),s.a.post(localStorage.url,{cmd:"getRecords",table:"Clientes",subtable:!1,id:!1,orderby:"NombreCompleto ASC",where:!1}).then(function(t){e.columnDefs=t.data.columns,e.columnDefsSub=t.data.columnsSub,J(),e.rowData=t.data.data})}},beforeMount:function(){this.callDataClients()},watch:{}},W=K,H=Object(u["a"])(W,L,U,!1,null,null,null),Y=H.exports,Q=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},X=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{attrs:{id:"notfound"}},[a("div",{staticClass:"notfound"},[a("div",{staticClass:"notfound-404"}),a("h1",[e._v("404")]),a("h2",[e._v("Oops! Página inexistente")]),a("p",[e._v("Lo sentimos, la página solicitada no existe, fué eliminada, cambiada de nombre o está temporalmente indisponible")]),a("a",{attrs:{href:"#"}},[e._v("Volver a Inicio")])])])])}],Z={},ee=Z,te=(a("b2b1"),Object(u["a"])(ee,Q,X,!1,null,null,null)),ae=te.exports;o["default"].use(p["a"]);var oe=new p["a"]({routes:[{path:"/",name:"home",component:C},{path:"/recibos/:recibo",name:"Recibos",component:B},{path:"/clientes",name:"Clientes",component:Y},{path:"*",name:"404",component:ae}]}),ne=a("2b5b"),ie=a.n(ne),le=(a("b360"),a("588b"),a("5f3d"),a("27f3"),a("e845"),a("9cd7"),a("34c1"));o["default"].config.productionTip=!1,o["default"].use(P["b"],{config:{brand:{primary:"#004b9b",secondary:"#f0b400",accent:"#9C27B0",positive:"#21BA45",negative:"#C10015",info:"#31CCEC",warning:"#ff8000"}}}),o["default"].use(ie.a),P["b"].lang.set(le["default"]),new o["default"]({router:oe,render:function(e){return e(m)}}).$mount("#app")},5892:function(e,t,a){var o={"./":["4b1d",3,"chunk-2d0cba77"],"./ca":["8799",9,"chunk-2d0deb55"],"./ca.js":["8799",9,"chunk-2d0deb55"],"./es":["34c1",9],"./es.js":["34c1",9],"./es.tables":["e10a",9],"./es.tables.js":["e10a",9],"./index":["4b1d",3,"chunk-2d0cba77"],"./index.json":["4b1d",3,"chunk-2d0cba77"]};function n(e){var t=o[e];return t?Promise.all(t.slice(2).map(a.e)).then(function(){var e=t[0];return a.t(e,t[1])}):Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}n.keys=function(){return Object.keys(o)},n.id="5892",e.exports=n},b2b1:function(e,t,a){"use strict";var o=a("d3f3"),n=a.n(o);n.a},d3f3:function(e,t,a){},e10a:function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("097d");t["default"]={page:"Página",more:"Más",to:"A",of:"De",next:"Siguiente",last:"Último",first:"Primero",previous:"Previo",loadingOoo:"Cargando...",selectAll:"Seleccionar Todo",searchOoo:"Buscar...",blanks:"Nada",filterOoo:"Filtro...",applyFilter:"Aplicar Filtro...",equals:"Igual",notEquals:"No Igual",notEqual:"No Igual",lessThan:"Menor",greaterThan:"Mayor",lessThanOrEqual:"Menor o igual",greaterThanOrEqual:"Mayor o igual",inRange:"Rango",contains:"Contiene",notContains:"No contiene",startsWith:"Comienza por",endsWith:"Acaba en",group:"Agrupado",columns:"Columnas",filters:"Filtros",rowGroupColumns:"Agrupar (Cols)",rowGroupColumnsEmptyMessage:"Arrastra aquí columnas para agruparlas",valueColumns:"Valores (Cols)",pivotMode:"Modo Pivote",groups:"Grupos",values:"Valores",pivots:"Pivotes",valueColumnsEmptyMessage:"Arrastra aquí columnas para cálculos",pivotColumnsEmptyMessage:"Arrastra aquí columnas para pivotes",toolPanelButton:"Panel de herramientas",noRowsToShow:"No hay Datos",pinColumn:"Fijar Columna",valueAggregation:"Calcular Valor",autosizeThiscolumn:"Ajustar esta columna",autosizeAllColumns:"Ajustar todas las columnas",groupBy:"Agrupar por",ungroupBy:"Desagrupar por",resetColumns:"Resetear estas columnas",expandAll:"Expandir todo",collapseAll:"Contraer todo",toolPanel:"Panel Herramientas",export:"Exportar",csvExport:"Exportar a CSV",excelExport:"Exportar a Excel",pinLeft:"Izquierda",pinRight:"Derecha",noPin:"No fijar",sum:"Suma",min:"Mínimo",max:"Máximo",none:"Nada",count:"Contar",avg:"Promedio",average:"Promedio",copy:"Copiar",copyWithHeaders:"Copiar con Cabeceras",ctrlC:"Control+C",paste:"Pegar",ctrlV:"Control+V",filteredRowCount:"Filtrados",rowCount:"Registros totales",selectedRowCount:"Seleccionado",andButton:"Y",orButton:"O"}},e845:function(e,t,a){}});