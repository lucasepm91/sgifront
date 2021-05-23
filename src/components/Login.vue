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
          v-model="form.email"
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
          v-model="form.password"
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
export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
  },
  methods: {
    signIn() {      
      this.form.email = '';
      this.form.password = '';
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