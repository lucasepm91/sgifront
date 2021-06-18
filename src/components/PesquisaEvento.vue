<template>
  <div>
    <div id="divTituloPesquisaEvento">
      <p id="infoPesquisaEvento">
        Pesquise aqui o evento desejado
      </p>
    </div>
    <div id="barra-pesquisa">
      <b-input-group size="lg">
        <b-form-input
          type="text"
          placeholder="Insira o nome do evento..."   
          v-model="inputPesquisa"       
        ></b-form-input>
        <b-input-group-append>
          <b-button id="btn-pesquisar" @click="pesquisar">
            <b-icon icon="check2" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <b-container v-if='mostrarSugestoes'>
      <h5 class="tituloSecao">Sugestões</h5>

      <b-row v-show="elementos.length > 0" class="cards">
        <b-card
          :key="elemento.id"          
          v-for="elemento in obterElementos"
          :title="elemento.nome"
          :img-src="require('../assets/indisponivel.png')"
          :img-alt="elemento.descricao"
          :id="elemento.id"
          img-top
          tag="article"
          style="max-width: 18rem"
          class="mb-3 text-center"
          @click="detalharElemento(elemento.id)"
        >
          <b-card-text> Preço: {{ elemento.preco | formataMoeda }} </b-card-text>
          
        </b-card>
      </b-row>
    </b-container>

    <b-container v-if='mostrarResultado'>
      <h5 class="tituloSecao">Resultado da pesquisa</h5>

      <b-row class="cards">
        <b-card
          :key="resultado.id"
          v-for="resultado in resultadosFiltrados"
          :title="resultado.nome"
          :img-src="require('../assets/indisponivel.png')"
          :img-alt="resultado.descricao"
          :id="resultado.id"
          img-top
          tag="article"
          style="max-width: 18rem"
          class="mb-3 text-center"
          @click="detalharElemento(resultado.id)"
        >
          <b-card-text> Preço: {{ resultado.preco | formataMoeda }} </b-card-text>
          
        </b-card>
      </b-row>
    </b-container>

    <b-container class="erroPesquisa" v-if='mostrarVazio'>
      <b-alert show variant="danger">Não foram encontrados resultados com os parâmetros informados</b-alert>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'PesquisaEvento',
  data() {
    return {
      elementos: [],
      inputPesquisa: '',
      mostrarSugestoes: true,
      mostrarResultado: false,
      mostrarVazio: false
    };
  },
  created() {
    let token = this.getToken;    

    if(this.$route.name === "shows")
    {
      this.buscarShows(token);
    }
    else if(this.$route.name === "filmes")
    {      
      this.buscarFilmes(token);
    }
    else{
      this.buscarPecasTeatro(token);
    }
  },
  methods: {
    ...mapActions(["buscarShows", "buscarFilmes", "buscarPecasTeatro"]), 
    detalharElemento(idClick) {
      this.$router.push({
        name: this.$route.name + "-detalhe",
        params: { id: idClick },
      });
    },
    pesquisar() {
      let filtrados = this.elementos.filter((elemento) => {
        return (
          elemento.nome
            .toLowerCase()
            .indexOf(this.inputPesquisa.toLowerCase()) > -1
        );
      });

      if (filtrados != null && filtrados.length > 0) {
        this.mostrarSugestoes = false;
        this.mostrarResultado = true;
        this.mostrarVazio = false;
      } else {
        this.mostrarSugestoes = false;
        this.mostrarResultado = false;
        this.mostrarVazio = true;
      }

      return filtrados;
    },
    carregarElementos() {
      if(this.$route.name === "shows")
      {
        this.elementos = this.todosShows;        
      }
      else if(this.$route.name === "filmes")
      {        
        this.elementos = this.todosFilmes;        
      }
      else{
        this.elementos = this.todosPecas;
      }
      return this.elementos;
    }
  },
  computed: {
    ...mapGetters(["todosShows", "todosFilmes", "todosPecas","getToken"]),
    resultadosFiltrados: function(){
      return this.pesquisar();
    },
    obterElementos: function(){
      return this.carregarElementos();
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

#btn-pesquisar {
  background-color: #c6391e;
  color: whitesmoke;
}
#barra-pesquisa {
  margin-top: 50px;
  margin-bottom: 50px;
}
#divTituloPesquisaEvento {
  margin-top: 50px;
  text-align: center;
}
#divTituloPesquisaEvento p {
  color: dimgray;
  font-size: 1.5em;
  font-style: italic;
}
.erroPesquisa{
  margin-top: 3rem;
}
.tituloSecao{
  margin-bottom: 30px;
  font-style: italic;
  color: dimgray;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>