<template>
  <div id="app">
    <input v-model="newRoom">
    <button id = "room" v-on:click = "addNewRoom">Create new room</button>
    <p>Room's available:</p>
    <ul id="rooms">
      <li v-for="room in rooms" :key = "room.id">
        <button v-on:click = "room.show = !room.show">{{ room.name }}</button>
        <!-- <transition name="fade"> -->
           <!-- <div id="tables" v-if="room.show"> -->
            <div id="tables">
            <input v-model="newTable">
            <button v-on:click = "addNewTable">Create new table</button>
            <p>Table's available:</p>
            <ul id="table">
              <li v-for="table in room.tables" :key="table.id" >
                <p>{{ table.tname }}</p>
              </li>
            </ul>
          </div>
        <!-- </transition> -->
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      rooms: [
        { name: 'h',
          show: false,
          tables: [
            { tname: 'g' },
          ],
        }],
      newRoom: '',
      newTable: '',
    };
  },
  methods: {
    addNewRoom() {
      this.rooms.push({ name: this.newRoom, show: false, tables: [{ tname: '' }] });
      this.newRoom = '';
    },
    addNewTable() {
      this.room.tables.push({ tname: this.newTable });
      this.room.newTable = '';
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.margin {
  display: block;
  margin-top: 16px;
  margin-bottom: 16px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
