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

      <b-form-group id="input-group-pais-signup" label="País:" label-for="input-pais-signup">
        <b-form-input
          id="input-pais-signup"
          v-model="form.pais"
          required
          placeholder="Informe o país"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-estado-signup" label="Estado:" label-for="input-estado-signup">
        <b-form-input
          id="input-estado-signup"
          v-model="form.estado"
          required
          placeholder="Informe o estado"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-cidade-signup" label="Cidade:" label-for="input-cidade-signup">
        <b-form-input
          id="input-cidade-signup"
          v-model="form.cidade"
          required
          placeholder="Informe a cidade"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-bairro-signup" label="Bairro:" label-for="input-bairro-signup">
        <b-form-input
          id="input-bairro-signup"
          v-model="form.bairro"
          required
          placeholder="Informe o bairro"
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

      <b-form-group id="input-group-complemento-signup" label="Complemento:" label-for="input-complemento-signup">
        <b-form-input
          id="input-complemento-signup"
          v-model="form.complemento"
          placeholder="Informe o complemento"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-nomeFantasia-signup" label="Nome Fantasia:" label-for="input-nomeFantasia-signup">
        <b-form-input
          id="input-nomeFantasia-signup"
          v-model="form.nomeFantasia"
          placeholder="Informe o nome fantasia caso seja uma empresa"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-nomeResponsavel-signup" label="Nome do Responsável:" label-for="input-nomeResponsavel-signup">
        <b-form-input
          id="input-nomeResponsavel-signup"
          v-model="form.nomeResponsavel"
          placeholder="Informe o nome do responsável caso seja uma empresa"
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

    <b-modal v-model="mostrarMensagem" title="Enviado com sucesso!" :hide-footer="true" id="mensagemSucesso">
       <b-img center :src="require('../assets/imagemSucesso.png')" fluid alt="símbolo de sucesso" title="símbolo de sucesso" id="imgCheck"></b-img>
     </b-modal>   
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
          pais: '',
          estado: '',
          cidade: '',
          bairro: '',
          endereco: '',
          complemento: '',
          nomeFantasia: '',
          nomeResponsavel: '',
          email: '',
          password: '',
          selected: 'cliente'
        },
        mostrarMensagem: false
      }
  },
  methods: {
    ...mapActions(["cadastrarUsuario"]),
    signUp() {   
      let usuario = {
        "nome": this.form.nome,
        "cpfCnpj": this.form.cpf,
        "email": this.form.email,
        "tipoUsuario": this.form.selected,
        "saldoCarteira": 0,
        "password": this.form.password,
        "nomeFantasia": this.form.nomeFantasia,
        "nomeResponsavel": this.form.nomeResponsavel,
        "pais": this.form.pais,
        "estado": this.form.estado,
        "cidade": this.form.cidade,
        "bairro": this.form.bairro,
        "enderecoCompleto": this.form.endereco,
        "complemento": this.form.complemento
      };
      this.cadastrarUsuario(usuario);
      this.mostrarMensagem = true;
      setTimeout(this.escondeMensagem, 1000);      
    },
    escondeMensagem(){
      this.mostrarMensagem = false;
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