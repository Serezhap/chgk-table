<template>
    <main>
        <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="col-8">
                
                <div class="col-3"></div>
            </div>
            <span @click="clear" class="col-4">Загрузить файл</span>
        </nav> -->
        
          <div class="row valign-wrapper action-wrapper">
            <!-- <button v-on:click="loadTeams" variant="primary">Добавить команду</button> -->
            <div class="col s4"><button class="waves-effect waves-light btn">Загрузить файл</button></div>
            <div class="col s2 offset-s4 q-count">
              <input :value="questionCount" id="questions-count" max="100" min="0" type="number" class="validate col s4">
              <label class="active col s12" for="questions-count">Количество вопросов</label>
            </div>
            <div class="col s2"><button @click="this.generate" class="waves-effect red darken-4 btn">Сформировать</button></div>
            </div>
            <div>
                <ul class="collection">
                    <li class="collection-item row valign-wrapper" v-for="team in teams" :key="team.id">
                      <div class="col s1 center-align">{{team.id}}</div>
                      <div class="col s10">
                        <input :value="team.name" :id="team.num" @input="updateTeam" class="" placeholder="Введите название команды" type='text' />
                      </div>
                      <div class="col s1 delete-team" @click="deleteTeam(team)"><i class="Small material-icons">delete</i></div></li>
                </ul>
              <a @click="this.addTeam" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
            </div>
    </main>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'Settings',
    components: {},
    computed: mapState(['teams', 'questionCount']),
    methods: {
      ...mapActions(['addTeam', 'clear', 'remove', 'update', 'questionCountSet']),
      deleteTeam (team) {
        this.remove(team)
      },
      updateTeam (e) {
        console.log(e.target.value)
        this.update({num: e.target.id, name: e.target.value})
      },
      generate () {
      }
    }
  }
</script>
<style>
  /* CSS */
  .q-count * {
    padding: 0 !important;
  }
  .material-icons {
    cursor: pointer;
  }

</style>
