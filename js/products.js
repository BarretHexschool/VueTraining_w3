let productModal = '';
let delProductModal = '';
const { createApp } = Vue;
const app = {
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false,
        }
    },
    methods: {
        getProducts() {
            axios.get(`${url}/v2/api/${path}/admin/products/all`)
                .then(res => {
                    this.products = res.data.products;
                    console.log(this.products);
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        },
        productDetail(product) {
            this.tempProduct = product;
        },
        updateProduct(){
            let urlStr = `${url}/v2/api/${path}/admin/product`;
            let type = 'post';

            if( !this.isNew ) {
                urlStr = `${url}/v2/api/${path}/admin/product/${this.tempProduct.id}`;
                type = 'put';
            }
            axios[type](urlStr, { data : this.tempProduct})
                        .then(res=>{
                            alert(res.data.message);
                            productModal.hide();
                            this.getProducts();
                        })
                        .catch(err=>{
                            alert(err.response.data.message);
                        })
        },
        delProduct(){
            axios.delete(`${url}/v2/api/${path}/admin/product/${this.tempProduct.id}`)
                    .then(res=>{
                        alert(res.data.message);
                        delProductModal.hide();
                        this.getProducts();
                    } 
                    )
                    .catch(err=>{
                        alert(err.responsel.data.message);
                        delProductModal.hide();
                    })
        },
        createImages(){
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.pus('');
        },
        openModal(modalStatus, item) {
            if (modalStatus === 'new') {
              this.tempProduct = {
                imagesUrl: [],
              };
              this.isNew = true;
              productModal.show();
            } else if (modalStatus === 'edit') {
              this.tempProduct = { ...item };
              this.isNew = false;
              productModal.show();
            } else if (modalStatus === 'delete') {
              this.tempProduct = { ...item };
              delProductModal.show()
            }
          },

    },
    mounted() {
        // 登入驗證
        axios.post(`${url}/v2/api/user/check`)
            .then(res => {
                this.getProducts();
            })
            .catch(err => {
                window.location = 'index.html';
            });

        // 建立model實體
        productModal = new bootstrap.Modal(document.querySelector('#productModal'), {
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'), {
            keyboard: false
        });


    },
}

createApp(app).mount('#app');
