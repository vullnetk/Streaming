<template>
    <div class="form-container">
        <h2>Upload Transaksion </h2>
        <div class="insert-form">


            <b-form @submit="onSubmit">
                <b-form-group label="Transaksion Name">
                    <b-form-input v-model="Transaksion.name" placeholder="Transaksion name" required></b-form-input>
                    <b-form-select v-model="Transaksion.llogariId" placeholder="Select llogari" required>
                        <option :value="null">Please select an option</option>
                        <option v-for="llogari in llogarite" :key="llogari.id" :value="llogari.id">{{ llogari.name }}</option>
                    </b-form-select>
                </b-form-group>
                <div class="d-flex gap-2 justify-content-center">
                    <b-button type="submit" variant="primary">Upload</b-button>
                    <b-button @click="resetForm" variant="danger">Reset</b-button>
                </div>

            </b-form>
        </div>
        
    </div>


</template>

<script>
import { addTransaksioni } from '../../api/transaksioni'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { fetchLlogari } from "../../api/llogari";

export default {
    name: 'AddTransaksion',
    data() {
        return {
            Transaksion: {
                name: '',
                llogariId: null
            },

            llogarite: []

        }
    },
    async mounted() {
       await this.fetchLlogari()
    }
    ,
    methods: {

        fetchLlogari() {
            fetchLlogari()
                .then(response => {
                    this.llogarite = response;
                })
                .catch(error => {
                    console.error('Failed to fetch llogari:', error);
                });
        },

        async onSubmit() {

            try {
                await addTransaksioni(this.Transaksion.name, this.Transaksion.llogariId)
                this.resetForm()
                toast("Transaksion uploaded successfuly", {
                    autoClose: 1000,
                });
                this.$router.push('/transaksion');
            } catch {
                toast("Cast upload failed", {
                    autoClose: 1000,
                });
            }
        },

        resetForm() {
            this.Transaksion.name = "",
            this.Transaksion.llogariId= null
        }
    }
}
</script>

<style lang="scss" scoped>
.form-container {
    width: 600px;
    padding: 3% 0;
    margin: 0 auto;
}
</style>