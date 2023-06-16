<template>
    <ul class="nav justify-content-center category-tab">
		<li v-for="genre in genres" :key="genre.id" class="nav-item py-2">
			<router-link @click="addGenre(genre.id)" :to="{name: 'genreMovies', params: {id: genre.id}}" class="nav-link text-dark category-link">{{genre.name}}</router-link>
		</li>
	</ul>
</template>

<script>

export default {
    props: {
        genres: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            selectedGenres: []
        }
    },
    methods: {
        addGenre(genre) {
            // Add the clicked category to the selected categories array
            if (!this.selectedGenres.includes(genre)) {
                this.selectedGenres.push(genre);
            }

        },
    }
}
</script>


<style scoped>
.category-tab {
	background: #eee;
	display: flex;
	align-items: center;
}

.category-link:hover {
	color: crimson !important;
	transition: 0.2s;
}

.category-link a.router-link-exact-active {
  color: crimson;
}
</style>