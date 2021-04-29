<template>
  <div id="app">
    <nav class="light-blue darken-4">
      <div class="nav-wrapper">
        <span class="brand-logo">Что? Где? Когда?</span>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link active-class="active" exact tag="li" class="col-3" to="/"><a href="#">Настройки</a></router-link>
          <router-link active-class="active" tag="li" class="col-3" to="/table"><a href="#">Таблица</a></router-link>
        </ul>
      </div>
    </nav>
      <router-view></router-view>
  </div>
</template>

<script>
  import M from 'materialize-css'
  export default {
    name: 'chgk',
    mounted () {
      M.AutoInit()
    }
  }
</script>

<style>
  /* CSS */
  nav, main {
    padding: 0 2rem;
  }
</style>
