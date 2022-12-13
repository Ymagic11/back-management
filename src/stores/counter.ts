import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  let defaultactive = ref<string>('1')
  let fullname = ref<string>('')
  let basename = ref<string>('')

  function setAc(index:string){
    defaultactive.value = index
  }

  function setfull(name:string){
    fullname.value = name
  }

  function setbase(name:string){
    basename.value = name
  }

  return { defaultactive,fullname,basename,setAc,setfull,setbase }
})
