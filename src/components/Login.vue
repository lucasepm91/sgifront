<template>
  <div>

    <div id="divTituloSignIn">
      <p id="tituloSignIn">SignIn</p>
    </div>

    <b-form id="formularioSignIn" validated> 
      
      <b-form-group
        id="input-group-email-login"
        label="Email:"
        label-for="input-email-login">
        <b-form-input
          id="input-email-login"
          v-model="email"
          type="email"
          required
          placeholder="Informe seu email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password-login"
        label="Senha:"
        label-for="input-password-login">
        <b-form-input
          id="input-password-login"
          v-model="password"
          type="password"
          required
          placeholder="Senha"
        ></b-form-input>
      </b-form-group>
      
      <b-button @click="signIn" id="botaoSignIn">Enviar</b-button>    
       
    </b-form> 

    <div id="linkParaSignUp">
      <p>Ainda não é cadastrado? Cadastre-se <router-link to="/sign-up">aqui</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
    name: 'Login',
    data() {
      return {        
        password: '',
        email: ''
      }
  },
  methods: {
    ...mapActions(["login","getUsuario"]),
    signIn() { 
      let loginNovo = {
          "email": this.email,
          "password": this.password
        };
      let token = "";

      if(loginNovo.email != null)
      {        
        try {
          const headersSemAuth = { 
            "Content-Type": "application/json"
          };

          axios.post("http://localhost:8080/pbsgi/login", loginNovo, {headersSemAuth}).then((response) => {
            token = response.data.token;
            
            this.login(token);   
            this.carregarUsuario(token, loginNovo.email);
          });          
        } catch (e) {
          console.error(e);
        }       
        
      }
      
    },
    carregarUsuario(token, email){
      let usuario = null;
      
      try {
          const headers = { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          };

          axios.get("http://localhost:8080/pbsgi/usuario/email/" + email, {headers}).then((response) => {
            usuario = response.data;

            this.getUsuario(usuario);
            this.$router.push({name: 'home'});
          });          
          
        } catch (e) {
          console.error(e);
        }          
        
      }
    }
  }

</script>

<style scoped>
#divTituloSignIn{
    margin-top: 50px;
    text-align: center;
}
#divTituloSignIn p{
    color: dimgray;
    font-size: 1.5em;
    font-style: italic;
}
#botaoSignIn{
  margin-top: 30px;
  background-color: #c6391e;
  color: whitesmoke;
  border: solid 2px;
}
#formularioSignIn {
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
  border: solid 1px #C0C0C0; 
  border-radius: 5px; 
  color: whitesmoke;
  background-image: linear-gradient(
    to bottom,
    #b51d1d,
    #c6391e,
    #d6511f,
    #e66821,
    #f47e23
  );
}
#linkParaSignUp{
    margin-top: 25px;
    text-align: center;
}
#linkParaSignUp p{
    color: dimgray;
    font-size: 1.25em;
    font-style: italic;
}
</style>