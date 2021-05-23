import axios from "axios";

const state = {
    eventos: []
};

const getters = {
    allEventos: state => state.eventos
};

const actions = {
    getEventos({ commit }) {
        axios.get(
            "http://localhost:8081/pbsgi/eventos"
        ).then((response) => {
            commit('getEventos', response.data);
        });

    }
}

const mutations = {
    getEventos: (state, data) =>{
        state.eventos = data;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
};