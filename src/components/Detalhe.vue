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
        <p>Endereço: {{ elemento.endereco}}</p>
        <p>Data: {{ elemento.data}}</p>
        <p>Organizador: {{ elemento.organizador.nome}}</p>
        <p>Email para contato: {{ elemento.organizador.email}}</p>
        <p>Preço: {{ elemento.preco | formataMoeda}}</p>
      </b-container>
      <b-container class="compra">
        <p>Adquira aqui seus ingressos!</p>
        <span>Quantidade: </span><b-form-input v-model="quantidade" class="tamanhoQtd" id="quantidade" type="number" min="0" max="10"></b-form-input>
        <br/>
        <p>Total: R${{obterTotal}}</p>
        <b-button class="botaoCompra" variant="primary" @click="finalizarCompra">Ok</b-button>
      </b-container>
    </b-row>

    <b-modal v-model="mostrarMensagem" title="Compra realizada!" :hide-footer="true" id="mensagemSucesso">
       <b-img center :src="require('../assets/imagemSucesso.png')" fluid alt="símbolo de sucesso" title="símbolo de sucesso" id="imgCheck"></b-img>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'Detalhe',
  data() {
    return {
      id: this.$route.params.id,
      elemento: null,
      quantidade: 0,
      mostrar: false,
      mostrarMensagem: false
    }
  },
  methods: {
    ...mapActions(["criarCompra","buscarEvento"]),    
    finalizarCompra(){
      let token = this.getToken;
      let saldoCarteira = "saldoCarteira";
      let hoje = new Date();
      var dd = String(hoje.getDate()).padStart(2, '0');
      var mm = String(hoje.getMonth() + 1).padStart(2, '0');
      var yyyy = hoje.getFullYear();
      hoje = dd + '/' + mm + '/' + yyyy;
      let cliente = this.getUsuario;      

      let compra = {
        "evento": this.elemento,
        "qtdIngressos": this.quantidade,
        "cliente": cliente,
        "data": hoje,
        "total": this.obterTotal,
        "metodoPagamento": saldoCarteira
      };
      
      this.criarCompra({compra, token});
      this.mostrarMensagem = true;
      
      setTimeout(this.escondeMensagem, 1000);
      
    },
    carregarElemento(){
      this.elemento = this.obterEvento;
      return this.elemento;
    },
    escondeMensagem(){
      this.mostrarMensagem = false;
      this.$router.push({name: 'home'});
    }
  },
  created() {
    let token = this.getToken;
    let id = this.$route.params.id;

    this.buscarEvento({id, token});      
    this.mostrar = true;    
  },
  computed:{
    ...mapGetters(["obterEvento","getToken","getUsuario"]),
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
      if (!value) return ''      
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