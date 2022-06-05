import axios from "axios";

const state = {
    compra: [],
    historicoCompra:[]
  };
  
  const getters = {
      buscarCompra: state => state.compra,
      todasCompras: state => state.historicoCompra
  };
  
  const actions = {    
  
  criarCompra({ commit }, {compra, token}){ 
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
  };
    
  axios.post(
    "https://localhost:44390/sgi/compra", compra, {headers}
    ).then((response) => {
      commit('inserirCompra', response.data);
    });    
  },

  historicoCompras({ commit }, {id, token}){ 
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
  };
    
  axios.get(
    "https://localhost:44390/sgi/compra/historico/"+id, {headers}
    ).then((response) => {
      commit('historicoCompra', response.data);
    });
  },

  deletarCompra({ commit }, {id, token}){ 
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
  };
    
  axios.delete(
    "https://localhost:44390/sgi/compra/"+id, {headers}
    ).then((response) => {
      commit('removerCompra', response.data);
    });
  },

  adicionarCarrinho({ commit }, {ingresso}){
    commit('adicionarIngresso', ingresso)
  },

  limparCompra({ commit }){
    commit('limparCompra')
  },

  removerIngresso({ commit }, {id}){
    commit('removerIngresso', id)
  }
 }
  
const mutations = {    
    inserirCompra: (state, data) => state.compra.push(data),
    historicoCompra: (state, data) => state.historicoCompra = data,
    removerCompra: (state, id) =>{
        state.historicoCompra = state.historicoCompra.filter(c => c.id != id);
    },
    limparCompra:(state) =>{
      state.compra = [];
    },
    removerIngresso:(state, id) =>{
      state.compra = state.compra.filter(c => c.id != id);
    },
    adicionarIngresso:(state, ingresso) => state.compra.push(ingresso)
}
  
export default {
    state,
    actions,
    getters,
    mutations
};