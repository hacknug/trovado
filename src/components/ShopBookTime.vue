<template>
  <portal to="modal" v-if="open" v-scroll-lock="open">
    <BaseModal @close="$emit('close')" @prev="$emit('prev')" @next="$emit('next')">
      <BaseCard class="w-full max-w-3xl overflow-y-auto rounded-lg">
        <template slot="title">{{ open.properties && open.properties.name || `Save your Timeslot` }}</template>
        <template slot="description">Shop safer by letting everyone know when you're planning to go.</template>

        <VueMeetingSelector
          class="py-12"
          ref="meetingSelector"
          v-model="meeting"
          :date="date"
          :meetings-days="meetingsDays"
          :calendar-options="{ limit }"
          :loading="loading"
        >
          <!-- <template #header="{ meetings }">
            <div class="title">{{ formatingDateTitle(meetings.date) }}</div>
          </template>
          <template #meeting="{ meeting }">
            <div
              v-if="meeting.date"
              class="meeting"
              :class="meetingSelectedClass(meeting)"
              @click="selectMeeting(meeting)">
              {{ formatingTime(meeting.date) }}
            </div>
            <div v-else class="meeting--empty">
              &mdash;
            </div>
          </template>

          <template #loading>
            <div>Loading…</div>
          </template> -->

          <template #button-previous>
            <button @click="prevDate" :class="[(isPrevDisabled || loading) && 'opacity-50 cursor-not-allowed']" :disabled="isPrevDisabled || loading">
              <ChevronLeftIcon class="bg-gray-50 w-7 h-7 text-gray-400 border-2 border-gray-100 rounded" />
            </button>
          </template>
          <template #button-next>
            <button @click="nextDate" :class="[(isNextDisabled || loading) && 'opacity-50 cursor-not-allowed']" :disabled="isNextDisabled || loading">
              <ChevronRightIcon class="bg-gray-50 w-7 h-7 text-gray-400 border-2 border-gray-100 rounded" />
            </button>
          </template>

          <template #button-up="{ isDisabled }">
            <button @click="up" :class="[isDisabled && 'opacity-50 cursor-not-allowed']" :disabled="isDisabled">
              <ChevronUpIcon class="bg-gray-50 w-7 h-7 text-gray-400 border-2 border-gray-100 rounded" />
            </button>
          </template>
          <template #button-down="{ isDisabled }">
            <button @click="down" :class="[isDisabled && 'opacity-50 cursor-not-allowed']" :disabled="isDisabled">
              <ChevronDownIcon class="bg-gray-50 w-7 h-7 text-gray-400 border-2 border-gray-100 rounded" />
            </button>
          </template>

        </VueMeetingSelector>

        <footer class="owl:ml-4 sticky bottom-0 flex justify-center p-4 -mx-4 -mb-8 bg-white border-t border-gray-200">
          <BaseButton @click.native="$emit('close')" size="md" variant="secondary">Cancel</BaseButton>
          <BaseButton @click.native.prevent="bookTimeSlot" size="md" variant="primary" :isDisabled="!meeting">Book your Timeslot</BaseButton>
        </footer>

      </BaseCard>
    </BaseModal>
  </portal>
</template>

<script>
import VueMeetingSelector from 'vue-meeting-selector'
import { ChevronUpIcon, ChevronRightIcon, ChevronDownIcon, ChevronLeftIcon } from 'vue-feather-icons'

import { alert } from '~/mixins/Alert'

export default {
  name: 'ShopBookTime',
  mixins: [alert],
  components: {
    ChevronUpIcon, ChevronRightIcon, ChevronDownIcon, ChevronLeftIcon,
    BaseButton: () => import('~/components/base/BaseButton'),
    BaseCard: () => import('~/components/base/BaseCard'),
    BaseModal: () => import('~/components/base/BaseModal'),
    VueMeetingSelector,
  },
  props: {
    open: {
      type: [Boolean, Object],
      required: true,
    },
  },
  data () {
    return {
      date: new Date(),
      meeting: null,
      meetingsDays: [],
      loading: true,

      limit: 12,
      daysPerPage: 4,
    }
  },
  computed: {
    isPrevDisabled () {
      const date = new Date(this.date)
      date.setDate(date.getDate() - 1)
      return this.formatingDate(date) < this.formatingDate(new Date())
    },
    isNextDisabled () {
      const date = new Date()
      date.setDate(date.getDate() + this.daysPerPage * 2)
      return this.formatingDate(date) < this.formatingDate(new Date(this.date))
    },
  },
  methods: {
    up () {
      this.$refs.meetingSelector.previousMeetings()
    },
    down () {
      this.$refs.meetingSelector.nextMeetings()
    },
    formatingDate(dateToFormat) {
      const d = new Date(dateToFormat);
      const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
      const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
      const year = d.getFullYear();
      return `${year}-${month}-${day}`;
    },

    offsetDate (offset = 0) {
      const date = new Date(this.date)
      date.setDate(date.getDate() + offset)
      this.date = date
      return date
    },

    getMeetings (date = undefined) {
      return [...Array(this.daysPerPage).keys()].map((offset) => {
        const date = new Date().setDate(this.date.getDate() + offset)
        const slots = [...Array(this.limit * 1).keys()].map((hourOffset) => {
          return { date: new Date(date).setHours(hourOffset + 9, 0) }
        })

        return { date, slots }
      })
    },
    nextDate () {
      this.fetchMeetingDays(+this.daysPerPage)
    },
    prevDate () {
      this.fetchMeetingDays(-this.daysPerPage)
    },

    async fetchMeetingDays (offset = 0) {
      this.loading = true
      this.meetingsDays = await this.getMeetings(this.offsetDate(offset))
      this.loading = false
    },

    bookTimeSlot () {
      const date = new Date(this.meeting.date)
      this.alert(...(this.meeting
        ? ['ok', `${date.toDateString()} ${date.toTimeString()}`]
        : ['no', 'Please pick a timeslot']
      ))
    },
  },
  mounted () {
    this.fetchMeetingDays()
  },
}
</script>

<style lang="postcss" scoped>
::v-deep {
  & .tab {
    @apply flex flex-col !important;
    @screen md { @apply flex-row !important; }

    & > * + * {
      @apply mt-6 !important;
      @screen md { @apply mt-0 ml-6 !important; }
    }
  }

  & .tab__pagination { @apply flex flex-col !important; }
  & .tab__pagination > *:nth-child(1) { @apply mb-auto !important; }
  & .tab__pagination > * + * { @apply mt-2 !important; }

  & .tab__days { @apply flex flex-col p-0 !important; }
  & .tab__day { @apply flex flex-none flex-row border-b-0 !important; }
  & .tab__day + .tab__day { @apply mt-6 !important; }
  & .tab__day > * + * { @apply ml-6 !important; }
  & .tab__days__day-display { @apply w-1/4 text-left !important; }
  & .tab__days__meetings {
    @apply grid grid-cols-3 w-3/4 gap-1.5 !important;
    @screen md { @apply grid-cols-6 !important; }
  }
  & .tab__days__meetings .meeting { @apply w-full !important; }
  & .tab__days__meetings .meeting__button {
    @apply flex justify-center w-full m-0 py-1 px-3 bg-gray-50-25 border border-solid border-gray-200 font-normal text-center rounded;
    &:matches(.meeting__button--selected) { @apply bg-blue-50-50 border-blue-200 !important; }
    &:matches(:hover, :focus) { @apply bg-blue-50-25 border-blue-100; }
  }
}
</style>
