var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var exphbs = require("express-handlebars");
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/scrape", function (req, res) {
    axios.get("https://www.foodnetwork.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("h4.m-StoryCard__a-Headline").each(function (i, element) {
            var title = $(element).children().children().text();
            var snap = $(element).siblings().text();
            var link = $(element).children().attr("href");
            var data = {
                headline: title,
                summary: snap,
                articleUrl: link
            }
            db.Article.create(data)
            res.json(data);
        });
    });
       
});


app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
  .populate("note")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
  .then(function(dbNote) {
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
  })
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.get("/articles", function(req,res) {
    db.Article.find({})
    .then(function(dbArticle) {
        var hbs_obj = {
            arts: dbArticle
        };
        console.log(hbs_obj);
        res.render("scrape", hbs_obj);
    })
    .catch(function(err) {
        console.log(err);
    });
});




app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});