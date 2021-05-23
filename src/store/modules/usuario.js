import axios from "axios";

const state = {
    usuarios: []
};

const getters = {
    allUsuarios: state => state.usuarios
};

const actions = {
    getUsuario({ commit }) {
        axios.get(
            "http://localhost:8081/pbsgi/usuario"
        ).then((response) => {
            commit('getUsuario', response.data);
        });

    }
}

const mutations = {
    getusuario: (state, data) =>{
        state.usuarios = data;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
};