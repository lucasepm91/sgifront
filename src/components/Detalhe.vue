<template>
  <b-container v-if="mostrar && obterElemento != null">
    <h4 id="tituloDetalhe">{{ elemento.nome }}</h4>
    <b-row class="espacoTitulo">
      <b-img class="imagemCentro"
        :src="require('../assets/indisponivel.png')"
        fluid
        :alt='elemento.descricao'
        :title='elemento.nome'
      ></b-img>      
    </b-row>
    <b-row class="espaco distribuicao">
      <b-container class="descricao">
        <p>{{ elemento.descricao }}</p> 
        <p>Data: {{ dataSessao }}</p>       
        <p>Endereço: {{ elemento.enderecoCompleto}}</p>        
        <p>Organizador: {{ elemento.organizador.nome}}</p>
        <p>Email para contato: {{ elemento.organizador.email}}</p>
        <p>Preço: {{ elemento.preco | formataMoeda}}</p>
      </b-container>
      <b-container class="compra">
        <p>Adquira aqui seus ingressos!</p>
        <br>
        <div>
          <b-button-group>
            <b-button :key="sessao.id" v-for="sessao in elemento.sessoes" @click="trocarMapa(sessao.id)">{{sessao.codigoLocal}}</b-button>
          </b-button-group>
        </div>
        <br>
        <b-overlay :show="mostrarOverlay" rounded="sm">
          <escolha-assento v-if="elemento.modalidade == 'presencial'" :key="idSessao" :reservados="reservados" @marcado="inserirAssento" @desmarcado="removerAssento"></escolha-assento>
        </b-overlay>
        <br>
        <p v-if="elemento.modalidade == 'presencial'">Total: {{total | formataMoeda}}</p>
        <b-button variant="primary" @click="adicionarIngressoCarrinho">Adicionar ao carrinho</b-button>
      </b-container>
    </b-row>

    <b-modal v-model="mostrarMensagem" title="Adicionado ao carrinho!" :hide-footer="true" id="mensagemSucesso">
       <b-img center :src="require('../assets/imagemSucesso.png')" fluid alt="símbolo de sucesso" title="símbolo de sucesso" id="imgCheck"></b-img>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EscolhaAssento from './EscolhaAssento.vue';

export default {
  components: { EscolhaAssento },
  name: 'Detalhe',
  data() {
    return {
      id: this.$route.params.id,
      elemento: null, 
      quantidade: 0,     
      mostrar: false,
      mostrarMensagem: false,
      mostrarOverlay: false,
      escolhidos: [],
      reservados: [],
      idSessao: "",
      indiceSessao: 0,
      dataSessao: "",
      total: 0.0,
      codigo: ''
    }
  },
  watch: {
    elemento(newElemento, oldElemento){      
      if (oldElemento == null)
      {
        this.dataSessao = newElemento.sessoes[0].data
        this.trocarMapa(newElemento.sessoes[0].id)        
      }      
    },
    quantidade(){
      this.total = this.calculaTotal()
    },
    indiceSessao(newIndiceSessao, oldIndiceSessao){
      if(newIndiceSessao != oldIndiceSessao)
        this.dataSessao = this.elemento.sessoes[newIndiceSessao].data
    }
  },
  methods: {
    ...mapActions(["adicionarCarrinho","buscarEvento"]),    
    adicionarIngressoCarrinho(){      
            
      for (let i = 0; i < this.escolhidos.length; i++)
      {
        var ing = {
          "id": i,
          "eventoId": this.elemento.id,
          "sessaoId": this.idSessao,
          "nome": this.elemento.nome,
          "codigo": this.escolhidos[i],
          "preco": this.elemento.preco
        }        
         
        this.adicionarCarrinho({ing});       
      }

      this.mostrarMensagem = true;      
      setTimeout(this.escondeMensagem, 1000);
      
    },
    carregarElemento(){
      this.elemento = this.obterEvento
      return this.elemento;
    },
    escondeMensagem(){
      this.mostrarMensagem = false;
      this.$router.push({name: 'home'});
    },
    mostrarLugares(){
      this.mostrarOverlay = false
    },
    trocarMapa(id){      
      var sessao = null
      var ind = 0

      this.mostrarOverlay = true
      for(ind = 0; ind < this.elemento.sessoes.length; ind++)
      {
        if(this.elemento.sessoes[ind].id == id)
        {
          sessao = this.elemento.sessoes[ind]
          break
        }
      }
      this.indiceSessao = ind
      this.reservados = sessao.reservados.split('|')
      this.idSessao = id
      setTimeout(this.mostrarLugares, 1000);      
    },
    calculaTotal: function(){
      if(this.elemento != null)
        return this.quantidade * this.elemento.preco;
      else
        return 0;
    },
    inserirAssento(codigo){ 
      console.log(codigo)     
      this.escolhidos.push(codigo);
      this.quantidade += 1;
      this.calculaTotal()
    },
    removerAssento(codigo){      
      this.escolhidos = this.escolhidos.filter(cod => cod != codigo); 
      this.quantidade -= 1; 
      this.calculaTotal()
    }
  },
  created() {
    let token = this.getToken;
    let id = this.$route.params.id;

    this.buscarEvento({id, token});      
    this.mostrar = true; 
  },
  computed:{
    ...mapGetters(["getToken","obterEvento","getUsuario"]),
    obterTotal: function(){
      if(this.elemento != null)
        return this.quantidade * this.elemento.preco;
      else
        return 0;
    },
    obterElemento: function(){
      return this.carregarElemento();
    }
  },
  filters: {
    formataMoeda: function (value) {
      if (!value) return '0'      
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
  }
}
</script>

<style>

#tituloDetalhe {
  margin-top: 3rem;
  color: dimgray;
}
.imagemCentro{
  margin: 0 auto;
}
.distribuicao{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;  
  margin-bottom: 4rem;
}
.espaco{
  margin-top: 4rem;
}
.espacoTitulo{
  margin-top: 2rem;
}
.compra{
  width: 40%;
  color: dimgray;  
  font-size: 1.2rem;
}
.descricao{  
  width: 40%;
  color: dimgray;  
  font-size: 1.2rem;
  text-align: justify;
}
.tamanhoQtd{
  width: 20%;
}
.botaoCompra{
  width: 70px;
}
#imgCheck{
  max-width: 10rem;
  max-height: 10rem;
}
</style>