<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/recipe-logo.png" />
            <h2> {{ formattedTitle }}</h2>
        </div>
        <nav>
            <router-link to="/"> Home</router-link>
            <a href="#" @click="loadRandomRecipe"> Random recipe</a>
        </nav>
    </div>
</template>


<script>
    export default {
        props:{
            title:{
                type: String,
                required: true,
            },
        },
        methods:{
            loadRandomRecipe(evt){
                evt.preventDefault()
                fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then((response) => response.json())
                .then((data) => {
                    this.$router.push({
                        path: '/recipe',
                        query: {
                            id: data.meals[0].idMeal
                        },
                    })
                })
            }
        },
        computed:{
            formattedTitle() {
                let msg = this.title.split('')
                msg = msg.map((word) => {
                  return word[0].toUpperCase() + word.substring(1)  
                })
                return msg.join(' ')
            }
        }

    }
</script>


<style scoped>
    .header{
        background-color: #e67e22;
        padding: 20px 5%;
        margin: 0;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo{
        height: 100%;
        display: flex;
        align-items: center;
    }

    .logo img {
        height: 100%;
        margin-right: 5px;
    }

    .logo h2 {
        color: white;
    }

    nav a {
        color: white;
        text-decoration: none;
        margin-right: 0.5rem;
    }
</style>