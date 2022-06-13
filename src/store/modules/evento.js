import axios from "axios";

const state = {
    shows: [],
    filmes: [],
    pecas: [],
    palestras: [],
    historico: [],
    ultimoEvento: null
};

const getters = {
    todosShows: state => state.shows,
    todosFilmes: state => state.filmes,
    todosPecas: state => state.pecas,
    todosPalestras: state => state.palestras,
    todosHistorico: state => state.historico,
    obterEvento: state => state.ultimoEvento
};

const actions = {
    buscarShows({ commit }, token) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "https://localhost:44390/sgi/evento/tipo/show", {headers}
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
            "https://localhost:44390/sgi/evento/tipo/filme", {headers}
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
            "https://localhost:44390/sgi/evento/tipo/peca", {headers}
        ).then((response) => {
            commit('buscarPecasTeatro', response.data);
        });
    },

    buscarPalestras({ commit }, token) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "https://localhost:44390/sgi/evento/tipo/palestra", {headers}
        ).then((response) => {
            commit('buscarPalestras', response.data);
        });
    },

    buscarHistorico({ commit }, {usuarioId, token}) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "https://localhost:44390/sgi/evento/historico/"+usuarioId, {headers}
        ).then((response) => {
            commit('buscarHistorico', response.data);
        });
    },

    buscarEvento({ commit }, {id, token}) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };
        
        axios.get(
            "https://localhost:44390/sgi/evento/"+id, {headers}
        ).then((response) => {
            commit('buscarEvento', response.data);
        });
    },

    buscarEventoPorNome({ commit }, {nomeEvento, token}) {
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.get(
            "https://localhost:44390/sgi/evento/nome/"+nomeEvento, {headers}
        ).then((response) => {
            commit('buscarEventoPorNome', response.data);
        });
    },

    criarEvento({ commit }, {evento, token}){ 
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };
        
        axios.post(
          "https://localhost:44390/sgi/evento", evento, {headers}
        ).then((response) => {      
          commit('criarEvento', response.data);
        });
        
    },

    deletarEvento({ commit }, {id, token}){
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.delete(
          "https://localhost:44390/sgi/evento/"+id, {headers}
        ).then((response) => {      
          commit('deletarEvento', response.data.id);
        });
        
    },
    
    atualizarEvento({ commit }, {atlzEvento, token}) {  
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.put(
          "https://localhost:44390/sgi/evento/"+atlzEvento.id, atlzEvento, {headers}
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
    buscarPalestras: (state, data) =>{
        state.palestras = data;
    },
    buscarHistorico: (state, data) =>{
        state.historico = data;
    },
    buscarEvento: (state, data) =>{
        state.ultimoEvento = data;
    },
    buscarEventoPorNome: (state, data) =>{
        state.ultimoEvento = data;
    },
    criarEvento: (state, data) =>{

        state.ultimoEvento = data;
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