export const state = () => ({
dataSeries:'',
status:false,
serieFiltered:[{
    Nome:'',
    Lancamento:'',
    Temporadas:'',
    File:'',
    Sinopse:'',
    Categoria:'',
    Visto:'',
}]
})

export const mutations = {
    changeStatus(state){
        state.status = true
    },
    filterUpdateSerie(state,idSerie){
        state.serieFiltered = state.dataSeries.filter( serie => serie.id === idSerie )
    },
    updateSeries(state,updateData){
        state.dataSeries = updateData
    }
}
