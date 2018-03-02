var app = new Vue ({
    el: '#app',
    data: {
        PokemonName: '',
        cards: {},
        loading: false,
        //setCode: '',
        //number: '',
    },
    methods: {
        findCard: function() {
            if(this.PokemonName) {
                this.loading = true;
                fetch('https://api.pokemontcg.io/v1/cards?name=' + this.PokemonName).then(response => {
                    return response.json();
                }).then(json => {
                    this.loading = false;
                    this.cards = json;
                    //this.cards.number = json.number;
                    //this.cards.setCode = json.setCode;
                    console.log(this.cards);
                }).catch(err=> {

                });
                console.log("fetching");
            }
            else {
                alert('No results found! Try something like \"Mew\", or \"Charizard\"')
            }
        }
    }
});
