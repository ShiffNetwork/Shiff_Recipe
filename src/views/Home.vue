<template>
    <div class="home">
        <div class="search">
            <h1> Find a recipe</h1>
            <input type="text" 
                placeholder="Enter a recipe"
                v-model="query"
                ref="searchInput"
                @keydown.enter="search"/>
            <button @click="search"> Search</button>
        </div>

        <div class="results">
            <div class="results-header" v-show="currentQuery.length > 0">
                <div v-if="meals && meals.length > 0">

                    <p> {{  meals.length }} results for {{ currentQuery }} </p>
                    <p>
                        Filter results
                        <select v-model="searchFilter">
                            <option value="">View All</option>
                            <option
                                v-for="category in searchFilterOptions"
                                :key="category"
                                :value="category"
                            >
                                {{category}}
                            </option>
                        </select>
                    </p>
                </div>
                <div v-else>
                    No results found for {{ currentQuery}}
                </div>
            </div>  
            <div class="results-cards">
                <recipe-card-vue
                    v-for="meal in filteredMeals"
                    :key="meal.idMeal"
                    :id="meal.idMeal"
                    :recipe-name="meal.strMeal"
                    :category="meal.strMeal"
                    :thumbnail="meal.strMealThumb"
                    :tags="meal.strTags ? meal.strTags.split(',') : []"
                />
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { ref, onMounted } from 'vue'
import RecipeCardVue from '../components/RecipeCard.vue'
import {useSearch} from '../composables/search'
    export default {
        components: {
            RecipeCardVue,
        },
        setup() {
            
            const {currentQuery, query, meals, search } = useSearch()
            
            const searchFilter = ref('')
            const searchInput = ref(null)

            onMounted(() => {
                searchInput.value.focus()
            })

            const filteredMeals = computed(() => {
                if (searchFilter.value.length == 0) {
                    return meals.value
                }

                return meals.value.filter((meal) => {
                    return meal.strCategory && meal.strCategory == searchFilter.value
                })
            })

            const searchFilterOptions = computed(() => {
                let categories = []
                meals.value.forEach((meal) => {
                    if (meal.strCategory && categories.indexOf(meal.strCategory) == -1) {
                        categories.push(meal.strCategory)
                    }
                })
                return categories
            })

            return {
                query,
                currentQuery,
                filteredMeals,
                searchFilterOptions,
                meals,
                searchFilter,
                searchInput,
                search,
            }
        },
    }
</script>

<style scoped>
    .search{
        background-color: #eee;
        text-align: center;
        padding: 30px 0;
    }

    .search input[type='text'] {
        border: none;
        outline: none;
        width: 80%;
        max-width: 500px;
        display: block;
        margin: 50px auto;
        padding: 20px;
        font-size: 1.5em;
        border-radius: 8px;
    }

    .results-header{
        padding: 20px 0;
    }

    .results-cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

</style>