<template>
  <v-main>
    <div id="sideNavUpdate" class="sidenav z-50">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()"
        >&times;</a
      >
      <form class="flex flex-col px-6" method="PUT" id="form-update">
        <!-- Nome -->
        <v-text-field
          :value="existUpdate[0].Nome"
          :error-messages="
            errorsInputUpdate.Nome ? [errorsInputUpdate.Nome] : ''
          "
          label="Nome da Serie"
          name="Nome"
          id="Nome"
          type="text"
        >
        </v-text-field>
        <!-- Lancamento -->
        <v-text-field
        :value="existUpdate[0].Lancamento"
          :error-messages="
            errorsInputUpdate.Lancamento ? [errorsInputUpdate.Lancamento] : ''
          "
          label="Lancamento"
          name="Lancamento"
          id="Lancamento"
          type="date"
        >
        </v-text-field>
        <!-- Temporadas -->
        <v-text-field
        :value="existUpdate[0].Temporadas"
          :error-messages="
            errorsInputUpdate.Temporadas ? [errorsInputUpdate.Temporadas] : ''
          "
          min="0"
          step="1"
          label="Temporadas"
          name="Temporadas"
          id="Temporadas"
          type="number"
        >
        </v-text-field>
        <!-- Sinopse -->
        <v-textarea
        :value="existUpdate[0].Sinopse"
          :error-messages="
            errorsInputUpdate.Sinopse ? [errorsInputUpdate.Sinopse] : ''
          "
          required
          name="Sinopse"
          id="Sinopse"
          type="text"
          label="Sinopse"
          rows="3"
          prepend-icon="mdi-comment"
        ></v-textarea>
        <!-- File Serie -->
        <v-file-input
          :error-messages="
            errorsInputUpdate.File ? [errorsInputUpdate.File] : ''
          "
          class="cursor-pointer"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Foto Serie"
          prepend-icon="mdi-camera"
          label="Foto Serie"
          name="File"
          id="File"
          type="file"
        >
        </v-file-input>
        <!-- Categoria -->
        <v-select
        :value="existUpdate[0].Categoria"
          :error-messages="
            errorsInputUpdate.Categoria ? [errorsInputUpdate.Categoria] : ''
          "
          v-model="e7"
          :items="Categorias"
          name="Categoria"
          label="Categoria"
          multiple
          chips
          small-chips
          hint="Escolha as categorias da serie"
          persistent-hint
        ></v-select>
        <v-btn
          class="mt-10"
          color="primary"
          elevation="2"
          x-large
          @click.prevent="sendUpdateSerie(existUpdate[0].id)"
          type="submit"
        >
          Atualizar
        </v-btn>
      </form>
    </div>
  </v-main>
</template>

<script>
import { editSerie } from "../Helpers/app";
export default {
  data() {
    return {
      errorsUpdateSerie: "",
      dadosExistentes:"",
        series: "",
      e7: [],
      Categorias: [
        "Terror",
        "Ação",
        "Aventura",
        "Comedia",
        "Romance",
        "Suspense",
        "Documentário",
        "Ficção Cientifica",
        "Fantasia",
        "Musical",
      ],
      errorsAddSerie: "",
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "O arquivo náo pode ser menor que 2 mb",
      ],
    };
  },
  methods: {
    async sendUpdateSerie(id) {
      let form = document.getElementById("form-update");
      let dataForm = new FormData(form);
      let configAxios = {
        data: dataForm,
        method: "put",
        headers: { "Content-Type": "multipart/form-data" },
      };
      await editSerie("http://localhost:8080/Series/", configAxios,id, this);
    },
    openNav() {
      document.getElementById("sideNavUpdate").style.width = "450px";
      document.querySelector("body").style.backgroundColor = "rgba(0,0,0,0.4)";
    },
    closeNav() {
      document.getElementById("sideNavUpdate").style.width = "0";
      document.body.style.backgroundColor = "white";
    },
  },
  computed: {
      existUpdate(){
      return this.$store.state.data.serieFiltered
    },
    errorsInputUpdate() {
      if (this.errorsUpdateSerie !== "") {
        let errors = this.errorsUpdateSerie["errors"].map((errors) => ({
          [errors.param]: `O campo ${errors.param} ${errors.msg}`,
        }));
        let newObj = Object.assign({}, ...errors);
        return newObj;
      } else {
        return false;
      }
    },
  },
};
</script>
