import Vue from 'vue';
import VueRouter from 'vue-router';
import Destaques from './components/Destaques.vue'
import Contato from './components/Contato.vue'
import Sobre from './components/Sobre.vue'
import Login from './components/Login.vue'
import PesquisaEvento from './components/PesquisaEvento.vue'
import Detalhe from './components/Detalhe.vue'
import SignUp from './components/SignUp.vue'
import CadastroEvento from './components/CadastroEvento.vue'
import HistoricoEventos from './components/HistoricoEventos.vue'
import HistoricoCompras from './components/HistoricoCompras.vue'
import Carrinho from './components/Carrinho.vue'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Destaques
        },
        {
            path: '/contato',
            name: 'contato',
            component: Contato
        },
        {
            path: '/sobre',
            name: 'sobre',
            component: Sobre
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: SignUp
        },
        {
            path: '/shows',
            name: 'shows',
            component: PesquisaEvento
        },
        {
            path: '/shows/:id',
            name: 'shows-detalhe',
            component: Detalhe
        },
        {
            path: '/filmes',
            name: 'filmes',
            component: PesquisaEvento
        },
        {
            path: '/filmes/:id',
            name: 'filmes-detalhe',
            component: Detalhe
        },
        {
            path: '/pecas-teatro',
            name: 'pecas-teatro',
            component: PesquisaEvento
        },
        {
            path: '/pecas-teatro/:id',
            name: 'pecas-teatro-detalhe',
            component: Detalhe
        },
        {
            path: '/cadastro-evento',
            name: 'cadastro-evento',
            component: CadastroEvento
        },
        {
            path: '/historico-compras',
            name: 'historico-compras',
            component: HistoricoCompras
        },
        {
            path: '/historico-eventos',
            name: 'historico-eventos',
            component: HistoricoEventos
        },
        {
            path: '/carrinho',
            name: 'carrinho',
            component: Carrinho
        }
    ]
});