

//MESSAGE
const messageToast = (title, description, status, self) => {
  return self.$toast({
    title: title,
    description: description,
    status: status,
    duration: 10000,
  });
}

//POST
const sendNewSerie = (urlAxios, config, istanceVue) => {
  istanceVue.$axios(urlAxios, config)
    .then((response) => {
      messageToast("Serie criada", "Serie foi criada com sucesso!", "success", istanceVue)
      istanceVue.errorsAddSerie = "";
      istanceVue.getAllSeries();
    })
    .catch((err) => {
      messageToast("Serie não inserida", "Serie não foi criada,corrija o formulário", "error", istanceVue)
      istanceVue.errorsAddSerie = err.response.data ? err.response.data : "";
    });
}

//GET
const getAllSeries = (urlAxios, config, istanceVue) => {
    istanceVue.$axios(urlAxios, config).then((response) => {
      localStorage.serie = JSON.stringify(response.data)
      istanceVue.$store.commit("data/updateSeries", JSON.parse(localStorage.serie))
    });
}

//DELETE
const deleteSerie = (urlAxios, config, data, istanceVue) => {
  istanceVue.$axios(urlAxios + data, config)
    .then((response) => {
      messageToast("Série deletada com sucesso", "sdafdfadfdfs", "error", istanceVue);
    })
}

//PUT
const updateWatchOrNotWatch = (urlAxios, config, data, istanceVue) => {
  istanceVue.$axios(urlAxios + data, config)
    .then((response) => {
      istanceVue.Visto = response.data.Visto
    })
}

//PUT
const editSerie = (urlAxios, config, id, istanceVue) => {
  istanceVue.$axios(urlAxios + id, config)
    .then((response) => {
      messageToast("Serie atualizada", "Serie foi atualizada com sucesso!", "success", istanceVue)
      istanceVue.errorsUpdateSerie = "";
      istanceVue.getAllSeries();
    })
    .catch((err) => {
      messageToast("Serie não atualizada", "Serie não foi atualizada,corrija o formulário", "error", istanceVue)
      istanceVue.errorsUpdateSerie = err.response.data ? err.response.data : "";
    });
}

module.exports = {
  messageToast,
  deleteSerie,
  updateWatchOrNotWatch,
  getAllSeries, sendNewSerie, editSerie
}