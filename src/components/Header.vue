<template>
  <div>
    <div id="banner">  
        <h2 id="nomeSite">SGI</h2>    
    </div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item><router-link tag="nav" to="/">Home</router-link></b-nav-item>
          <b-nav-item-dropdown text="Eventos">
            <b-dropdown-item><router-link tag="nav" to="/shows">Shows de música</router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="nav" to="/filmes">Filmes</router-link></b-dropdown-item>
            <b-dropdown-item><router-link tag="nav" to="/pecas">Peças de teatro</router-link></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item><router-link tag="nav" to="/sobre">Sobre</router-link></b-nav-item>
          <b-nav-item><router-link tag="nav" to="/contato">Contato</router-link></b-nav-item>
          <b-nav-item><router-link tag="nav" to="/login">Login</router-link></b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
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