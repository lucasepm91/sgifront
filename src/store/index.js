import Vuex from "vuex";
import Vue from "vue";
import usuario from "./modules/usuario";
import evento from "./modules/evento";
import compra from "./modules/compra";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      usuario,
      evento,
      compra
  }
});