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

      <b-form-group id="input-group-preco-cadastroevento" label="Preço:" label-for="input-preco-cadastroevento">
        <b-form-input
          id="input-preco-cadastroevento"
          v-model="form.preco"
          type="number" step="0.01" min="0"
          required
          placeholder="Informe o preço do ingresso"
        ></b-form-input>
      </b-form-group>      

      <b-form-group id="input-group-sessoes-cadastroevento" label="Sessões:" label-for="input-sessoes-cadastroevento">
        <b-form-input
          id="input-sessoes-cadastroevento"
          v-model="form.sessoes"
          required
          placeholder="2022-01-01 00:00:00|Sala 01;2022-01-02 00:00:00|Sala 02;..."
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

      <b-form-group id="input-group-pais-cadastroevento" label="País:" label-for="input-pais-cadastroevento">
        <b-form-input
          id="input-pais-cadastroevento"
          v-model="form.pais"
          placeholder="Informe o país"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-estado-cadastroevento" label="Estado:" label-for="input-estado-cadastroevento">
        <b-form-input
          id="input-estado-cadastroevento"
          v-model="form.estado"
          placeholder="Informe o estado"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-cidade-cadastroevento" label="Cidade:" label-for="input-cidade-cadastroevento">
        <b-form-input
          id="input-cidade-cadastroevento"
          v-model="form.cidade"
          placeholder="Informe a cidade"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-bairro-cadastroevento" label="Bairro:" label-for="input-bairro-cadastroevento">
        <b-form-input
          id="input-bairro-cadastroevento"
          v-model="form.bairro"
          placeholder="Informe o bairro"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-endereco-cadastroevento" label="Endereço:" label-for="input-endereco-cadastroevento">
        <b-form-input
          id="input-endereco-cadastroevento"
          v-model="form.endereco"
          placeholder="Informe o endereço"
        ></b-form-input>
      </b-form-group> 

      <b-form-group id="input-group-complemento-cadastroevento" label="Complemento:" label-for="input-complemento-cadastroevento">
        <b-form-input
          id="input-complemento-cadastroevento"
          v-model="form.complemento"
          placeholder="Informe o complemento"
        ></b-form-input>
      </b-form-group>      

      <b-form-group id="input-group-linkStream-cadastroevento" label="Link da stream:" label-for="input-linkStream-cadastroevento">
        <b-form-input
          id="input-linkStream-cadastroevento"
          v-model="form.linkStream"
          placeholder="Informe o link da stream"
        ></b-form-input>
      </b-form-group>   

      <b-form-group id="input-group-linkRedirecionamento-cadastroevento" label="Redirecionar para:" label-for="input-linkRedirecionamento-cadastroevento">
        <b-form-input
          id="input-linkRedirecionamento-cadastroevento"
          v-model="form.linkRedirecionamento"
          placeholder="Informe o endereço do redirecionamento para outro site"
        ></b-form-input>
      </b-form-group>  

      <b-form-group id="input-group-descricao-cadastroevento" label="Descrição do evento:" label-for="textarea-cadastroevento">
        <b-form-textarea id="textarea-cadastroevento" v-model="form.descricao" rows="3" required>
        </b-form-textarea>
      </b-form-group>  

      <b-form-group id="input-group-modalidade-cadastroevento" label="Modalidade:" label-for="input-modalidade-cadastroevento">
        <b-form-select v-model="modalidade" class="mb-3" id="input-modalidade-cadastroevento">        
          <b-form-select-option value="presencial">Presencial</b-form-select-option>
          <b-form-select-option value="online">Online</b-form-select-option>        
        </b-form-select>
      </b-form-group>

      <b-form-group label="Escolha a modalidade do evento" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-modalidade-cadastroevento"
        v-model="form.modalidade"
        :aria-describedby="ariaDescribedby"
        name="radio-sub-component-modalidade-cadastroevento"
      >
        <b-form-radio size="lg" value="presencial">Presencial</b-form-radio>
        <b-form-radio size="lg" value="online">Online</b-form-radio>
      </b-form-radio-group>
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
          dia: '',
          horario: '',
          descricao: '',
          selected: 'filme',
          modalidade: 'presencial',
          pais: '',
          estado: '',
          cidade: '',
          bairro: '',
          endereco: '',
          complemento: '',
          linkStream: '',
          linkRedirecionamento: '',
          sessoes: ''
        },
        mostrarMensagem: false
      }
  },
  methods: {
    ...mapActions(["criarEvento"]),
    cadastrarEvento() {   
      let token = this.getToken;
      let usuario = this.getUsuario;      
      var infoSessoes = this.form.sessoes.split(';')
      let listaIndices = ["A","B","C","D","E","F"]
      var esquema = ""
      var sessoes = []

      for(let i = 0; i < 6; i++)
      {        
        for(let j = 1; j < 13; j++)
        {
          let cod = ""
          if (j < 10)
            cod = listaIndices[i] + "0" + j          
          else
            cod = listaIndices[i] + j
          
          if (i == 0 && j == 1)
            esquema += cod
          else
            esquema = esquema + "|" + cod
        }
      }

      for (var i = 0; i < infoSessoes.length; i++)
      {
        var info = infoSessoes[i].split('|');
        var sessao = {
          "id": null,
          "eventoId": null,
          "data": info[0],
          "lotacao": this.form.lotacao,
          "ingressosVendidos": 0,
          "codigoLocal": info[1],          
          "esquema": esquema,
          "reservados": '',
          "livres": esquema
        } 
        sessoes.push(sessao)
      }
      
      let evento = {
        "id": null,
        "organizadorId": usuario.id,
        "nome": this.form.nome,
        "tipo": this.form.selected,
        "modalidade": this.form.modalidade, 
        "descricao": this.form.descricao, 
        "linkStream": this.form.linkStream,
        "linkRedirecionamento": this.form.linkRedirecionamento,
        "preco": this.form.preco,
        "pais": this.form.pais,
        "estado": this.form.estado,
        "cidade": this.form.cidade,
        "bairro": this.form.bairro,
        "enderecoCompleto": this.form.endereco,
        "complemento": this.form.complemento,
        "organizador": null,
        "sessoes": sessoes
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