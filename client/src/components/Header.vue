<template>
    <div id="nav">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">BlockBuster</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item href="#">Privacy</b-nav-item>
        <b-nav-item-dropdown text="Admin">
          <router-link to="/genres" class="nav-item nav-link w-auto m-auto">Movie</router-link>
          <router-link to="/genres" class="nav-item nav-link w-auto m-auto">Genres</router-link>
          <router-link to="/castCrewRoles" class="nav-item nav-link w-auto m-auto">Cast Crew Roles</router-link>
          <router-link to="/CastCrews" class="nav-item nav-link w-auto m-auto">Cast Crew</router-link>
          <router-link to="/genres" class="nav-item nav-link w-auto m-auto">Subscription</router-link>
          <router-link to="/genres" class="nav-item nav-link w-auto m-auto">Users</router-link>
          <router-link to="/genres" class="nav-item nav-link w-auto m-auto">Requests</router-link>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" right>
        <b-nav-item href="#">Hello user</b-nav-item>
        <b-nav-item href="#">Log out</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  </template>

  <!-- comment -->