const app = Vue.createApp({
    data:()=>({
        title: 'App Degradado con Vue',
        fcolor: '#5A4D99',
        tcolor: '#6AC266',
        orientation: 1
    }),
    computed: {
        setColor(){
            if(this.orientation == 1)
            {
                return `background: linear-gradient(to right, ${this.fcolor}, ${this.tcolor})`
            }
            else if(this.orientation == 2){
                return `background: linear-gradient(to left, ${this.fcolor}, ${this.tcolor})`
            }
            else if(this.orientation == 3){
                return `background: linear-gradient(to top, ${this.fcolor}, ${this.tcolor})`
            }
            else if(this.orientation == 4){
                return `background: linear-gradient(to bottom, ${this.fcolor}, ${this.tcolor})`
            }
        }
    }
})