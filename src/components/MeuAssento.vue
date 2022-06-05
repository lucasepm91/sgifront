<template>
  <button class="estiloAssento" ref="elem" @click="selecionarAssento"></button>
</template>

<script>
export default {
    name: "MeuAssento",
    props: ["estado","codigo"],
    mounted() {
        if (this.estado == "livre")
            this.$refs['elem'].classList.add("livre");
        else if (this.estado == "ocupado")
        {
            this.$refs['elem'].classList.add("ocupado");
        }
    },
    data(){
        return {
            estadoAtual: this.estado
        }
    },
    methods:{
        selecionarAssento(){
            if (this.estadoAtual == "livre")
            {
                this.$refs['elem'].classList.remove("livre")
                this.$refs['elem'].classList.add("selecionado");
                this.estadoAtual = "selecionado";
                this.$parent.$emit('marcado', this.codigo)
            }
            else if (this.estadoAtual == "selecionado"){
                this.$refs['elem'].classList.remove("selecionado")
                this.$refs['elem'].classList.add("livre");
                this.estadoAtual = "livre";
                this.$parent.$emit('desmarcado', this.codigo)
            }            
        }
    }
}
</script>

<style scoped>
 .estiloAssento{       
    border: none;    
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    opacity: 80%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
 }

 .estiloAssento:hover{
     opacity: 100%;
 }

 .ocupado{
    background-color: rgb(201, 37, 37);
 }

 .livre{
    background-color: dimgray;
 }

 .selecionado{
     background-color: rgb(70, 70, 185);
 }
</style>