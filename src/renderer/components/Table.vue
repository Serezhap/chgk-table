<template>
  <div id="wrapper">
    <main>
          <div class="row valign-wrapper action-wrapper">
            <div class="col s2"><button @click="SET_ORDER('rank')" class="waves-effect waves-light btn">По местам</button></div>
            <div class="col s2"><button @click="SET_ORDER('default')" class="waves-effect red darken-4 btn">По порядку</button></div>
            <div class="col s8"></div>
        </div>
        <div class="row">
          <div class="col s12 table-wrapper">
            <table class="striped">
              <thead>
                <tr>
                  <th class="team_id">№</th>
                  <th class="team_name">Название команды</th>
                  <th class="question" v-for="question in QUESTION_COUNT" :key="question">{{question}}</th>
                  <th class="sum">Сумма</th>
                  <th class="rate">Рейтинг</th>
                  <th class="pos">Место</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="team in GET_TEAMS" :key="team.id">
                  <td class="team_id">{{team.id}}</td>
                  <td class="team_name truncate">{{team.name}}</td>
                  <td :title="team.name + ' ' + 'вопрос ' + question" class="question" v-for="question in QUESTION_COUNT" :key="question" @click="toggleAnswer(team, question)"><span>{{team.answers.includes(question) ? '+' : '-'}}</span></td>
                  <td class="sum">{{team.answers.length}}</td>
                  <td class="rate">{{team.rating}}</td>
                  <td class="pos">{{team.rank}} <span v-if="team.lastrank"> - {{team.lastrank}}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </main>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  // import { ipcRenderer } from 'electron'

  export default {
    name: 'Table',
    components: { },
    computed: mapGetters(['GET_TEAMS', 'QUESTION_COUNT', 'RATING', 'TEAM_RATING', 'GET_STATE']),
    methods: {
      ...mapActions(['TOGGLE_ANSWER', 'SET_RATING', 'SET_ORDER']),
      toggleAnswer (team, question) {
        this.TOGGLE_ANSWER({num: team.num, question: question})
        // console.log(this.GET_STATE)
        // ipcRenderer.send('test', this.GET_STATE)
      }
    }
  }
</script>
<style>
.action-wrapper {
  padding: 1rem 0;
  height: 132px;
}
.q {
  width: 35px;
}
.table-wrapper {
  overflow-x: auto;
}
.team_id, .team_name {
  width: 40px;
  position: absolute;
  padding-left: 15px;
  left: 2rem;
}
tbody tr:nth-child(odd) td, tbody tr:nth-child(odd) td {
  background: rgb(242,242,242);
}
tbody tr:nth-child(even) td, tbody tr:nth-child(even) td {
  background: #fff;
}
thead th {
  background: #fff;
}
.team_name {
  width: 200px;
  left: 68px;
}
.question {
  width: 30px;
  text-align: center;
  cursor: pointer;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.question:nth-child(3) {
  padding-left: 240px;
}
.sum, .rate, .pos {
  width: 80px;
  font-weight: 600;
  text-align: center;
}
table {
  width: auto !important;
}
</style>