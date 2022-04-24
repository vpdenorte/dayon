<template>
  <BaseCard>
    <template #title>{{ fullName }}</template>

    <template #subtitle>{{ id }}</template>

    <template #actions>
      <v-btn v-show="!card" icon @click.stop="linkDialog = true">
        <v-icon>mdi-link</v-icon>
      </v-btn>

      <FormDialog
        ref="linkDialog"
        v-model="linkDialog"
        @submit="linkCard(linkVisitorForm)"
      >
        <template #title> Assign card </template>

        <template>
          <BaseSelect
            v-model="linkVisitorForm.card"
            label="Card"
            :items="$store.getters['card/getInactiveCards']"
            item-text="name"
            item-value="uid"
          />

          <BaseTextField
            v-model="linkVisitorForm.duration"
            label="Duration (hours)"
          />
        </template>
      </FormDialog>

      <v-btn v-show="card" icon @click.stop="unlinkPrompt = true">
        <v-icon>mdi-link-off</v-icon>
      </v-btn>

      <PromptDialog v-model="unlinkPrompt" @confirm="unlinkVisitorCard(id)"
        >Are you sure you want to unlink this visitor?</PromptDialog
      >

      <v-btn icon @click.stop="editDialog = true">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>

      <VisitorForm
        ref="editDialog"
        v-model="editDialog"
        :item="{
          first_name,
          last_name,
          contact_number,
          rooms,
        }"
        @submit="edit({ id, card, ...$event })"
      >
        <template #title>Edit card</template>
      </VisitorForm>

      <v-btn icon color="red" @click.stop="deletePrompt = true">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>

      <PromptDialog v-model="deletePrompt" @confirm="deleteVisitor(id)"
        >Are you sure you want to delete this item?</PromptDialog
      >
    </template>

    <template #expansion>
      <div class="pb-4">
        <div class="d-inline-flex align-center">
          <v-icon class="pr-2">mdi-information-outline</v-icon>
          <span class="text-subtitle-1">Visitor information</span>
        </div>

        <v-container class="visitor-info">
          <v-row>
            <v-col cols="4">First name</v-col>

            <v-col>{{ first_name }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="4">Last name</v-col>

            <v-col>{{ last_name }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="4">Contact number</v-col>

            <v-col>{{ contact_number }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="4">Rooms to visit</v-col>

            <v-col>
              <v-chip
                v-for="(room, index) in roomObjs"
                :key="index"
                outlined
                small
                class="mr-1"
                >{{ room.name }}</v-chip
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">Linked card</v-col>

            <v-col>{{ cardObj ? cardObj.name : 'None' }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="4">Expires on</v-col>

            <v-col>{{ expires_on ? expires_on : 'None' }}</v-col>
          </v-row>
        </v-container>
      </div>

      <div>
        <div class="d-inline-flex align-center">
          <v-icon class="pr-2">mdi-history</v-icon>
          <span class="text-subtitle-1">Recent activity</span>
        </div>

        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th>Action</th>
                <th>Room</th>
                <th>Card</th>
                <th>Time</th>
              </tr>
            </thead>

            <!-- <tbody>
              <tr v-for="log in logs" :key="log.id">
                <td>{{ log.type }}</td>
                <td>
                  {{ log.room }}
                </td>
                <td>{{ log.card }}</td>
                <td>
                  {{ formatTime(log.timestamp) }}
                </td>
              </tr>
            </tbody> -->
          </template>
        </v-simple-table>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import VisitorForm from '@/components/VisitorForm'
import PromptDialog from '@/components/PromptDialog'
import FormDialog from '@/components/FormDialog.vue'
import { mapState, mapActions } from 'vuex'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.extend(utc)

export default {
  components: {
    VisitorForm,
    PromptDialog,
    FormDialog,
  },
  props: {
    id: Number,
    first_name: String,
    last_name: String,
    contact_number: String,
    card: String,
    rooms: Array,
    expires_on: String,
  },
  data() {
    return {
      editDialog: false,
      deletePrompt: false,
      linkDialog: false,
      unlinkPrompt: false,
      linkVisitorForm: {
        card: null,
        duration: null,
      },
    }
  },
  computed: {
    fullName() {
      return this.last_name + ', ' + this.first_name
    },
    logs() {
      return this.$store.getters['log/getLogsByVisitor'](this.id)
    },
    cardObj() {
      return this.$store.getters['card/getCardByUid'](this.card)
    },
    roomObjs() {
      return this.$store.getters['room/getRoomsByBoardIds'](this.rooms)
    },
    ...mapState({
      cards: (state) => state.card.cards,
    }),
  },
  methods: {
    edit(item) {
      console.log({ ...item })
      this.updateVisitor(item)
        .then(() => {
          this.$refs.editDialog.close()
        })
        .catch(() => {})
    },
    formatTime(str) {
      // return dayjs(str).format('ddd, D MMM YYY, h:s A')

      return dayjs(str, 'YYYY-MM-DDTHH:mm:ss.SSS').format(
        'ddd, D MMM YYYY, h:m A'
      )
    },
    timeFromNow(time) {
      return dayjs(time, 'YYYY-MM-DDTHH:mm:ss.SSS').fromNow()
    },
    linkCard(form) {
      this.linkVisitorCard({
        id: this.id,
        card: form.card,
        duration: form.duration,
      }).then(() => {
        this.$refs.linkDialog.close()
      })
    },
    ...mapActions({
      updateVisitor: 'visitor/update',
      deleteVisitor: 'visitor/delete',
      linkVisitorCard: 'visitor/linkVisitorCard',
      unlinkVisitorCard: 'visitor/unlinkVisitorCard',
    }),
  },
}
</script>

<style scoped></style>
