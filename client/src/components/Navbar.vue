<template>
  <nav>
    <v-toolbar dense color="transparent" flat class="pl-12">
      <v-app-bar-nav-icon v-if="token" @click="leftMenuDrawer = !leftMenuDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title id="title">
        <span class="font-weight-bold">E</span>
        <span class="font-weight-bold mx-1">-</span>
        <span class="font-weight-medium">Commerce</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed class="mx-5" @click="cartDrawer = !cartDrawer" v-if="token">
        <v-badge>
          <template v-slot:badge>{{ carts.length }}</template>
          <v-icon>add_shopping_cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn depressed color="error" @click="logout" v-if="token">
        <span>Log Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="leftMenuDrawer" temporary absolute>
      <v-list shaped>
        <v-list-item>
          <h1>Menu</h1>
          <!-- <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Doe</v-list-item-title>
          </v-list-item-content> -->
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group color="primary">
          <v-list-item v-for="menu in leftMenu" :key="menu.text" router :to="menu.route">
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="menu.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="cartDrawer" temporary absolute right width="350">
      <v-card v-for="cart in carts" :key="cart._id">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="12" class="pa-0 pl-3">Name : {{ cart.product.name }}</v-col>
                <v-col cols="12" class="pa-0 pl-3">Count : {{ cart.count }}</v-col>
                <v-col cols="12" class="pa-0 pl-3">Total payment : {{ cart.total_payment }}</v-col>
              </v-row>
            </v-col>
            <v-col offset="1" cols="5" class="d-flex align-center">
              <v-img :src="cart.product.img_url" height="100px"></v-img>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" depressed @click="checkout(cart)">
            <v-icon left>add_shopping_cart</v-icon>
            checkout
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" outlined @click="deleteCart(cart)">
            <v-icon left>delete</v-icon>
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['token', 'carts']),
  data: () => ({
    leftMenu: [
      {
        route: '/',
        icon: 'home',
        text: 'Home'
      },
      {
        route: '/profile',
        icon: 'person',
        text: 'Your Profile'
      },
    ],
    leftMenuDrawer: false,
    cartDrawer: false,
    dialog: false,
  }),
  methods: {
    logout() {
      this.$swal.fire({
        title: 'Log out? :(',
        showCancelButton: true,
        confirmButtonText: 'Sure',
        cancelButtonText: 'No',
        cancelButtonColor: '#E53935',
        confirmButtonColor: '#28A745',
        reverseButtons: true
      })
        .then(result => {
          if (result.value) {
            this.$store.commit('LOGOUT');
          }
        })
    },
    checkout(cart) {
      this.$swal.fire({
        title: 'Checkout this item?',
        html: `<table width="60%" style="margin-left: 20%;">
          <tr>
            <td style="text-align: left;">Name :  </td>
            <td style="text-align: left;">${cart.product.name}</td>
          </tr>
          <tr>
            <td style="text-align: left;">Total item :  </td>
            <td style="text-align: left;">${cart.count}</td>
          </tr>
          <tr>
            <td style="text-align: left;">Total payment :  </td>
            <td style="text-align: left;">${cart.total_payment}</td>
          </tr>
        </table>`,
        showCancelButton: true,
        confirmButtonText: 'Checkout',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#E53935',
        confirmButtonColor: '#28A745',
        reverseButtons: true
      })
        .then(result => {
          if (result.value) {
            this.$store.dispatch('checkout', cart._id);
          }
        })
    },
    deleteCart(cart) {
      this.$swal.fire({
        title: 'Delete this cart?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#E53935',
        confirmButtonColor: '#28A745',
        reverseButtons: true
      })
        .then(result => {
          if (result.value) {
            this.$store.dispatch('deleteCart', cart._id);
          }
        })
    },
  }
};
</script>
<style scoped>
  #title {
    letter-spacing: 1px;
  }
</style>
