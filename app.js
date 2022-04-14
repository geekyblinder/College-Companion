const express=require('express');
const { render } = require('express/lib/response');
const mongoose=require('mongoose');
const Paper = require('./model/paper');
const app=express();

const dbURI='mongodb+srv://kartikeymishra:manutd22%40@hackoverflow.87onp.mongodb.net/hackoverflow?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>app.listen('3000'))
.catch((err)=>console.log(err));

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/add-resource',(req,res)=>{
    const paper=new Paper({
        title:'Test Case',
        desc:'Lorem Ipsum',
        link:'21832gebuwbdjsa'
    });
    paper.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
    console.log(err);
});
app.get('all-resource',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);

    })
    .catch((err)=>{
        console.log(err);
    });
})
})


app.get('/',(req,res)=>{
    res.render('home',{title:'Home'});
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
})
app.get('/resources',(req,res)=>{
    Paper.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'Resources',papers:result});

    })
    .catch((err)=>{
        console.log(err);
    });


})
app.post('/resources',(req,res)=>{
   const paper=new Paper(req.body);
   paper.save()
   .then((result)=>{
    res.redirect('/resources');

})
.catch((err)=>{
    console.log(err);
});

})
// app.get('/resources/:id',(req,res)=>{
//     const id=req.params.id;
//     Paper.findById(id)
//     .then(result=>{
//         render('details',{paper:result,title:'Resource'});
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
    
// })
app.get('/resources/upload',(req,res)=>{
     res.render('upload',{title:'Upload'});
})

app.use((req,res)=>{
    res.status(404).render('404',{title:'Error 404'});
})