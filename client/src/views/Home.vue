<template>
  <div id="home">
    <v-carousel
    cycle delimiter-icon="mdi-minus"
    hide-delimiter-background height="400"
    interval="5000" show-arrows-on-hover>
      <v-carousel-item v-for="(carouselItem, i) in carouselItems" :key="i"
      :src="carouselItem" transition="fade-transition">
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <!-- <v-layout row> -->
        <!-- <v-flex v-for="product in products" :key="product._id" class="justify-center"> -->
          <v-row>
            <v-col lg="4" md="6" sm="12" v-for="product in products" :key="product._id">
              <Card :product="product" class="ma-7"></Card>
            </v-col>
          </v-row>
        <!-- </v-flex> -->
      <!-- </v-layout> -->
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  computed: mapState(['token', 'products', 'toogleStatus']),
  components: {
    Card,
  },
  data: () => ({
    carouselItems: [
      'https://dwblog-ecdf.kxcdn.com/wp-content/uploads/2018/11/dewaweb-blog-perbedaan-onlineshop-marketplace-ecommerce.png',
      'https://4.imimg.com/data4/DT/GU/MY-24367186/ecommerce-shopping-portal-services-500x500.jpg',
      'https://image-english.vov.vn/w490/uploaded/vn1pm7jlycly8uzveukg/2017_09_30/ecommerce219100830AM_JHDP.jpg'
    ]
  }),
  created() {
    if (!this.token) {
      this.$router.push('/login');
    } else {
      this.$store.dispatch('fetchProduct');
      this.$store.dispatch('fetchCart');
    }
  },
  watch: {
    token() {
      if (!this.token || this.token === 'null') {
        this.$router.push('/login');
      }
    },
    toogleStatus() {
        switch (this.toogleStatus) {
          case 'add_cart_success':
            this.$swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'success',
              title: 'Added to your cart :)'
            })
            break;
          case 'checkout_success':
            this.$swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'success',
              title: 'Checkout success :)'
            })
            break;
          case 'delete_cart_success':
            console.log('jalan');
            this.$swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'success',
              title: 'Cart deleted :)'
            })
            break;
          default:
            break;
        }
    },
  }
};
</script>

<style scoped>
</style>
