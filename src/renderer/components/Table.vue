<template>
  <div id="wrapper">
    <main>
          <div class="row valign-wrapper action-wrapper">
            <!-- <button v-on:click="loadTeams" variant="primary">Добавить команду</button> -->
            <div class="col s2"><button class="waves-effect waves-light btn">По местам</button></div>
            <div class="col s2"><button class="waves-effect red darken-4 btn">По порядку</button></div>
            <div class="col s8"></div>
        </div>
        <div class="row">
          <table>
            <tr>
              <th>№</th>
              <th>Название команды</th>
              <th class="question" v-for="question in questionCount" :key="question">{{question}}</th>
              <th>Сумма</th>
              <th>Рейтинг</th>
              <th>Место</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Сенсация</td>
              <td class="question" v-for="question in questionCount" :key="question">+</td>
              <td>228</td>
              <td>1488</td>
              <td>1</td>
            </tr>
          </table>
        </div>
    </main>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Table',
    components: { },
    computed: mapState(['questionCount']),
    methods: {
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
</style>