<template>
  <div>
    <v-card class="d-flex justify-space-around align-center pl-5">
      <!-- <v-img
        height="100"
        width="100"
        :src="img_product"
        alt="img-product"
      ></v-img> -->
      <div style="height: 100px; width: 150px; overflow: hidden;">
        <img :src="img_product" alt="img-product" style="height: 100%;">
      </div>
      <v-card-text class="px-5">
        Name: {{ nameProduct }} <br>
        Price: {{ price }} <br>
        Count: {{ count }} <br>
        Total Payment: {{ total_payment }} <br>
        Status: {{ status }} <br>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Detail',
  computed: mapState(['histories', 'carts']),
  data: () => ({
    nameProduct: '',
    price: '',
    count: '',
    total_payment: '',
    status: '',
    img_product: '',
  }),
  mounted() {
    this.populateData();
  },
  methods: {
    populateData() {
      /* eslint no-underscore-dangle: 0 */
      const result = this.carts.concat(this.histories)
        .filter(el => el._id === this.$route.params.id);
      const identifier = result[0].product_id ? 'history' : 'cart';
      this.nameProduct = identifier === 'cart' ? result[0].product.name : result[0].product_id.name;
      this.price = identifier === 'cart' ? result[0].product.price : result[0].product_id.price;
      this.count = result[0].count;
      this.total_payment = result[0].total_payment;
      this.status = identifier === 'cart' ? 'In cart' : 'Paid';
      this.img_product = identifier === 'cart' ? result[0].product.img_url : result[0].product_id.img_url;
    },
  },
  watch: {
    $route() {
      this.populateData();
    },
  },
};
</script>

<style>

</style>
