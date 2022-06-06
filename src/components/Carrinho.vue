<template>
  <div>
    <h2>Carrinho</h2>
    <p v-if="usuario">Saldo da carteira: {{usuario.saldoCarteira}}</p>
    <b-container v-if="ingressos != null && ingressos.length > 0">
      <b-list-group>
        <b-list-group-item :key="ingresso.id" v-for="ingresso in ingressos">
          <span>{{ingresso.nome}}</span>
          <span>Preço: {{ingresso.preco}}</span>          
          <b-button size="sm" variant="danger" class="botaoExcluir" @click="deletar(ingresso.id)">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </b-list-group-item>
        <div>Total: {{somaTotal | formataMoeda}}</div>
        <b-button variant="primary" class="botaoExcluir" @click="finalizarCompra()">
            Finalizar compra
        </b-button>
      </b-list-group>
        <b-button variant="danger" class="botaoExcluir" @click="zerarCarrinho()">
            Limpar carrinho <b-icon icon="trash"></b-icon>
        </b-button>
    </b-container>
    <div>
        <h4>Inserir crédito na carteira</h4>
        <b-form id="formularioCodigoCarteira" validated>
            <b-form-group id="input-group-codigo-carteira" label="Resgatar código para adionar fundos:" label-for="input-codigo-carteira">
                <b-form-input
                id="input-codigo-carteira"
                v-model="codigoSaldo"
                required
                placeholder="Informe o código"
                ></b-form-input>
            </b-form-group>
        </b-form>
        <b-button variant="primary" @click="inserirCredito()">
            Resgatar
        </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
name: 'Carrinho',
  data() {
    return {      
      usuario: null,
      ingressos: [],
      codigoSaldo: '',
      mostrarMensagem: false
    }
  },
  methods: {
    ...mapActions(["criarCompra", "limparCarrinho", "removerIngresso"]),    
    finalizarCompra(){
      let token = this.getToken;
      let carteiraVirtual = "CarteiraVirtual";
      let hoje = new Date();
      var dd = String(hoje.getDate()).padStart(2, '0');
      var mm = String(hoje.getMonth() + 1).padStart(2, '0');
      var yyyy = hoje.getFullYear();
      hoje = dd + '/' + mm + '/' + yyyy;
      var ingressosFormatados = []

        for (var i = 0; i< this.ingressos.length; i++)
        {
            var ingresso = {
                "id": null,
                "eventoId": this.ingressos[i].eventoId,
                "sessaoId": this.ingressos[i].sessaoId,
                "compraId": null,
                "codigo": this.ingressos[i].codigo,
                "preco": this.ingressos[i].preco
            }
            ingressosFormatados.push(ingresso)
        }
      let compra = {
        "id": null,
        "usuarioId": this.usuario.id,
        "data": hoje,
        "formaPagamento": carteiraVirtual,
        "total": this.calcularTotal(ingressosFormatados),
        "ingressos": ingressosFormatados        
      };      
      
      this.criarCompra({compra, token});
      this.mostrarMensagem = true;
      this.limparCarrinho()
      
      setTimeout(this.escondeMensagem, 1000);
      
    },
    zerarCarrinho(){
        this.ingressos = []
        this.limparCarrinho()
    },
    deletar(id){
        this.ingressos = this.ingressos.filter(c => c.id != id);
        this.removerIngresso({id})
    },
    inserirCredito(){
        /* Criar action para chamar o endpoint */
    },
    escondeMensagem(){
      this.mostrarMensagem = false;
      this.$router.push({name: 'home'});
    },
    calcularTotal(ingressos){
        var total = 0.0;
        for (var i = 0; i < ingressos.length; i++)
            total += ingressos[i].preco;

        return total;
    }
  },
  created() {    
    this.ingressos = this.obterIngressos
    this.usuario = this.getUsuario
  },
  computed:{
    ...mapGetters(["obterIngressos","getUsuario"]),
    somaTotal: function(){
      return this.calcularTotal(this.ingressos)
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

</style>