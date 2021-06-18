<template>
  <div>

    <div id="divTituloCadastroEvento">
      <p id="tituloCadastroEvento">Forneça as informações sobre o evento</p>
    </div>

    <b-form id="formularioCadastroEvento" validated> 
      
      <b-form-group id="input-group-nome-cadastroevento" label="Nome:" label-for="input-nome-cadastroevento">
        <b-form-input
          id="input-nome-cadastroevento"
          v-model="form.nome"
          required
          placeholder="Informe o nome do evento"
        ></b-form-input>
      </b-form-group>    

      <b-form-group id="input-group-lotacao-cadastroevento" label="Lotação:" label-for="input-lotacao-cadastroevento">
        <b-form-input
          id="input-lotacao-cadastroevento"
          v-model="form.lotacao"
          type="number" step="1" min="5"
          required
          placeholder="Informe a lotação"
        ></b-form-input>
      </b-form-group>    

      <b-form-group id="input-group-endereco-cadastroevento" label="Endereço:" label-for="input-endereco-cadastroevento">
        <b-form-input
          id="input-endereco-cadastroevento"
          v-model="form.endereco"
          required
          placeholder="Informe o endereço do evento"
        ></b-form-input>
      </b-form-group>      

      <b-form-group id="input-group-preco-cadastroevento" label="Preço:" label-for="input-preco-cadastroevento">
        <b-form-input
          id="input-preco-cadastroevento"
          v-model="form.preco"
          type="number" step="0.01" min="0"
          required
          placeholder="Informe o preço do ingresso"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-data-cadastroevento" label="Data do evento:" label-for="input-datepicker-cadastroevento">
        <b-form-datepicker id="input-datepicker-cadastroevento" v-model="form.dia" locale="pt-BR"></b-form-datepicker>        
      </b-form-group>

      <b-form-group id="input-group-horario-cadastroevento" label="Horário do evento:" label-for="input-horario-cadastroevento">
        <b-form-timepicker id="input-horario-cadastroevento" v-model="form.horario" locale="pt-BR"></b-form-timepicker>    
      </b-form-group>

      <b-form-group id="input-group-descricao-cadastroevento" label="Descrição do evento:" label-for="textarea-cadastroevento">
        <b-form-textarea id="textarea-cadastroevento" v-model="form.descricao" rows="3" required>
        </b-form-textarea>
      </b-form-group>  

    <b-form-group label="Escolha o tipo de evento" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-cadastroevento"
        v-model="form.selected"
        :aria-describedby="ariaDescribedby"
        name="radio-sub-component-cadastroevento"
      >
        <b-form-radio size="lg" value="filme">Filme</b-form-radio>
        <b-form-radio size="lg" value="show">Show</b-form-radio>
        <b-form-radio size="lg" value="peca">Peça de teatro</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
      
      <b-button @click="cadastrarEvento" id="botaoCadastroEvento">Enviar</b-button>    
       
    </b-form>  

    <b-modal v-model="mostrarMensagem" title="Solicitação realizada!" :hide-footer="true" id="mensagemSucesso">
       <b-img center :src="require('../assets/imagemSucesso.png')" fluid alt="símbolo de sucesso" title="símbolo de sucesso" id="imgCheck"></b-img>
    </b-modal>   
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'CadastroEvento',
    data() {
      return {
        form: {
          nome: '',
          lotacao: 5,
          preco: 0,
          endereco: '',
          dia: '',
          horario: '',
          descricao: '',
          selected: 'filme'
        },
        mostrarMensagem: false
      }
  },
  methods: {
    ...mapActions(["criarEvento"]),
    cadastrarEvento() {   
      let token = this.getToken;
      let usuario = this.getUsuario;
      let dataEscolhida = new Date(this.form.dia);
      let dataBrasil = dataEscolhida.toLocaleDateString('pt-BR');
      let partesHorario = this.form.horario.split(":");
      let dataFinal = dataBrasil + " " + partesHorario[0] + ":" + partesHorario[1];
      
      let evento = {
        "nome": this.form.nome,
        "tipoEvento": this.form.selected,
        "organizador": usuario,
        "lotacao": this.form.lotacao,
        "ingressosVendidos": 0,
        "preco": this.form.preco,
        "endereco": this.form.endereco,
        "data": dataFinal,
        "descricao": this.form.descricao
      };
      this.criarEvento({evento,token});

      this.mostrarMensagem = true;      
      setTimeout(this.escondeMensagem, 1000);
    },
    escondeMensagem(){
      this.mostrarMensagem = false;
      this.$router.push({name: 'home'});
    }
  },
  computed:{
    ...mapGetters(["getToken","getUsuario"])
  }  
}

</script>

<style scoped>

#divTituloCadastroEvento{
    margin-top: 50px;
    text-align: center;
}
#divTituloCadastroEvento p{
    color: dimgray;
    font-size: 1.5em;
    font-style: italic;
}
#botaoCadastroEvento{
  margin-top: 30px;
  background-color: #c6391e;
  color: whitesmoke;
  border: solid 2px;
}
#formularioCadastroEvento {
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