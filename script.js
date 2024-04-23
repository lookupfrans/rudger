const products = [
  { id: 1, title: '01 - STARCROOS', price: 500000, qty: 1, image: 'bg9.jpg' },
  { id: 2, title: '02 - STARCROOS', price: 500000, qty: 1, image: 'bg11.jpg' },
  { id: 3, title: '03 - STARCROOS', price: 300000, qty: 1, image: 'pic16.jpg' },
  { id: 4, title: '04 - STARCROOS', price: 300000, qty: 1, image: 'pic18.jpg' },
  { id: 5, title: '05 - VICIOUS CIRCLE - GILDAN', price: 200000, qty: 1, image: 'bg4.jpg' },
  { id: 6, title: '06 - OBSESSED - GILDAN', price: 200000, qty: 1, image: 'bg5.jpg' },
  { id: 7, title: '07 - CROZZED', price: 250000, qty: 1, image: 'img1.jpg' },
  { id: 8, title: '08 - The OPPRESSED HOODIE', price: 648000, qty: 1, image: 'img2.jpg' },
  { id: 9, title: '09 - WARZONE HOODIE', price: 732000, qty: 1, image: 'img3.jpg' },
  { id: 10, title: '010 - ALKALINE TRIO', price: 200000, qty: 1, image: 'img4.jpg' }
];

function formatNumber(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d === undefined ? '.' : d,
    t = t === undefined ? ',' : t,
    s = n < 0 ? '-' : '',
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

Vue.filter('formatCurrency', function (value) {
  return formatNumber(value, 2, '.', ',');
});

Vue.component('shopping-cart', {
  props: ['items'],

  computed: {
    Total: function () {
      var total = 0;
      this.items.forEach(item => {
        total += (item.price * item.qty);
      });
      return total;
    }
  },

 
});

const vm = new Vue({
  el: '#app',

  data: {
    cartItems: [],
    items: products
  },

  methods: {
    checkout: function (event) {
      console.log("Checkout");
      initCheckout();
    },
    addToCart(itemToAdd) {
      var found = false;

      this.cartItems.forEach(item => {
        if (item.id === itemToAdd.id) {
          found = true;
          item.qty += itemToAdd.qty;
        }
      });

      if (found === false) {
        this.cartItems.push(Vue.util.extend({}, itemToAdd));
      }

      itemToAdd.qty = 0;
    }
  }
});


