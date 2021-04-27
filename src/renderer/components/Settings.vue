<template>
  <div id="wrapper">
    <main class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="col-8">
                <router-link class="col-3" to="/">Настройки</router-link>
                <router-link class="col-3" to="/table">Таблица</router-link>
                <div class="col-3"></div>
            </div>
            <span @click="clear" class="col-4">Загрузить файл</span>
        </nav>
        <div class="d-flex flex-row bd-highlight justify-content-between mt-3 mb-3">
            <b-button v-on:click="loadTeams" variant="primary">Добавить команду</b-button>
                <div class="row">
                    <label for="questions-count" class="mt-auto">Количество вопросов:</label>
                    <b-form-input class="col-2 ml-3" id="questions-count" type='number'></b-form-input>
                </div>
            </div>
            <div>
                <b-list-group>
                    <b-row v-for="team in teams" :key="team.id"><div class="col-2">{{team.id}}</div><div class="col-8"><b-form-input class="col-8 ml-3" :value=team.name id="questions-count" type='text'></b-form-input></div><div @click="deleteTeam(team)">close</div></b-row>
                </b-list-group>
            </div>
    </main>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'Settings',
    components: {},
    computed: mapState(['teams']),
    methods: {
      ...mapActions(['addTeam', 'clear', 'remove']),
      loadTeams () {
        this.addTeam()
      },
      deleteTeam (team) {
        this.remove(team)
      }
    }
  }
</script>