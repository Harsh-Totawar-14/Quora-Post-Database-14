const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set(" views", path.join(__dirname, "views"));

app.use(express.static( path.join(__dirname, "Public")));

app.listen (port, () =>{
    console.log("listening to port : 8080");
});



let posts = [
    {
        id: uuidv4(),
        username : "harshtotawar",
        content : "i love coding",
    },
    {
        id: uuidv4() ,
        username : "manish",
        content : "hard word ",
    },
    {
        id: uuidv4() ,
        username : "vishal mama",
        content : "i love sleeping and eating",
    }
   
];




app.get("/posts", (req , res) =>{
    res.render("index.ejs", {posts});
});

app.get("/post/new", (req, res) =>{
    res.render("new.ejs")
});

app.post("/posts", (req, res) =>{
    let{username, content} = req.body ;
    let id = uuidv4(); 
    posts.push ({  id, username, content});
    res.redirect("/posts")
});

app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let Post = posts.find((P) => id === P.id);
    res.render("show.ejs", {Post});
  
});

app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let Post = posts.find((P) => id === P.id);
    Post.content = newContent;
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res) =>{
    let {id} = req.params;
    let Post = posts.find((P) => id === P.id);
    res.render("edit.ejs", {Post});
    
});


app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
    posts= posts.filter((P) => id !== P.id);
    res.redirect("/posts")
    
});






