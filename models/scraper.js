// var cheerio = require("cheerio");
// var axios = require("axios");

// axios.get("https://www.foodnetwork.com/").then(function(response) {
//     var $ = cheerio.load(response.data);
//     var results = [];

//     $("h4.m-StoryCard__a-Headline").each(function(i, element) {
//         var headline = $(element).children().children().text();
//         var summary = $(element).siblings().text();
//         var articleUrl = $(element).children().attr("href");

//         results.push({
//             headline: headline,
//             summary: summary,
//             articleUrl: articleUrl
//         });
//     });

//     console.log(results);
// });