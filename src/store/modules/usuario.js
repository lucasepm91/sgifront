import axios from "axios";

const state = {
    usuario: null,
    token: ""
};

const getters = {
    getUsuario: state => state.usuario,
    getToken: state => state.token
};

const actions = {
    getUsuario({ commit},usuario) {        
        commit('getUsuario', usuario);
    },
    login({ commit }, token){        
        commit('login', token);
    },
    cadastrarUsuario({ commit }, usuario){
        const headers = { 
            "Content-Type": "application/json"
        };

        axios.post(
            "http://localhost:8080/pbsgi/usuario", usuario, {headers}
        ).then((response) => {
            commit('cadastrarUsuario', response.data);
        });
    },
    logout({ commit }){
        commit('logout');
    } 
}

const mutations = {
    getUsuario: (state, usuario) =>{
        state.usuario = usuario;        
    },
    login: (state,token) =>{        
        state.token = token;
        console.log(state.token);
    },
    logout: (state) =>{
        state.token = "";
        state.usuario = null;
    },
    cadastrarUsuario: (state,data) =>{ 
        state.usuario = data;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
};