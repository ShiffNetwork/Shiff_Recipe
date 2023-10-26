import { reactive, toRefs, onUpdated, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useSearch() {
    const state = reactive({
        query:'',
        currentQuery:'',
        meals: [],
    })
    
    onUpdated(() => {
        console.log('updated');
    })

    let autocomplete
    watchEffect(() => {
        let query = state.query
        clearTimeout(autocomplete)
        autocomplete = setTimeout(() => {
            // for a next time add autocomplete feature
            console.log(query)
        }, 1000)
    })

    const route = useRoute()
    const router = useRouter()

    const search = () => {
        if (state.query.trim().length == 0) {
            state.meals = []
            state.currentQuery = ''
            router.push('/')
            return
        }
        fetch(
            'https://www.themealdb.com/api/json/v1/1/search.php?s=' + state.query
        )
        .then((response) => response.json())
        .then((data) => {
            state.meals = data.meals
            state.currentQuery = state.query
            router.push('/?q=' + state.query)
        })
    }

    if ( route.query.q) {
        state.query = route.query.q
        search()
    }

    return {
        ...toRefs(state),
        search,
    }
}