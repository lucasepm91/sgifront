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
            "https://localhost:44390/sgi/usuario", usuario, {headers}
        ).then((response) => {
            commit('cadastrarUsuario', response.data);
        });
    },
    adicionarSaldo({ commit }, {token, codigo, id}){
        const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        axios.post(
            "https://localhost:44390/sgi/usuario/" + id + "/carteira", codigo, {headers}
        ).then((response) => {
            commit('atualizarUsuario', response.data);
        });
    },    
    logout({ commit }){
        commit('logout');
    },
    subtrairSaldo({ commit }, valor){
        commit('subtrairCarteira', valor)
    },
    enviarEmail({commit}, emailDto){        
        const headers = { 
            "Content-Type": "application/json"
        };

        axios.post(
            "https://localhost:44390/sgi/usuario/contato", emailDto, {headers}
        ).then(() => {
            commit('acusarEmail');
        });
    } 
}

const mutations = {
    getUsuario: (state, usuario) =>{
        state.usuario = usuario;        
    },
    login: (state,token) =>{        
        state.token = token;
    },
    logout: (state) =>{
        state.token = "";
        state.usuario = null;
    },
    cadastrarUsuario: (state,data) =>{ 
        state.usuario = data;
    },
    subtrairCarteira: (state,valor) =>{ 
        state.usuario.saldoCarteira -= valor;
    },
    atualizarUsuario: (state,data) =>{ 
        state.usuario = data;
    },
    acusarEmail: () =>{
        console.log("Email enviado!")
    }
}

export default {
    state,
    actions,
    getters,
    mutations
};