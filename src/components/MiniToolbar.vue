<template>
  <div>
    <!-- MINI TOOLBAR-->
    <v-toolbar color="primary" dense>
      <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="!row.selected && !row.selectedSub">
        <v-icon>add</v-icon>
        {{lang.Nuevo}}
      </v-btn>
      <!-- <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="row.selected">
        <v-icon>add</v-icon>
        {{lang.NuevaGestion}}
      </v-btn> -->
      <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="recibo.selectedSub">
        <v-icon>edit</v-icon>
        {{lang.Editar}}
      </v-btn>
      <v-btn @click="recibo.deleteModel=true" color="error" small v-if="recibo.selected">
        <v-icon>delete</v-icon>
        {{lang.Eliminar}}
      </v-btn>
      <v-btn @click="recibo.deleteModel=true" color="error" small v-if="recibo.selectedSub">
        <v-icon>delete</v-icon>
        {{lang.Eliminar}}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="secondary black--text">
        {{calculo}}
        <v-icon dark right>euro_symbol</v-icon>
      </v-btn>
      <!-- COLORS HELP -->
      <v-menu offset-y open-on-hover top>
        <v-btn color="secondary" icon slot="activator" small>
          <v-icon>help_outline</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile :key="index" :style="{'background-color': helpColors[key]}" v-for="(value, key, index) in lang.ayuda">
            <v-list-tile-title>{{ value }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>
