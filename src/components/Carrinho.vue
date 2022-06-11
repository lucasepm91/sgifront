<template>
  <div>
    <h3 class="titulo">Carrinho</h3>
    <p class="saldo" v-if="usuario">Saldo da carteira: {{saldoCarteira | formataMoeda}}</p>
    <b-container class="lista" v-if="ingressos != null && ingressos.length > 0">
      <b-list-group>
        <b-list-group-item :key="ingresso.id" v-for="ingresso in ingressos">
          <span>{{ingresso.nome}}</span><hr/>
          <span>Preço: {{ingresso.preco | formataMoeda}}</span>          
          <b-button size="sm" variant="danger" class="botaoExcluir" @click="deletar(ingresso.id)">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </b-list-group-item>
        <div class="espacoTopo">Total: {{somaTotal | formataMoeda}}</div>
        <b-button variant="primary" class="espacoTopo" @click="finalizarCompra()">
          Finalizar compra
        </b-button>
      </b-list-group>      
    </b-container>
    <div class="resgate" v-if="ingressos == null || ingressos.length < 1">
        <h5>Inserir crédito na carteira</h5>
        <b-form class="espacoTopo" id="formularioCodigoCarteira" validated>
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
    <b-modal v-model="mostrarMensagem" title="Operação realizada!" :hide-footer="true" id="mensagemSucesso">
       <b-img center :src="require('../assets/imagemSucesso.png')" fluid alt="símbolo de sucesso" title="símbolo de sucesso" id="imgCheck"></b-img>
    </b-modal>
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
      saldoCarteira: 0,
      mostrarMensagem: false
    }
  },
  methods: {
    ...mapActions(["criarCompra", "limparCarrinho", "removerIngresso", "subtrairSaldo", "adicionarSaldo"]),    
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
      
      let valorDeducao = this.calcularTotal(ingressosFormatados)
      this.criarCompra({compra, token});
      this.mostrarMensagem = true;
      this.subtrairSaldo(valorDeducao)
      this.saldoCarteira -= valorDeducao
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
      if(this.codigoSaldo.length == 5)
      {
        let token = this.getToken
        let id = this.usuario.id
        let codigo = {
          "codigo": this.codigoSaldo
        }       
         
        this.adicionarSaldo({token, id, codigo})
        this.mostrarMensagem = true

        setTimeout(this.escondeMensagem, 1000);
      }
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
    this.saldoCarteira = this.usuario.saldoCarteira
  },
  computed:{
    ...mapGetters(["obterIngressos","getUsuario","getToken"]),
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

<style scoped>
.resgate {
  margin-top: 50px;
  margin-bottom: 60px;
}

.botao {
  margin-top: 30px;
  background-color: #c6391e;
  color: whitesmoke;
  border: solid 2px;
}

.botaoExcluir{
  float: right;
}

.lista {
  margin-top: 20px;
}

.titulo {
  margin-top: 30px;
}

.saldo {
  margin-top: 30px;
  text-align: right;
}

.espacoTopo {
  margin-top: 25px;
}
</style>