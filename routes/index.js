var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article");
var axios = require("axios");

// Get Homepage
router.get("/", function(req, res) {
  res.render("start");
});

// Scrape from Source
router.get("/scrape", function(req, res) {
  axios.get("http://bids.lja.com/").then(function(response) {
    // IF an error happens then exit out while displaying error
    console.log("Scrapping started");
    // if (error) return res.send(error);
    // console.log(response);

    var scraped = [];

    var $ = cheerio.load(response.data);

    $(".srl_results_entry div b").each(function(i, element) {
      console.log(element);
      // var result = {};

      // result.title = $(this)
      //   .children("h2")
      //   .text();
      // result.link = $(this)
      //   .children("h2")
      //   .children("a")
      //   .attr("href");
      // result.excerpt = $(this)
      //   .children("p.excerpt")
      //   .text();
      // result.image = $(this)
      //   .children("span")
      //   .children("a.thumb")
      //   .children("img")
      //   .data("src");

      // if (result.link) {
      // scraped.push(result);
      // }
    });

    res.locals.scrapeCount = scraped.length;

    res.render("scrape", { scraped: scraped });
  });
});

module.exports = router;
