const axios = require('axios');

let url = "http://localhost:5000/api/";




migrate = async()=>{

let searchCriteria = ["horror","faultinourstars","harrypotter","comedy","political","poetry","romance",
"science", "suspense","poem","math","adult","children","animes","manga","kannada","bengalie", "harrypotter","soccer","cricket",
"education", "anime", "university", "india", "usa", "action"]

let structuredData;
let count = 0;
let criteria_count = 0;

try{
    await createSellers();
} catch(e){
    console.log(e);
    return;
}


searchCriteria.forEach(async(ele,index) => {
    let seller = "Batman";
    if(index>10&&index<20){
        seller = "Superman";
    }
    if(index>=20){
        seller = "Thor";
    }

    let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ele}&maxResults=40`);

    // console.log(Object.keys(res.data.items).length);
    // console.log(res.data.items);
if(res.data.hasOwnProperty("items")){
    res.data.items.forEach(async(element)=>{   
        count++;

        try{
             structuredData = {
                isbn:"",
                quantity: 100,
                price : {
                    amount: 30,
                    currency: "USD"
                },
                seller: seller
            };

            let info = element.volumeInfo;
            if(info.hasOwnProperty('industryIdentifiers')){
                structuredData['isbn'] = element.volumeInfo.industryIdentifiers[0];
                // console.log("Structured data:::::", structuredData);
                await axios.post(url+"book/Addbook",structuredData);
            }

        } catch(e){
             console.log(e);
        }      
           
    });

}  
});
console.log("countOfItems",count);

}







const createSellers = async()=>{ 
    
    const address = {
        "street" : "235 park drive #33",
        "pincode": 02215,
        "city": "Boston",
        "state": "MA",
        "country": "USA"
    }



    await axios.post(url+"users", {
            "username": "Batman",
            "email": "batman@gmail.com",
            "password": "Password123!",
            "userType": "SELLER",
            "address":address
        });

    await axios.post(url+"users", {
            "username": "Superman",
            "email": "superman@gmail.com",
            "password": "Password123!",
            "userType": "SELLER",
            "address": address
        });    
    
     await axios.post(url+"users", {
            "username": "Thor",
            "email": "thor@gmail.com",
            "password": "Password123!",
            "userType": "SELLER",
            "address": address
        });    

}


migrate();