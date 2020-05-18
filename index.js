const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var db = {
    games: [
        {
            id: 1,
            title: "Call of duty MW",
            year: 2017,
            price: 78
        },
        {
            id: 2,
            title: "Forza 4",
            year: 2018,
            price: 56
        },
        {
            id: 3,
            title: "FIFA 20",
            year: 2020,
            price: 199
        },
        {
            id: 4,
            title: "Hitman",
            year: 2019,
            price: 68
        },

    ]
}

app.get("/games", (req, res) => {
    res.json(db.games);
    res.statusCode = 200;
});

app.get("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = db.games.find(g => g.id == id);

        if (game != undefined) {
            res.json(game);
            res.statusCode = 200

        } else {
            res.sendStatus(404);
        }
    }
});




app.post("/game", (req, res) => {
    var { title, price, year } = req.body;

    db.games.push({
        id: 5,
        title,
        price,
        year
    });

    res.sendStatus(200);

});

app.delete("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = db.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404)
        } else {
            db.games.splice(index, 1);
            res.sendStatus(200);
        }

    }
});


app.put("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var game = db.games.find(g => g.id == id);


        if (game != undefined) {

            var { title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }
})


app.listen(4000, () => {
    console.log("Api Rodando!!!");
})