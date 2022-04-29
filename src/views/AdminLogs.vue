<template>
  <div>
    <h1>Logs</h1>

    <div class="pt-4">
      <!-- <v-data-table :headers="headers" :items="items"></v-data-table> -->
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Visitor</th>
              <th>Room</th>
              <th>Card</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :key="log.id">
              <td>{{ formatTime(log.timestamp) }}</td>
              <td>{{ log.type }}</td>
              <td>{{ getVisitorName(log.visitor) }}</td>
              <td>{{ getRoomName(log.room) }}</td>
              <td>{{ getCardName(log.card) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

export default {
  data() {
    return {
      // headers: [
      //   {
      //     text: 'Date',
      //     value: 'timestamp',
      //   },
      //   {
      //     text: 'Description',
      //     value: 'type',
      //   },
      //   {
      //     text: 'Visitor',
      //     value: 'visitor.full_name',
      //   },
      //   {
      //     text: 'Room',
      //     value: 'room.name',
      //   },
      //   {
      //     text: 'Card',
      //     value: 'card.name',
      //   },
      // ],
    }
  },
  computed: {
    // items() {
    //   const array = this.logs

    //   array.forEach((item) => {
    //     item.visitor.full_name =
    //       item.visitor.first_name + ' ' + item.visitor.last_name
    //     item.timestamp = this.formatTime(item.timestamp)
    //   })

    //   return array
    // },
    ...mapState({
      logs: (state) => state.log.logs,
    }),
  },
  methods: {
    getVisitorName(visitorId) {
      const obj = this.$store.getters['visitor/getVisitorById'](visitorId)

      return obj ? obj.first_name + ' ' + obj.last_name : 'Null'
    },
    getRoomName(roomId) {
      const obj = this.$store.getters['room/getRoomByBoardId'](roomId)

      return obj ? obj.name : 'Null'
    },
    getCardName(cardUid) {
      const obj = this.$store.getters['card/getCardByUid'](cardUid)

      return obj ? obj.name : 'Null'
    },
    formatTime(str) {
      return dayjs(str, 'YYYY-MM-DDTHH:mm:ss.SSS').format(
        'ddd, D MMM YYYY, hh:mm:ss A'
      )
    },
    ...mapActions({
      fetchLogs: 'log/fetch',
      fetchCards: 'card/fetch',
      fetchRooms: 'room/fetch',
      fetchVisitors: 'visitor/fetch',
    }),
  },
  created() {
    this.fetchCards()
    this.fetchRooms()
    this.fetchVisitors()
    this.fetchLogs()
  },
}
</script>

<style></style>
