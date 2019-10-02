<template>
  <div id="container" class="d-flex flex-column align-center">
    <div id="box-detail">
      <router-view></router-view>
    </div>
    <div class="px-12 mt-3" id="box-table">
      <v-simple-table fixed-header>
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Date</th>
            <th class="text-center">Total payment</th>
            <th class="text-center">Status</th>
            <th class="text-center">Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr class="cart" v-for="cart in carts" :key="cart._id" router :to="'/profile/9123696asd'">
            <td class="text-center">{{ cart.product.name }}</td>
            <td class="text-center"> Checkout first </td>
            <td class="text-center">{{ cart.total_payment }}</td>
            <td class="text-center">In Cart</td>
            <td width="150px" class="text-center">
              <v-btn router :to="`/profile/${cart._id}`" depressed color="primary">Details</v-btn>
            </td>
          </tr>
          <tr class="transaction" v-for="history in histories" :key="history._id" router :to="'/profile/9123696asd'">
            <td class="text-center px-0">{{ history.product_id.name }}</td>
            <td class="text-center px-0">{{ Date(history.createdAt).substr(0, 15) }}</td>
            <td class="text-center px-0">{{ history.total_payment }}</td>
            <td class="text-center px-0">Paid</td>
            <td width="150px" class="text-center">
              <v-btn router :to="`/profile/${history._id}`" depressed color="primary">Details</v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['token', 'toogleStatus', 'carts', 'histories']),
  created() {
    if (!this.token) {
      this.$router.push('/login');
    } else {
      this.$store.dispatch('fetchCart');
      this.$store.dispatch('fetchHistory');
    }
  },
  watch: {
    token() {
      if (!this.token) {
        this.$router.push('/')
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
}
</script>

<style scoped>
  #container {
    /* background-color: black; */
    width: 100%;
    height: 100%;
  }
  #box-detail {
    min-height: 30%;
    width: 100%;
    background-color: white;
    padding: 20px 300px;
  }
  #box-table {
    width: 80%;
  }
  .transaction {
    background-color: rgba(43, 209, 71, 0.267);
  }
  .cart {
    background-color: rgba(230, 230, 230, 0.39);
  }
  .transaction:hover {
    background-color: rgba(43, 209, 71, 0.432) !important;
  }
</style>