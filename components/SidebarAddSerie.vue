<template>
  <v-main>
    <div id="mySidenav" class="sidenav z-50">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()"
        >&times;</a
      >
      <form class="flex flex-col px-6" method="POST" id="form-serie" action="">
        <!-- Nome -->
        <v-text-field
          required
          :error-messages="errorsInput.Nome ? [errorsInput.Nome] : ''"
          label="Nome da Serie"
          name="Nome"
          id="Nome"
          type="text"
        >
        </v-text-field>
        <!-- Lancamento -->
        <v-text-field
          :error-messages="
            errorsInput.Lancamento ? [errorsInput.Lancamento] : ''
          "
          label="Lancamento"
          name="Lancamento"
          id="Lancamento"
          type="date"
        >
        </v-text-field>
        <!-- Temporadas -->
        <v-text-field
          :error-messages="
            errorsInput.Temporadas ? [errorsInput.Temporadas] : ''
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
          :error-messages="errorsInput.Sinopse ? [errorsInput.Sinopse] : ''"
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
          :error-messages="errorsInput.File ? [errorsInput.File] : ''"
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
          :error-messages="errorsInput.Categoria ? [errorsInput.Categoria] : ''"
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
          @click.prevent="sendNewSerie"
          type="submit"
        >
          Enviar
        </v-btn>
      </form>
    </div>
  </v-main>
</template>

<script>
import { getAllSeries, sendNewSerie } from "../Helpers/app";
export default {
  data() {
    return {
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
  mounted() {
    //Primeira carga 
    if (localStorage.firstLoad == undefined || localStorage.statusChange) {
      this.getAllSeries();
    }

    localStorage.firstLoad = true;
    localStorage.removeItem('statusChange')
    //de agora em diante não precisará ir no servidor resgatar os dados
    if (localStorage.firstLoad != "") {
      this.$store.commit("data/updateSeries", JSON.parse(localStorage.serie));
    }
  },
  computed: {
    status(){
      return this.$store.state.data.status
    },
    errorsInput() {
      if (this.errorsAddSerie !== "") {
        let errors = this.errorsAddSerie["errors"].map((errors) => ({
          [errors.param]: `O campo ${errors.param} ${errors.msg}`,
        }));
        let newObj = Object.assign({}, ...errors);
        return newObj;
      } else {
        return false;
      }
    },
  },
  methods: {
    getAllSeries() {
      getAllSeries("http://localhost:8080/Series/", { method: "GET" }, this);
    },
    buildError(field, error) {
      return `O campo ${field} ${error}`;
    },
    async sendNewSerie() {
      let form = document.getElementById("form-serie");
      let dataForm = new FormData(form);
      let configAxios = {
        data: dataForm,
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
      };
      await sendNewSerie("http://localhost:8080/Series", configAxios, this);
    },
    openNav() {
      document.getElementById("mySidenav").style.width = "450px";
      document.querySelector("body").style.backgroundColor = "rgba(0,0,0,0.4)";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.body.style.backgroundColor = "white";
    },
  },
};
</script>

<style>
body {
  font-family: "Lato", sans-serif;
  transition: background-color 0.5s;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>