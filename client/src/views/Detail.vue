<template>
  <div>
    <v-card class="d-flex justify-space-around align-center pl-5">
      <v-img
        height="100"
        width="100"
        :src="img_product"
      ></v-img>
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
  watch: {
    '$route.params.id': function () {
      // this.nameProduct = 
      let theHistory = this.histories.filter(el => el._id === this.$route.params.id)
      let theCart = this.carts.filter(el => el._id === this.$route.params.id)
      let result = theHistory.concat(theCart)
      
      this.nameProduct = theHistory.length === 0 ? result[0].product.name : result[0].product_id.name;
      this.price = theHistory.length === 0 ? result[0].product.price : result[0].product_id.price;
      this.count = result[0].count;
      this.total_payment = result[0].total_payment;
      this.status = theHistory.length === 0 ? 'In cart' : 'Paid';
      this.img_product = theHistory.length === 0 ? result[0].product.img_url : result[0].product_id.img_url;
      console.log(result);
    }
  },
}
</script>

<style>

</style>