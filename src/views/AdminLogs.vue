<template>
  <div>
    <h1>Logs</h1>

    <div class="pt-4">
      <v-data-table :headers="headers" :items="items"></v-data-table>
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
      headers: [
        {
          text: 'Date',
          value: 'timestamp',
        },
        {
          text: 'Description',
          value: 'type',
        },
        {
          text: 'Visitor',
          value: 'visitor.full_name',
        },
        {
          text: 'Room',
          value: 'room.name',
        },
        {
          text: 'Card',
          value: 'card.name',
        },
      ],
    }
  },
  computed: {
    items() {
      const array = this.logs

      array.forEach((item) => {
        item.visitor.full_name =
          item.visitor.first_name + ' ' + item.visitor.last_name
        item.timestamp = this.formatTime(item.timestamp)
      })

      return array
    },
    ...mapState({
      logs: (state) => state.log.logs,
    }),
  },
  methods: {
    formatTime(str) {
      return dayjs(str, 'YYYY-MM-DDTHH:mm:ss.SSS').format(
        'ddd, D MMM YYYY, h:m:ss A'
      )
    },
    ...mapActions({
      fetchLogs: 'log/fetch',
    }),
  },
  created() {
    this.fetchLogs()
  },
}
</script>

<style></style>
