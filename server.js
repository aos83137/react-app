const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers', (req,res)=>{
    res.send([{
            "id": 1,
            "image": "https://placeimg.com/64/64/1",
            "name": "전용석",
            "birthday": "951211",
            "gender": "남자",
            "job": "엔지니어"
        },
        {
            "id": 2,
            "image": "https://placeimg.com/64/64/2",
            "name": "유메농",
            "birthday": "950328",
            "gender": "여자",
            "job": "학생"
        },
        {
            "id": 3,
            "image": "https://placeimg.com/64/64/3",
            "name": "코지마",
            "birthday": "950222",
            "gender": "여자",
            "job": "백수"
        }
    ]);
});


app.listen(port, ()=> console.log(`Listening on port ${port}`));
