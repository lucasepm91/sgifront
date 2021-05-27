import axios from "axios";

const state = {
    shows: [],
    filmes: [],
    pecas: [],
    historico: []
};

const getters = {
    todosShows: state => state.shows,
    todosFilmes: state => state.filmes,
    todosPecas: state => state.pecas,
    todosHistorico: state => state.historico
};

const actions = {
    buscarShows({ commit }) {
        axios.get(
            "http://localhost:8080/pbsgi/evento/shows"
        ).then((response) => {
            commit('buscarShows', response.data);
        });
    },

    buscarFilmes({ commit }) {
        axios.get(
            "http://localhost:8080/pbsgi/evento/filmes"
        ).then((response) => {
            commit('buscarFilmes', response.data);
        });
    },

    buscarPecasTeatro({ commit }) {
        axios.get(
            "http://localhost:8080/pbsgi/evento/pecas"
        ).then((response) => {
            commit('buscarPecasTeatro', response.data);
        });
    },

    buscarHistorico({ commit }, usuarioId) {
        axios.get(
            "http://localhost:8080/pbsgi/evento/historico/"+usuarioId
        ).then((response) => {
            commit('buscarHistorico', response.data);
        });
    },

    buscarEvento({ commit }, eventoId) {
        axios.get(
            "http://localhost:8080/pbsgi/evento/historico/"+eventoId
        ).then((response) => {
            commit('buscarEvento', response.data);
        });
    },

    criarEvento({ commit }, evento){ 
        const headers = { 
          "Content-Type": "application/json"
        };
    
        axios.post(
          "http://localhost:8080/evento", evento, {headers}
        ).then((response) => {      
          commit('criarEvento', response.data);
        });
        
    },

    deletarEvento({ commit }, id){
        const headers = { 
          "Content-Type": "application/json"
        };
    
        axios.delete(
          "http://localhost:8080/evento/"+id, {headers}
        ).then((response) => {      
          commit('deletarEvento', response.data.id);
        });
        
    },
    
    atualizarEvento({ commit }, atlzEvento) {  
        const headers = { 
          "Content-Type": "application/json"
        };
    
        axios.put(
          "http://localhost:8080/evento/"+atlzEvento.id, atlzEvento, {headers}
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
        state.pecas = data;
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