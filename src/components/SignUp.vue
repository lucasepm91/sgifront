<template>
  <div>

    <div id="divTituloSignUp">
      <p id="tituloSignUp">SignUp</p>
    </div>

    <b-form id="formularioSignUp" validated> 
      
      <b-form-group id="input-group-nome-signup" label="Nome:" label-for="input-nome-signup">
        <b-form-input
          id="input-nome-signup"
          v-model="form.nome"
          required
          placeholder="Informe seu nome"
        ></b-form-input>
      </b-form-group>    

      <b-form-group id="input-group-cpf-signup" label="Cpf ou Cnpj:" label-for="input-cpf-signup">
        <b-form-input
          id="input-cpf-signup"
          v-model="form.cpf"
          required
          placeholder="Informe seu cpf"
        ></b-form-input>
      </b-form-group>    

      <b-form-group id="input-group-endereco-signup" label="Endereço:" label-for="input-endereco-signup">
        <b-form-input
          id="input-endereco-signup"
          v-model="form.endereco"
          required
          placeholder="Informe seu endereço"
        ></b-form-input>
      </b-form-group>      

      <b-form-group
        id="input-group-email-signup"
        label="Email:"
        label-for="input-email-signup">
        <b-form-input
          id="input-email-signup"
          v-model="form.email"
          type="email"
          required
          placeholder="Informe seu email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password-signup"
        label="Senha:"
        label-for="input-password-signup">
        <b-form-input
          id="input-password-signup"
          v-model="form.password"
          type="password"
          required
          placeholder="Senha"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Escolha o tipo de usuário" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group"
        v-model="form.selected"
        :aria-describedby="ariaDescribedby"
        name="radio-sub-component"
      >
        <b-form-radio size="lg" value="cliente">Cliente</b-form-radio>
        <b-form-radio size="lg" value="organizador">Organizador</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
      
      <b-button @click="signUp" id="botaoSignUp">Enviar</b-button>    
       
    </b-form>     
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "SignUp",
    data() {
      return {
        form: {
          nome: '',
          cpf: '',
          endereco: '',
          email: '',
          password: '',
          selected: 'cliente'
        }
      }
  },
  methods: {
    ...mapActions(["cadastrarUsuario"]),
    signUp() {   
      let usuario = {
        "nome": this.form.nome,
        "cpfCnpj": this.form.cpf,
        "email": this.form.email,
        "endereco": this.form.endereco,
        "tipoUsuario": this.form.selected,
        "saldoCarteira": 5000,
        "password": this.form.password
      };
      this.cadastrarUsuario(usuario);
      this.$router.push({name: 'login'});
    }
  }  
}
</script>

<style scoped>
#divTituloSignUp{
    margin-top: 50px;
    text-align: center;
}
#divTituloSignUp p{
    color: dimgray;
    font-size: 1.5em;
    font-style: italic;
}
#botaoSignUp{
  margin-top: 30px;
  background-color: #c6391e;
  color: whitesmoke;
  border: solid 2px;
}
#formularioSignUp {
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
</style>