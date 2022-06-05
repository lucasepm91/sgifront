<template>
    <div>
        <div class="tela"></div>
        <div v-for="linha in esquema" :key="linha.indice">
            <meu-assento v-for="assento in linha.assentos" :key="assento.codigo" :estado="assento.estado" :codigo="assento.codigo" v-on="$listeners"></meu-assento>
            <br>            
        </div>        
    </div>
</template>

<script>
import MeuAssento from './MeuAssento.vue'

export default {
    components: { MeuAssento },
    props: ["reservados"],  
    name: "EscolhaAssento",
    data() {
        return {
            esquema: [],
            listaIndices: ["A","B","C","D","E","F"]
        }
    },
    created(){
        this.inicializarMapa()
    },
    methods:{
        inicializarMapa(){ 
            this.esquema = []           
            for(let i = 0; i < 6; i++)
            {
                let row = []
                for(let j = 1; j < 13; j++)
                {
                    let cod = ""
                    if (j < 10)
                        cod = this.listaIndices[i] + "0" + j
                    else
                        cod = this.listaIndices[i] + j
                    
                    let situacao = this.reservados.find(item => item == cod) == null ? "livre" : "ocupado"
                    row.push({
                        codigo: cod,
                        estado: situacao
                    })
                }

                this.esquema.push({
                    indice: this.listaIndices[i],
                    assentos: row
                })
            }
        }
    }
}
</script>

<style scoped>
    .tela{
        width: 225px;
        height: 10px;
        background-color: black;
        color: whitesmoke;        
        margin-bottom: 15px;
        padding: 5px 5px;  
    }
</style>