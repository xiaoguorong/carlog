Component({
  properties: {
    
  },
  data:{
   
  },
  methods:{
    close(){
      console.log("vc")
      this.triggerEvent('myClose')
    },
    noClick(){
      return;
    }
  }
})