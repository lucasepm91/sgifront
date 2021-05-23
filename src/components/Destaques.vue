<template>
<div id="sugestoes">
  <div class="linha">
            <p class="titulo">
                Sugestões de filmes
            </p>
            <div class="card">
                <figure>
                    <img src="../assets/john_wick_mod.png" alt="cartaz filme john wick 3" title="John Wick 3: Parabellum">
                    <figcaption>John Wick 3: Parabellum</figcaption>
                </figure>
            </div>
            <div class="card">
                <figure>
                    <img src="../assets/deadpool2.png" alt="cartaz filme deadpool 2" title="Deadpool 2">
                    <figcaption>Deadpool 2</figcaption>
                </figure>
            </div>
            <div class="card">
                <figure>
                    <img src="../assets/halloween_mod.png" alt="cartaz filme halloween" title="Halloween">
                    <figcaption>Halloween</figcaption>
                </figure>
            </div>            
        </div>

        <div class="linha">
            <p class="titulo">
                Sugestões de shows
            </p>
            <div class="card">
                <img src="../assets/nirvana.png" alt="cartaz nirvana" title="Nirvana">
                <figcaption>Nirvana</figcaption>
            </div>
            <div class="card">
                <img src="../assets/red-hot_chilli_peppers_mod.png" alt="cartaz Red hot Chilli Peppers" title="Red hot Chilli Peppers">
                <figcaption>Red Hot Chilli Peppers</figcaption>
            </div>
            <div class="card">
                <img src="../assets/mettalica_mod.png" alt="cartaz Metallica" title="Metallica">
                <figcaption>Metallica</figcaption>
            </div>
        </div>

        <div class="linha">
            <p class="titulo">
                Sugestões de peças
            </p>
            <div class="card">
                <img src="../assets/singing_rain.png" alt="cartaz Singing in the rain" title="Singing in the rain">
                <figcaption>Singing In The Rain</figcaption>
            </div>
            <div class="card">
                <img src="../assets/macbeth.png" alt="cartaz Macbeth" title="Macbeth">
                <figcaption>Macbeth</figcaption>
            </div>
            <div class="card">
                <img src="../assets/titanic.png" alt="cartaz titanic musical" title="Titanic musical">
                <figcaption>Titanic Musical</figcaption>
            </div>
        </div>
</div>
</template>

<script>
export default {
    name: 'Destaques'
}
</script>

<style scoped>
#sugestoes{
    margin-bottom: 10rem;
}
.titulo{
    font-family: cursive;
    font-size: 1.5em;
    margin-top: 50px;
}
.card{
    display: inline-block;
    margin-top: 30px;
    margin-left: 50px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
figcaption{    
    text-align: center;
    font-size: 1.15em;
    font-family: cursive;
    padding: 10px;
}
.linha{
    text-align: center;
}
</style>