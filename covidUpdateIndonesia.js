// dependency untuk melakukan aktivitas twitter
const twit = require('twit')

const config = require('./config')

// dependency untuk mendukung emoji
var emoji = require('node-emoji')

// inisialisasi twit
var T = new twit(config)

// mendapatkan data statistik
const getStatistic = () => {
    var unirest = require("unirest");

    var req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");

    req.headers({
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": config.rapid_api_key
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

                // format date
                let reformat1 = element.time.split('T')
                let reformat2 = reformat1[1].split('+')
                let reformat3 = reformat2[0].split(':')
                let hour = parseInt(reformat3[0])+7
                reformat3[0] = hour % 24
                if (reformat3[0] < 10) reformat3[0] = '0' + reformat3[0]              
                let time = reformat3.join(':')

                let title = emoji.emojify(`[Indonesia COVID19 update]`)
                let total = emoji.emojify(`positif :busts_in_silhouette:: ${element.cases.total} (${element.cases.new})`)
                let recovered = emoji.emojify(`sembuh :heavy_check_mark:: ${element.cases.recovered}`)
                let death = emoji.emojify(`meninggal :broken_heart:: ${element.deaths.total} (${element.deaths.new})`)
                
                let statistic = `${title} \n ${time} \n \n ${total} \n ${recovered} \n ${death} \n \n #COVID19 #Indonesia #CoronaVirusUpdates #corona`
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

setInterval(getStatistic, 28800000);