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

      <b-form-group id="input-group-cpf-signup" label="Cpf:" label-for="input-cpf-signup">
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

      <b-form-group id="input-group-cidade-signup" label="Cidade:" label-for="input-cidade-signup">
        <b-form-input
          id="input-cidade-signup"
          v-model="form.cidade"
          required
          placeholder="Informe a cidade em que vive"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-bairro-signup" label="Bairro:" label-for="input-bairro-signup">
        <b-form-input
          id="input-bairro-signup"
          v-model="form.bairro"
          required
          placeholder="Informe o bairro em que vive"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-cep-signup" label="Cep:" label-for="input-cep-signup">
        <b-form-input
          id="input-cep-signup"
          v-model="form.cep"
          required
          placeholder="Informe o cep"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-uf-signup" label="UF:" label-for="input-uf-signup">
        <b-form-input
          id="input-uf-signup"
          v-model="form.uf"
          required
          placeholder="Informe UF"
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
      
      <b-button @click="signUp" id="botaoSignUp">Enviar</b-button>    
       
    </b-form>     
  </div>
</template>

<script>
export default {
    name: "SignUp",
    data() {
      return {
        form: {
          nome: '',
          cpf: '',
          endereco: '',
          cidade: '',
          bairro: '',
          cep: '',
          uf: '',
          email: '',
          password: ''
        }
      }
  },
  methods: {
    signIn() {   
      this.form.nome = '';
      this.form.cpf = '';
      this.form.endereco = '';
      this.form.cidade = '';
      this.form.bairro = '';
      this.form.cep = '';
      this.form.uf = '';   
      this.form.email = '';
      this.form.password = '';

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