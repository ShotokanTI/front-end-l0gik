<template>
  <div
    class="border-1 border-transparent hover:border-1 hover:border-blue-900 rounded-sm relative"
  >
    <div class="flex flex-col info-serie">
      <div class="w-80 h-56 relative">
        <img
          class="h-full w-full cursor-pointer object-cover"
          :src="File ? File : require('@/assets/no_image.png')"
          alt=""
        />
      </div>
      <div
        class="border-blue-900 border-t-0 border-1 content-card-serie color-card w-full rounded-sm absolute mt-20 z-10"
      >
        <div class="pt-8">
          <div class="flex pt-10 pl-4">
            <h1 class="flex-grow text-black font-semibold">{{ Nome }}</h1>
          </div>
          <p class="numbers-paragrafo pt-4 px-4 text-black">
            {{ Sinopse }}
          </p>
          <p class="pl-4 text-black justify-items-center font-semibold">
            {{ Lancamento }}
          </p>
        </div>
        <div class="flex justify-start space-x-5 mb-2 ml-2">
          <div
            class="cursor-pointer bg-white rounded-full p-2"
            :class="{ 'bg-green-500 rounded-full p-2': Visto == 0 }"
            @click="StatusSerie(id, 0)"
          >
            Quero ver
          </div>
          <div
            class="cursor-pointer bg-white rounded-full p-2"
            :class="{ 'bg-green-500 rounded-full p-2': Visto == 1 }"
            @click="StatusSerie(id, 1)"
          >
            Assistido
          </div>
          <img
            @click="editSerie(id)"
            class="cursor-pointer"
            :src="require('@/assets/edit.svg')"
            alt=""
          />
          <img
            @click="deleteSerie(id)"
            class="cursor-pointer"
            width="34px"
            height="34px"
            :src="require('@/assets/delete.svg')"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteSerie,updateWatchOrNotWatch } from "../Helpers/app";

export default {
  methods: {
    editSerie(id){
        this.$store.commit('data/filterUpdateSerie',id)
        this.serieFiltered = this.$store.state.data.serieFiltered
        this.$emit('openUpdateSidebar',this.serieFiltered)
    },
    deleteSerie(id) {
      deleteSerie('http://localhost:8080/Series/', {method:'delete'} , id, this)
    },
    StatusSerie(id, status) {
      updateWatchOrNotWatch('http://localhost:8080/statusSerie/', {method:'put',data: { Visto: status }} , id, this)
      localStorage.statusChange = true
    },
  },
  data() {
    return {
      status: "",
      serieFiltered:''
    };
  },
  props: ["RadioId", "Nome", "Sinopse", "Lancamento", "File", "id", "Visto"],
};
</script>

<style>
.color-card {
  background: linear-gradient(rgba(26, 202, 40, 0), #ebe8e8 48px);
}
.content-card-serie {
  display: none;
}

.info-serie:hover .content-card-serie {
  display: block;
}
.numbers-paragrafo {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>