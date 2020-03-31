let halo = '2020-03-21T22:28:30+00:00'

let reformat1 = halo.split('T')
let reformat2 = reformat1[1].split('+')
let reformat3 = reformat2[0].split(':')

let hour = parseInt(reformat3[0])+7



let hourReformat = '0' + hour

console.log(hourReformat)
reformat3[0] = hourReformat
let time = reformat3.join(':')

