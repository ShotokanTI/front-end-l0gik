<template>
  <v-app>
    <div class="h-full bg-site w-screen relative">
      <div class="flex flex-col justify-between h-full">
        <Header @openSidebar="openSidebarAddSerie" />
        <div
          class="mt-32 pl-16 mb-2 text-white text-2xl font-semibold flex justify-items-center items-center underline"
        >
          Todas as séries
        </div>
        <keep-alive>
        <SidebarAddSerie ref="open" />
        </keep-alive>
        <SidebarUpdate ref="openUpdate" />
        <div
          class="container grid md:grid-cols-2 xl:grid-cols-3 self-center place-items-center gap-y-4"
        >
          <div  v-for="(serie, index) in allSeries" :key="index">
            <ContentSeries
              @openUpdateSidebar="openUpdateSidebar"
              :Visto="serie.Visto"
              :id="serie.id"
              :File="getFilesServer(serie.File)"
              :Nome="serie.Nome"
              :Lancamento="datePtBr(serie.Lancamento)"
              :Sinopse="serie.Sinopse"
              :RadioId="serie"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  methods: {
    openUpdateSidebar(){
      this.$refs.openUpdate.openNav()
    },
    getFilesServer(file) {
      return file != null ? `http://localhost:8080/${file}` : null;
    },
    datePtBr(date) {
      return new Date(date).toLocaleDateString("pt-BR");
    },

    openSidebarAddSerie() {
      this.$refs.open.openNav();
    },
  },
  data() {
    return {};
  },
  computed: {
    allSeries() {
      return this.$store.state.data.dataSeries;
    },
  },
};
</script>

<style>
</style>
