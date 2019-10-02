<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="344">
        <v-img :src="product.img_url" height="200px"></v-img>
        <v-card-title>
          <h3>
            {{ product.name }}
          </h3>
          <v-spacer></v-spacer>
          <span class="grey--text subtitle-1">
            {{ product.seller }}
          </span>
        </v-card-title>

        <v-card-text class="grey--text subtitle-1">
          {{ product.price }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="grey--text subtitle-1">
          {{ product.description }}
        </v-card-text>

        <!-- <v-card-title>
          <v-rating :value="4"
          dense color="orange"
          background-color="orange"
          hover class="mr-2"></v-rating>
          <span class="primary--text subtitle-2">
            64 Reviews
          </span>
        </v-card-title> -->
        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="black">
            <v-btn color="primary" depressed @click.stop="dialog = true" >
              <v-icon left>add_shopping_cart</v-icon>
              Add to cart
            </v-btn>
          </v-overlay>
        </v-fade-transition>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">
              Count you want?
            </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="3" class="px-0">
                    <v-btn depressed @click="min">
                      <v-icon>remove</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col offset="1" cols="4" class="d-flex justify-center align-center">
                    {{ count }}
                  </v-col>
                  <v-col offset="1" cols="3" class="px-0">
                    <v-btn depressed @click="plus">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>

              <v-btn text @click="addCart">
                Add Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: ['product'],
  data: () => ({
    dialog: false,
    count: 1,
    product_id: '',
  }),
  methods: {
    min() {
      if (this.count > 1) {
        this.count--;
      }
    },
    plus() {
      this.count++;
    },
    addCart() {
      this.dialog = false;
      const obj = {
        product_id: this.product._id,
        count: this.count,
      };
      this.count = 1;
      this.$store.dispatch('addCart', obj);
    }
  },
  watch: {
    
  }
};
</script>

<style>
  #inputCenter input {
    text-align: center;
  }
</style>
