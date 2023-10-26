<script>
import Popup from './Popup.vue';
export default {
    components: {
        Popup,
    },
    props: {
        videoID: {
            type: String,
            required: true,
        },
    },
}
</script>

<template>

    <popup>
        <iframe width="560" height="315" frameborder="0" allowfullscreen :src="'https://youtube.com/embed/' + videoID" />
    </popup>

</template>
