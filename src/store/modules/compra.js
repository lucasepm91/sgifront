import axios from "axios";

const state = {
    compra: []
  };
  
  const getters = {
      buscarCompra: state => state.compra,
  };
  
  const actions = {    
  
  criarCompra({ commit }, {compra, token}){ 
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
  };
    
  axios.post(
    "http://localhost:8080/pbsgi/compra", compra, {headers}
    ).then((response) => {
      commit('inserirCompra', response.data);
    });    
  }

 }
  
const mutations = {    
    inserirCompra: (state, data) => state.compra.push(data)
}
  
export default {
    state,
    actions,
    getters,
    mutations
};