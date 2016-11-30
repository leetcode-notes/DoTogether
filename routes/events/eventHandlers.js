
var Event = require('./EventModel.js');
  
module.exports = {
  addNewEvent: function(req, res){
    var newEvent = new Event(req.body);
    newEvent.save((err, event) => {
      if (err) return console.error(err);
      res.send(event);
    });
  },
  getAllEvents: function(req, res){
    Event.find((err, events) => {
      if (err) return console.error(err);
      res.send(events);
    })
  },
  addTaskToEvent: function(req, res) {
    var event = req.body.event;
    var task = {claimedBy: null, done: false, todo: req.body.task};
    event.tasks.push(task);
    console.log("TASKS", event.tasks)
    Event.findOneAndUpdate({_id: event._id}, {tasks: event.tasks}).exec()
    .then((data) =>{
      //console.log("Response from db", data);
      res.send(event.tasks);
    })
    .catch((err) =>{
      console.error(err);
    });
  }
}