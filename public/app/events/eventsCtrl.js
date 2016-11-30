angular.module('app.events', [])
.controller("EventsController", function(EventsFactory, $location){
  this.new = {
    name: null,
    date: null,
    tasks: []
  };
  this.eventList = [];
  this.curr = EventsFactory.currentEvent;
  this.addEvent = function() {
    EventsFactory.addNew(this.new)
    .then((res)=>{
      var newEvent = JSON.parse(JSON.stringify(this.new));
      this.eventList.push(newEvent);
      this.new.name = '';

    })
  };
  this.getEvents = function() {
    EventsFactory.getAll()
    .then((data) => {
      this.eventList = data;
    })
  };
  this.zoomIn = function(event) {
    EventsFactory.currentEvent = event;
    $location.path('/zoomin');
  };

  this.getEvents();
})