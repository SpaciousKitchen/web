var express=require('express');
var router =express.Router();

var Board=require('../models/board');
const board = require('../models/board');
const Comment=require('../models/comment')

router.get('/',function(req,res,next){
    
   Board.find({}).exec()
   .then((result)=>{
    console.log(result)
    
    res.render('index',{title:"Express board", result:result});
       
   })
   .catch((err)=>{
       console.log("can't load board")
   })
})

router.get('/write',function(req,res,next){
    res.render('write',{title:'글쓰기'});
})
//insert board to mongo
router.post('/board/write',function(req,res){
    var board=new Board();
    console.log("result:"+req.body)
    board.title=req.body.title;
    board.contents=req.body.contents;
    board.author=req.body.author;
    console.log(req.body.title)

    board.save()
    .then((saveboard)=>{
        console.log("saved "+saveboard)
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err)
        res.redirect('/')
    })

})

router.get('/board/:id',function(req,res,next){
    console.log(req.params.id)
    Board.findOne({_id:req.params.id}).exec()
    .then((board)=>{
        res.render('board',{title:'Board',board:board})
    })
    .catch((err)=>{
        console.log('cant load board')
       
    })

})
router.post('/comment/write',(req,res)=>{
    var comment=new  Comment();
    
    comment.contents=req.body.comments;
    comment.author=req.body.author;
    console.log(req.body.id)
     Board.updateOne({_id:req.body.id},{$push:{comments:comment}}).exec()

     .then((result)=>{

        console.log('save Success');
        res.redirect('/board/'+req.body.id)
        //console.log(result)
        
     })
    .catch((err)=>{
        console.log('cant saved!');
     })

})
module.exports=router;