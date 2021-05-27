<template>
<div>
  <div id="divTituloSobre">
      <p>Sobre</p>      
  </div>

  <div id="descricaoSobre">
    <p>A SGI tem como missão facilitar a compra de ingressos para eventos, reunindos os melhores espetáculos para a sua diversão</p>
  </div>

  <div id="imagemSobre">
    <b-img :src="require('../assets/concerto.png')"  fluid alt="imagem de um show"></b-img>
  </div>
</div>
</template>

<script>
export default {
    name: 'Sobre'
}
</script>

<style scoped>
#divTituloSobre{
    margin-top: 50px;
    text-align: center;
}
#divTituloSobre p{
    color: dimgray;
    font-size: 1.5em;
    font-style: italic;
}
#descricaoSobre{
    margin-top: 50px;
    text-align: center;
    margin-bottom: 30px;
}
#descricaoSobre p{
    color: dimgray;
    font-size: 1.5em;
    font-style: italic;
}
#imagemSobre{
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
}
</style>