<template>
    <div class="form-container">
        <h2>Upload Komenti </h2>
        <div class="insert-form">


            <b-form @submit="onSubmit">
                <b-form-group label="Komenti comment">
                    <b-form-input v-model="komenti.comment" placeholder="Komenti comment" required></b-form-input>
                    <b-form-input v-model="komenti.title" placeholder=" title" required></b-form-input>


                    <b-form-select v-model="komenti.artikulliID" placeholder="Select role" required>
                        <option :value="null">Please select an option</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
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
import { addKomenti } from '../../api/komenti'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { fetchArtikulli } from "../../api/artikulli";

export default {
    name: 'Addkomenti',
    data() {
        return {
            komenti: {
                comment: '',
                title: '',
                artikulliID: null
            },

            roles: []

        }
    },
    async mounted() {
       await this.fetchArtikulli()
    }
    ,
    methods: {

        fetchArtikulli() {
            fetchArtikulli()
                .then(response => {
                    this.roles = response;
                })
                .catch(error => {
                    console.error('Failed to fetchArtikulli:', error);
                });
        },

        async onSubmit() {

            try {
                await addKomenti(this.komenti.comment, this.komenti.title,this.komenti.artikulliID)
                this.resetForm()
                toast("Cast uploaded successfuly", {
                    autoClose: 1000,
                });
            } catch {
                toast("Cast upload failed", {
                    autoClose: 1000,
                });
            }
        },

        resetForm() {
            this.komenti.comment = "",
            this.komenti.title = "",
            this.komenti.artikulliID= null
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