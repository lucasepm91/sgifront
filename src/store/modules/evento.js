import axios from "axios";

const state = {
    shows: [],
    filmes: [],
    pecas: [],
    historico: [],
    ultimoEvento: []
};

const getters = {
    todosShows: state => state.shows,
    todosFilmes: state => state.filmes,
    todosPecas: state => state.pecas,
    todosHistorico: state => state.historico
};

const actions = {
    buscarShows({ commit }, token) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "http://localhost:8080/pbsgi/eventos/tipo/shows", {headers}
        ).then((response) => {
            commit('buscarShows', response.data);
        });
    },

    buscarFilmes({ commit }, token) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "http://localhost:8080/pbsgi/eventos/tipo/filmes", {headers}
        ).then((response) => {
            commit('buscarFilmes', response.data);
        });
    },

    buscarPecasTeatro({ commit }, token) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "http://localhost:8080/pbsgi/eventos/tipo/pecas", {headers}
        ).then((response) => {
            commit('buscarPecasTeatro', response.data);
        });
    },

    buscarHistorico({ commit }, usuarioId, token) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "http://localhost:8080/pbsgi/eventos/historico/"+usuarioId, {headers}
        ).then((response) => {
            commit('buscarHistorico', response.data);
        });
    },

    buscarEvento({ commit }, eventoId, token) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "http://localhost:8080/pbsgi/eventos/"+eventoId, {headers}
        ).then((response) => {
            commit('buscarEvento', response.data);
        });
    },

    buscarEventoPorNome({ commit }, nomeEvento, token) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "http://localhost:8080/pbsgi/eventos/nome/"+nomeEvento, {headers}
        ).then((response) => {
            commit('buscarEventoPorNome', response.data);
        });
    },

    criarEvento({ commit }, evento, token){ 
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.post(
          "http://localhost:8080/pbsgi/evento", evento, {headers}
        ).then((response) => {      
          commit('criarEvento', response.data);
        });
        
    },

    deletarEvento({ commit }, id, token){
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.delete(
          "http://localhost:8080/evento/pbsgi/"+id, {headers}
        ).then((response) => {      
          commit('deletarEvento', response.data.id);
        });
        
    },
    
    atualizarEvento({ commit }, atlzEvento, token) {  
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.put(
          "http://localhost:8080/pbsgi/evento/"+atlzEvento.id, atlzEvento, {headers}
        ).then((response) => {      
          commit("atualizarEvento", response.data);
        });
    }      
      
}

const mutations = {
    buscarShows: (state, data) =>{
        state.shows = data;
    },
    buscarFilmes: (state, data) =>{
        state.filmes = data;
    },
    buscarPecasTeatro: (state, data) =>{
        state.pecas = data;
    },
    buscarHistorico: (state, data) =>{
        state.historico = data;
    },
    buscarEvento: (state, data) =>{
        state.ultimoEvento.push(data);
    },
    buscarEventoPorNome: (state, data) =>{
        state.ultimoEvento.push(data);
    },
    criarEvento: (state, data) =>{
        state.historico.push(data);
    },
    deletarEvento: (state, id) =>{
        state.historico = state.historico.filter(e => e.id != id);
    },
    atualizarEvento: (state, data) => {
        const index = state.historico.findIndex(e => e.id === data.id)
        if (index !== -1) {        
          state.historico.splice(index, 1, data);
        }
    }

}

export default {
    state,
    actions,
    getters,
    mutations
};