<template>
    <h1>Payment is Successful</h1>
<h1>{{ user }}</h1>
</template>

<script>
import { edit_user } from '@/api/user';
import { onMounted } from 'vue';
import { mapGetters } from 'vuex';
export default{
    data(){
        return{
            userLocalStorage: localStorage.getItem('user'),
        }
        
    },
    mounted(){
        this.edit_user();
    },  
    computed: {
    ...mapGetters({
        user: 'getUser'
    }),
},
    methods:{
        edit_user(){
            
            edit_user(this.user.data.uid)
        }
    }

}

</script>