// dependency untuk melakukan aktivitas twitter
const twit = require('twit')

// const config = require('./config')

// dependency untuk mendukung emoji
var emoji = require('node-emoji')

const config = {
    consumer_key: 'VkgFk3ZmT8WMzLtpU2X8EJrzD',
    consumer_secret: 'rAhr4kNIEtMOsPY5EYD6yVOkglCuJGJqA4BS9LLHZzlSxbyWXe',
    access_token: '1244863236115034113-XCmQBYto5vlaPb0BQ6pciTb41XCd0G',
    access_token_secret: 'cTa9ncZL5h9rZa9aZUrRMMtZjplkHeevSUlBcaFgeBhBH'
}

// inisialisasi twit
var T = new twit(config)

// mendapatkan data statistik
const getStatistic = () => {
    var unirest = require("unirest");

    var req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");

    req.headers({
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "9718aca7a0msh7b2ea3d8cd38f75p127ab0jsn14d475d1afb8"
    });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        // mengambil semua data statistik
        var obj = JSON.parse(JSON.stringify(res.body))

        // array negara
        let countryArr = obj.response
        countryArr.forEach(element => {
            if (element.country == "Indonesia") {
                console.log(element)

                let title = emoji.emojify(`[Indonesia COVID19 update :clock3:]`)
                let total = emoji.emojify(`total :busts_in_silhouette:: ${element.cases.total} (${element.cases.new})`)
                let recovered = emoji.emojify(`sembuh :heavy_check_mark:: ${element.cases.recovered}`)
                let death = emoji.emojify(`meninggal :broken_heart:: ${element.deaths.total} (${element.deaths.new})`)
                
                let statistic = `${title} \n \n ${total} \n ${recovered} \n ${death} \n \n #COVID19 #Indonesia #CoronaVirusUpdates #corona`
                console.log(statistic)
                sendTweet(statistic)
            }
        });
    });
}

// melakukan autentikasi pada Twitter
T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

function onAuthenticated(err){
    if (err) {
        console.log(err)
    } else {
    console.log('Authentication successful.')
}}

var emojified = emoji.emojify(`cepatlah pulih Indonesiaku! :flag-id: \n #COVID19 #Indonesia #CoronaVirusUpdates #corona`)

function sendTweet(body){
    T.post('statuses/update', { status:body})
}

getStatistic()

// setInterval(getStatistic, 10800000);