import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    baseUrl: 'http://localhost:3000',
    products: [],
    carts: [],
    toogleStatus: false,
    histories: [],
  },
  mutations: {
    SET_TOKEN(state, payload) {
      localStorage.setItem('token', payload);
      state.token = payload;
    },
    LOGOUT(state) {
      state.token = null;
      localStorage.clear();
    },
    FETCH_PRODUCT(state, payload) {
      state.products = payload;
    },
    FETCH_CART(state, payload) {
      state.carts = payload;
    },
    FETCH_HISTORY(state, payload) {
      state.histories = payload;
    },
    TOOGLE_STATUS(state, payload) {
      state.toogleStatus = payload;
    }
  },
  actions: {
    fetchProduct(context) {
      axios({
        method: "GET",
        url: `${context.state.baseUrl}/product`,
        headers: {
          token: context.state.token
        },
      })
        .then(({ data }) => {
          context.commit('FETCH_PRODUCT', data);
        })
        .catch(({response}) => {
          console.log(response);
        })
    },
    addCart(context, payload) {
      context.commit('TOOGLE_STATUS', false);
      axios({
        method: "POST",
        url: `${context.state.baseUrl}/user/cart`,
        headers: {
          token: context.state.token,
        },
        data: payload,
      })
        .then(({ data }) => {
          context.dispatch('fetchCart');
          context.commit('TOOGLE_STATUS', 'add_cart_success');
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    fetchCart(context) {
      axios({
        method: "GET",
        url: `${context.state.baseUrl}/user/cart`,
        headers: {
          token: context.state.token,
        },
      })
        .then(({ data }) => {
          context.commit('FETCH_CART', data);
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    checkout(context, payload) {
      context.commit('TOOGLE_STATUS', false);
      axios({
        method: "POST",
        url: `${context.state.baseUrl}/user/cart/checkout`,
        headers: {
          token: context.state.token,
        },
        data: { cart_id: payload }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart');
          context.dispatch('fetchHistory');
          context.commit('TOOGLE_STATUS', 'checkout_success');
          // context.commit('FETCH_HISTORY');
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    deleteCart(context, payload) {
      context.commit('TOOGLE_STATUS', false);
      axios({
        method: "DELETE",
        url: `${context.state.baseUrl}/user/cart`,
        headers: {
          token: context.state.token,
        },
        data: { cart_id: payload }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart');
          context.dispatch('fetchHistory');
          context.commit('TOOGLE_STATUS', 'delete_cart_success');
          console.log(data);
        })
        .catch(({ response }) => {
          console.log(response.data);
        })
    },
    fetchHistory(context) {
      axios({
        method: "GET",
        url: `${context.state.baseUrl}/transaction`,
        headers: {
          token: context.state.token
        },
      })
        .then(({ data }) => {
          console.log(data);
          context.commit('FETCH_HISTORY', data);
        })
        .catch(({response}) => {
          console.log(response);
        })
    }
  },
});
