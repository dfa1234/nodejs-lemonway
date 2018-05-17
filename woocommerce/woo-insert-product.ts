/*

const WooCommerceAPI = require('woocommerce-api');
const WooCommerce = new WooCommerceAPI({
    url: config.url,
    consumerKey:config.consumerKey,
    consumerSecret: config.consumerSecret,
    wpAPI: true,
    version: 'wc/v2',
    queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
});

let myProductExtended = json as ProductExtended;
let body = {
    name: myProductExtended.presentation,
    type: 'simple',
    regular_price: ''+(parseInt(myProductExtended.prix_moyen)/100).toFixed(2),
    description: myProductExtended.content,
    short_description: myProductExtended.presentation,
    categories: [
        {
            id: myProductExtended.level1
        },
        {
            id: myProductExtended.level2
        },
        {
            id: myProductExtended.level3
        }
    ],
    images: [
        {
            src: myProductExtended.image,
            position: 0
        }
    ],
    meta_data:[
        {
            id:1,
            key:'is_medication',
            value:myProductExtended.is_medication
        }
    ]
};

WooCommerce.post('products',body,(error:any,result:any)=>{
    console.log(result && result.body);
    console.log(error && error.body);
    observer.next({resultInsert: resultInsert, body: body });
    observer.complete();
});
*/