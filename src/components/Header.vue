<template>
  <div>
    <div id="banner">  
        <h2 id="nomeSite">SGI</h2>    
    </div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item><router-link tag="nav" to="/">Home</router-link></b-nav-item>
          <b-nav-item-dropdown text="Eventos" v-if="autenticado && cliente">
            <b-dropdown-item><router-link tag="nav" to="/shows">Shows de música</router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="nav" to="/filmes">Filmes</router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="nav" to="/pecas-teatro">Peças de teatro</router-link></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="autenticado && cliente"><router-link tag="nav" to="/historico-compras">Histórico</router-link></b-nav-item>
          <b-nav-item v-if="autenticado && cliente"><router-link tag="nav" to="/carrinho">Carrinho</router-link></b-nav-item>
          <b-nav-item v-if="autenticado && !cliente"><router-link tag="nav" to="/historico-eventos">Histórico</router-link></b-nav-item>
          <b-nav-item v-if="autenticado && !cliente"><router-link tag="nav" to="/cadastro-evento">Criar Evento</router-link></b-nav-item>
          <b-nav-item><router-link tag="nav" to="/sobre">Sobre</router-link></b-nav-item>
          <b-nav-item><router-link tag="nav" to="/contato">Contato</router-link></b-nav-item>
          <b-nav-item v-if="!autenticado"><router-link tag="nav" to="/login">Login</router-link></b-nav-item>
          <b-nav-item v-if="autenticado" @click="sair">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      usuario: null,
      autenticado: false,
      cliente: true
    };
  },
  computed: {
    ...mapGetters(["getToken", "getUsuario"])
  },
  watch: {
    getToken(newValue){
      if(newValue != null && newValue != '')
      {
        this.autenticado = true;
      }
      else
      {
        this.autenticado = false;
      }
    },
    getUsuario(newValue)
    {
      if(newValue != null)
      {
        this.usuario = newValue;
        if(newValue.tipoUsuario === "organizador")
        {
          this.cliente = false;          
        }
        else{
          this.cliente = true;
        }
      }
    }
  },
  methods: {
    ...mapActions(["logout"]),
    sair(){
      this.logout();
      this.$router.push({name: 'home'});
    }
  }
};
</script>

<style>
body{
    background-color: whitesmoke;
}
#banner {
  background: #e95917;
  width: 100%;
  height: 180px;
  color: white;
}
#nomeSite{
    color: white;
    font-weight: bold;
    font-size: 3em;
    font-family: cursive;
    padding-top: 60px;
    padding-left: 60px;
}
</style>