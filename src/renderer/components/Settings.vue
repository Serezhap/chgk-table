<template>
    <main>
          <div class="row valign-wrapper action-wrapper">
            <div class="col s4"><button class="waves-effect waves-light btn">Загрузить файл</button></div>
            <div class="col s2 offset-s4 q-count">
              <input :value="QUESTION_COUNT" id="questions-count" max="100" min="0" type="number" class="validate col s4">
              <label class="active col s12" for="questions-count">Количество вопросов</label>
            </div>
            <div class="col s2"><button @click="generate" class="waves-effect red darken-4 btn">Сформировать</button></div>
            </div>
            <div>
                <ul class="collection" v-if="GET_TEAMS.length">
                    <li class="collection-item row valign-wrapper" v-for="team in GET_TEAMS" :key="team.id">
                      <div class="col s1 center-align">{{team.id}}</div>
                      <div class="col s10">
                        <input @change="teamRename" :value="team.name" :id="team.num" class="" placeholder="Введите название команды" type='text' />
                      </div>
                      <div @click="REMOVE_TEAM(team.num)" class="col s1 delete-team"><i class="Small material-icons">delete</i></div></li>
                </ul>
                <div v-else class="not_teams">Не добавлено ни одной команды</div>
              <a @click="ADD_TEAM" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
            </div>
    </main>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Settings',
    components: {},
    computed: mapGetters(['GET_TEAMS', 'QUESTION_COUNT']),
    methods: {
      ...mapActions(['ADD_TEAM', 'REMOVE_TEAM', 'RENAME_TEAM', 'SET_QUESTIONS']),
      teamRename (e) {
        this.RENAME_TEAM({num: e.target.id, name: e.target.value})
      },
      generate () {
        this.SET_QUESTIONS(document.getElementById('questions-count').value)
      }
    },
    mounted () {
      console.log(this.$store)
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
  .not_teams {
    margin: 2rem auto;
    text-align: center;
    font-size: 8vh;
  }

</style>
