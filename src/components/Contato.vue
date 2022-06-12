<template>
  <div>

    <div id="divTituloContato">
      <p id="infoContato">Deixe aqui suas sugestões, solicitações, reclamações ou elogios. Sua opinião é muito importante para nós!</p>
    </div>

    <b-form id="formulario" validated>
      
      <b-form-group id="input-group-assunto" label="Assunto:" label-for="input-assunto">
        <b-form-input
          id="input-assunto"
          v-model="form.assunto"
          required
          placeholder="Informe seu assunto"
        ></b-form-input>
      </b-form-group>    
      
      <b-form-group
        id="input-group-email"
        label="Email:"
        label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Informe seu email"
        ></b-form-input>
      </b-form-group>
      
      <b-form-textarea
      id="textarea"
      v-model="form.mensagem"
      placeholder="Escreva aqui sua mensagem..."
      required
      rows="5"      
      maxlength="850"></b-form-textarea>
      
      <b-button @click="enviaDados" id="botaoSubmit">Enviar</b-button>    
       
    </b-form> 

     <b-modal v-model="mostrarMensagem" title="Enviado com sucesso!" :hide-footer="true" id="mensagemSucesso">
       <b-img center :src="require('../assets/imagemSucesso.png')" fluid alt="símbolo de sucesso" title="símbolo de sucesso" id="imgCheck"></b-img>
     </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'Contato',
    data() {
      return {
        form: {
          email: '',
          assunto: '',
          mensagem: ''
        },
        mostrarMensagem: false
      }
  },
  methods: {
    ...mapActions(["enviarEmail"]),
    enviaDados() {
      let emailDto = {
        "email": this.form.email,
        "assunto": this.form.assunto,
        "mensagem": this.form.mensagem
      }      
      this.enviarEmail(emailDto);
      this.mostrarMensagem = true;
      this.form.email = '';
      this.form.assunto = '';
      this.form.mensagem = '';  
      
      setTimeout(this.escondeMensagem, 1000);
    },
    escondeMensagem(){
      this.mostrarMensagem = false;
      this.$router.push({name: 'home'});
    }
  }  
}
</script>

<style scoped>
#botaoSubmit{
  margin-top: 30px;
  background-color: #c6391e;
  color: whitesmoke;
  border: solid 2px;
}
#formulario {
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
#textarea{
  margin-top: 50px;
}
#textarea::-webkit-scrollbar {
   display: none;
 }
#divTituloContato{
    margin-top: 50px;
    text-align: center;
}
#divTituloContato p{
    color: dimgray;
    font-size: 1.5em;
    font-style: italic;
}
#imgCheck{
  max-width: 10rem;
  max-height: 10rem;
}
</style>