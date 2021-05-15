<template>
<header class="bg-header w-full m-auto h-20 z-10 flex items-center fixed ">
    <img class="z-10 h-14 pl-10 cursor-pointer" :src="require('@/assets/Logo.png')" alt="">
    <div class="flex space-x-4 pl-10 group">
        <h1 class="text-gray-200 font-bold cursor-pointer hover:text-white">Inicio</h1>
        <button @click="openSidebarAddSerie" class="text-gray-200 font-bold cursor-pointer hover:text-white focus:text-yellow-300">Adicionar serie</button>
    </div>
</header>
</template>

<script>
export default {
methods:{
    openSidebarAddSerie(){
        this.$emit('openSidebar')
    }
}    
};
</script>

<style>
</style>