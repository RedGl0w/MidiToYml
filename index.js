var Midi = require("@tonejs/midi").Midi
var fs = require("fs")
var yaml = require("yaml")
const midiData = fs.readFileSync(process.argv[2])
const midi = new Midi(midiData)
global.lastTick = 0;
midi.tracks.forEach((track, index) => {
    if(lastTick == 0){lastTick = track.notes[midi.tracks[index].notes.length-1].ticks}
    if(track.notes[midi.tracks[index].notes.length-1].ticks > lastTick){lastTick = track.notes[midi.tracks[index].notes.length-1].ticks}
})
midi.tracks.forEach((track, index) => {
    let yml = {}
    let notes = track.notes;
    notes.forEach((item, index) => {
        yml[index] =
            [
                item.ticks / lastTick,
                Math.random() * 360 - 180,
                Math.random()
            ]
    })
    fs.writeFileSync("output"+index.toString()+".yml", yaml.stringify(yml), "utf8")
})
