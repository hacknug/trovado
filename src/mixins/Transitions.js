export const transitions = {
  data () {
    return {
      transitions: {
        fade: {
          'enter-active-class': 'duration-300 ease-out',
          'enter-class': 'opacity-0',
          'enter-to-class': 'opacity-100',
          'leave-active-class': 'duration-200 ease-in',
          'leave-class': 'opacity-100',
          'leave-to-class': 'opacity-0',
        },
        zoom: {
          'enter-active-class': 'transition duration-200 ease-out',
          'enter-class': 'transform scale-95 opacity-0',
          'enter-to-class': 'transform scale-100 opacity-100',
          'leave-active-class': 'transition duration-75 ease-in',
          'leave-class': 'transform scale-100 opacity-100',
          'leave-to-class': 'transform scale-95 opacity-0',
        },
      },
    }
  },
}
