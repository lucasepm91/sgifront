<template>
  <div class="espacoChao">
    <h4 class="tituloHistorico">Meus eventos</h4>

    <b-list-group v-show="elementos != null && elementos.length > 0">
      <b-list-group-item :key="elemento.id" v-for="elemento in obterElementos"><span class="espacoSpan">Nome: {{elemento.nome}}</span> <span class="espacoSpan">Lotação: {{elemento.lotacao}}</span>
           <span class="espacoSpan">Ingressos vendidos: {{elemento.ingressosVendidos}}</span>
        <b-button size="sm" variant="danger" class="botaoExcluir" @click="deletar(elemento.id)">
          <b-icon icon="trash" ></b-icon>
        </b-button>
      </b-list-group-item>
    </b-list-group>

    <b-container class="erroPesquisa" v-show='mostrarVazio'>
      <b-alert show variant="danger">Não foram encontrados eventos!</b-alert>
    </b-container>

    <b-modal v-model="mostrarMensagem" title="Evento removido!" :hide-footer="true" id="mensagemSucesso">
       <b-img center :src="require('../assets/imagemSucesso.png')" fluid alt="símbolo de sucesso" title="símbolo de sucesso" id="imgCheck"></b-img>
    </b-modal>   
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'HistoricoEventos',
  data() {
    return {
      elementos: [],
      mostrarMensagem: false
    };
  },
  created() {
    let token = this.getToken;
    let usuarioId = this.getUsuario.id;
    
    this.buscarHistorico({usuarioId, token});
  },
  methods: {
    ...mapActions(["buscarHistorico", "deletarEvento"]),
    carregarElementos(){
      this.elementos = this.todosHistorico;     

      return this.elementos;
    },
    deletar(id){
      let token = this.getToken;

      this.deletarEvento({id, token});

      this.mostrarMensagem = true;      
      setTimeout(this.escondeMensagem, 1000);
    },
    escondeMensagem(){
      this.mostrarMensagem = false;
      this.$router.push({name: 'home'});
    }
  },
  computed:{
    ...mapGetters(["getToken","getUsuario","todosHistorico"]),
    obterElementos: function(){
      return this.carregarElementos();
    },
    mostrarVazio: function(){
      return this.elementos.length == 0;
    }
  }  
}
</script>

<style scoped>

.tituloHistorico{
  margin-top:50px;
  margin-bottom:20px;
}

.botaoExcluir{
  float: right;
}

.erroPesquisa{
  margin-top: 3rem;
}

.espacoSpan{
  margin-right: 50px;
}

.espacoChao{
  margin-bottom: 50px;
}

</style>