<template>

    <div class="recipe-card">
        <router-link :to="{ path: '/recipe', query: {id} }">
            <img :src="thumbnail"/>
        </router-link>
        <div class="recipe-card-info">
            <h5>{{category}}</h5>
            <router-link :to="{ path: '/recipe', query: {id} }">
                <h3>{{recipeName}}</h3>
            </router-link>
            <ul>
                <li v-for="tag in tags" :key="tag">
                    {{tag}}
                </li> 
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
            recipeName: {
                type : String,
                required: true,
            },
            thumbnail:{
                type:String,
                required: true,
            },              
            category:{
                type: String,
                required: true
            },
            tags: {
                type: Array,
                validator: (val) => {
                    if (!val) return true
                    return val.every((tag) => typeof tag == 'string')
                }
            }
        },
    }
</script>

<style>
    .recipe-card{
        width: 300px;
        background-color: #fafafa;
        margin: 10px;
        text-align: left;
        border-radius: 10px;
        box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .recipe-card img {
        width: 100%;
    }

    .recipe-card-info{
        padding: 10px;
    }

    .recipe-card-info h5 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
        color: #e67e22;
    }

    .recipe-card-info h3 {
        margin: 0;
        padding: 0;
        margin-bottom: 10px;
        color: #2c3e50;
    }

    .recipe-card-info ul, 
    .recipe-tags {
        list-style: none;
        padding: 0;
        display: flex;
    }

    .recipe-card-info ul li, 
    .recipe-tags li {
        background-color: #ddd;
        margin-right: 10px;
        padding: 5px;
        border-radius: 5px;
        font-size: 0.8em;
    }


</style>