<template>
  <h2>Detalhe</h2>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'Detalhe',
  data() {
    return {
      id: this.$route.params.id,
      evento: this.$route.params.evento,
      compra: this.$route.params.compra
    }
  },
  methods: {
    ...mapActions(["criarCompra"]),    
    finalizarCompra(){
        this.criarCompra(this.compra);
        this.$router.push({name: 'historico'})
    }
  }
}
</script>

<style>

</style>