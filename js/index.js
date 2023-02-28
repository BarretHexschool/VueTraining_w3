const {createApp} = Vue ;
const app = {
data(){
    return {
        user : {
            username:'',
            password:''
        },
    }
},
methods: {
    login() {
        axios.post(`${url}/v2/admin/signin`,this.user)
                .then(res=>{
                    const {token, expired} = res.data
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                    this.alert("恭喜您，登入成功！")
                    window.location = 'products.html';
                })
                .catch(err=>{
                    this.alert(err.response.data.message)
                })
        },
    alert(message){
        window.alert(`${message}`);
    }

},
}

createApp(app).mount('#app');
