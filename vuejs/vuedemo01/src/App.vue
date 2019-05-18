<template>


  <div id="app"> 
      
   
  </div>
</template>

<script>

export default {     
      data () { 
        return {
          todo:'' ,
          list: []
        }
      },
      methods:{

        doAdd(e){
              // console.log(e);
              if(e.keyCode==13){
                  this.list.push({
                    title:this.todo,
                    checked:false,
                  })
              }

              localStorage.setItem('list',JSON.stringify(this.list))
        },
        removeData(key){

            this.list.splice(key,1)
           
            localStorage.setItem('list', JSON.stringify(this.list))
        }
        , saveList(){

           localStorage.setItem('list', JSON.stringify(this.list))
        }

      },mounted(){   /*生命周期函数       vue页面刷新就会触发的方法*/

          var list=JSON.parse(localStorage.getItem('list'));

          if(list){  /*注意判断*/
            this.list=list;
          }
      }

    }
</script>


<style lang="scss">

.finish{

  
  li{
    background:#eee;
  }
}

</style>

