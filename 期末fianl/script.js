var vm = new Vue({
    el:"#app",

    data:{
        movies:[],
        cart:[],
        currentMovie:null,
        isCartOpen:false,
        number:1,
        isCheckOpen:false,
        Nsearch:'',
        editorpanel:false,
        tempMovie:[],
        BeforeSearchMovie:[],
        AfterBuy:[],
        find:true
    },

    //取得電影資料
    //axios 可以直接存取資料內容 專門讀取html的內容
    created(){
        this.create()
    },

    methods: {
        create(){
            this.find=true
            this.tempMovie=this.movies  
            // console.log("create: tempMovie",this.tempMovie)
            let apiUrl ="movie.json"//資料內容在哪裡
            axios.get(apiUrl).then(res=>{
                this.movies=res.data //抓到資料後丟到movies裡面

     
                if (this.tempMovie != []){//各項記錄下給新的movies
                    this.tempMovie.forEach((e)=>{
                        this.movies.forEach((m)=>{
                            if(m.index==e.index){
                                e.hide=false
                                m.left=e.left
                                m.soldout=e.soldout
                            }
                        })
                    })
                }
            })
            // console.log("now movies",this.movies)
            this.Nsearch=''
            
        },

        bgcss(url){
            return{
                // return css的語法
                'background-image':'url(' + url + ')', //只把突變抓出去
                //要至中
                'background-position':'center center',
                'background-size':"cover"  ,
            }
        },//bgcss

        wheel(evt){
            //tweenmax 動畫效果
            TweenMax.to(".cards",0.8,{
                left:"+="+evt.deltaY*2+"px"
            })

        },//wheel event
        

        addCart(movie,evt){
            carFlag=false
            this.cart.forEach((car)=>{
                if(car.index==movie.index){
                    carFlag=true
                    movie=car
                }
            })
            number=parseInt(this.number)
            if(number>=0&& number<=movie.left&&  (carFlag == false)){//add2cart 第一次加入
                console.log("o no in cart")
                // console.log("movie.name",movie.name,"T/F",this.cart.includes(movie.name))
                this.doOneTime(movie,evt,number)
            }
            else if ((number>=0&& carFlag== true) && number+movie.howmany<=movie.left){
                console.log("movie in this cart!")
                this.currentMovie=movie
                //要知道位置才能讓動畫跑
                let target=evt.target//抓位置
                this.$nextTick(()=>{
                    //更新之後我才做這件事情
                    TweenMax.from(".buybox",0.8,{
                    left:$(evt.target).offset().left,
                    top:$(evt.target).offset().top,
                    opacity:1
                })
                    
                })

                setTimeout(()=>{
                    // let count=
                    // console.log(count)
                    if (this.cart.length!=0){ //Q1
                        var flag=0
                        this.cart.forEach((ind)=>{
                            console.log("index 2")
                            if (movie.index==ind.index){
                                if(ind.howmany+parseInt(this.number)<=ind.left){
                                    ind.howmany=ind.howmany+parseInt(this.number)
                                    console.log(ind.name,"+1")
                                    flag=1
                                    this.number=1
                                }
                            }
                            
                        })
                        if(flag==0){
                            movie.howmany=movie.howmany+parseInt(this.number)
                            console.log("push movie")
                            this.cart.push(movie)
                            this.number=1
                        }
                        
                    }
                    else{
                        movie.howmany=movie.howmany+parseInt(this.number)
                        console.log("this.cart == null")
                        this.cart.push(movie)
                        this.number=1
                    }
                    
                },400)
            }else if (number<0){
                alert("不可以是負數")
                this.number=1
            }
            else{
                // console.log("this's 2 ",this.number>=0,carFlag== true,parseInt(this.number)+movie.howmany<=movie.left)
                // console.log("mistake",parseInt(this.number),movie.howmany,movie.left)
                this.number=1
                alert('超過電影庫存數量了，請重新選擇數量')
            }
                
            
        },
        doOneTime(movie,evt,number){
            this.currentMovie=movie
            //要知道位置才能讓動畫跑
            let target=evt.target//抓位置
            this.$nextTick(()=>{
                //更新之後我才做這件事情
                TweenMax.from(".buybox",0.8,{
                left:$(evt.target).offset().left,
                top:$(evt.target).offset().top,
                opacity:1
            })
                
            })

            setTimeout(()=>{
                // let count=
                // console.log(count)
                if (this.cart.length!=0){ //Q1
                    var flag=0
                    this.cart.forEach((ind)=>{
                        console.log("index 1time")
                        if (movie.index==ind.index){
                            if(ind.howmany+number<=ind.left){
                                ind.howmany=ind.howmany+number
                                console.log(ind.name,"+1")
                                flag=1
                                this.number=1
                            }
                        }
                        
                    })
                    if(flag==0){
                        movie.howmany=movie.howmany+number
                        console.log("push movie")
                        this.cart.push(movie)
                        this.number=1
                    }
                }
                else{
                    movie.howmany=movie.howmany+number
                    console.log("this.cart == null")
                    this.cart.push(movie)
                    this.number=1
                }
                
            },400)
        },
        addORreduce(m,i){
            if(i==0 &&m.howmany!=0){
                if(m.howmany-1==0){
                    alert("已經是最低了!!!")
                }else{
                m.howmany-=1
                }
            }
            else if (i==1){
                if(m.howmany+1<=m.left){
                    m.howmany+=1
                }
                else{
                    alert("超過電影庫存量，不能再高了!!!")
                }
            }
        },



        del(m){
            console.log("i get in")
            this.cart.forEach((i)=>{
                if(m.index == i.index){
                    console.log("i get index:",i.index)
                    var ind= this.cart.indexOf(i)
                    this.cart.splice(ind,1)
                }
            })
        },

        removeAll(){
            this.cart.forEach((e)=>{
                e.howmany=0
            })
            this.cart=[]
        },



        cartopen(){
            this.isCartOpen=!this.isCartOpen
            this.isCheckOpen=false
        },
        buyIt(){
            this.isCheckOpen = true
        },
        butIt2end(){
            this.isCartOpen=false
            this.isCheckOpen=false
            this.movies.forEach((m)=>{
                m.hide=false
                this.cart.forEach((c)=>{
                    if(m.index==c.index){
                        // console.log("before m",m.name,m.left,"c",c.name,c.left)
                        m.left-=c.howmany
                        m.howmany=0
                        if(m.left==0){
                            m.soldout=true
                        }
                        // console.log("after m",m.name,m.left,"c",c.name,c.left)
                    }
                })

            })
            this.cart=[]
        },
        goback(){
            this.isCartOpen=true
            this.isCheckOpen=false
        },



        foundORnot(){
            found=false
            if(this.Nsearch!='' ){
                this.movies.forEach((m)=>{
                    // console.log(this.movies)
                    if(m.name.includes(this.Nsearch)==false){      
                        m.hide=true
                    }else{
                        found=true
                    }
                       
                })
            }else{ 
                this.create()                
                console.log("hihi")//ok
            }
            
            if(found==false){
                this.find=false
                alert("商品未找到")
            }

        },

        doo(){
            this.foundORnot(0)
        },

        CheckSoldOut(mo){
            mo.soldout = !mo.soldout
            if(mo.soldout==true){
                mo.left=0
            }else{
                mo.left=1
            }
        }

        
    },

    watch:{//偵查事件 觀察購物車是否有加入點選的物件 caer size變化
        cart(){
            TweenMax.from(".fa-shopping-cart",0.3,{scale:0.5})//icon購物車 的縮小與放大
        }
        
        
    },


    computed:{//計算total
        totalPrice(){
            var total=0
           this.cart.forEach((e)=>{
              total=total+(e.price*e.howmany)
          })
          return total
        //   this.cart
        //     .map(movie=>movie.price)
        //     .reduce((total,p)=>total+p,0)
            
        }
    },

    watch: {
        cart(){
          TweenMax.from(".fa-shopping-cart",0.3,{
            scale: 0.5
          })
        }
    }

})