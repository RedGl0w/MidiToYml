var Midi = require("@tonejs/midi").Midi
var fs = require("fs")
var yaml = require("yaml")
const midiData = fs.readFileSync("midi1poly.mid")
const midi = new Midi(midiData)
global.lastTick = 0;
midi.tracks.forEach((track, index) => {
    if(lastTick == 0){lastTick = track.notes[midi.tracks[index].notes.length-1].ticks}
    if(track.notes[midi.tracks[index].notes.length-1].ticks > lastTick){lastTick = track.notes[midi.tracks[index].notes.length-1].ticks}
})
midi.tracks.forEach((track, index) => {
    let yml = {}
    let notes = track.notes;
    let i = -190;
    notes.forEach((item, index) => {
        if(i >=170){i=-190;}
        yml[index] =
            [
                item.ticks / lastTick,
                i+=10,
                1
            ]
    })
    fs.writeFileSync("output"+index.toString()+".yml", yaml.stringify(yml), "utf8")
})
