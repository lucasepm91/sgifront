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
        <p>Preço: R${{ elemento.preco}}</p>
      </b-container>
      <b-container class="compra">
        <p>Adquira aqui seus ingressos!</p>
        <span>Quantidade: </span><b-form-input v-model="quantidade" class="tamanhoQtd" id="quantidade" type="number" min="0" max="10"></b-form-input>
        <br/>
        <p>Total: R${{obterTotal}}</p>
        <b-button class="botaoCompra" variant="primary" @click="finalizarCompra">Ok</b-button>
      </b-container>
    </b-row>
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
      mostrar: false
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

      console.log("Nome do cliente = "+cliente.nome);
      console.log("Id do cliente = "+cliente.id);

      let compra = {
        "evento": this.elemento,
        "qtdIngressos": this.quantidade,
        "cliente": cliente,
        "data": hoje,
        "total": this.obterTotal,
        "metodoPagamento": saldoCarteira
      };
      
      this.criarCompra({compra, token});
      this.$router.push({name: 'home'})
    },
    carregarElemento(){
      this.elemento = this.obterEvento;
      return this.elemento;
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

</style>