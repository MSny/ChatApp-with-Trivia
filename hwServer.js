var net = require('net');
var port = 3000
var cowsay = require('/usr/local/lib/node_modules/cowsay/');

var Hint = function(name, hint1, hint2, hint3, hint4) {
	this.name = name.toLowerCase();
	this.hint1 = hint1.toLowerCase();
	this.hint2 = hint2.toLowerCase();
	this.hint3 = hint3.toLowerCase();
	this.hint4 = hint4.toLowerCase();
}

var messageLog = [];
var joinedLog = messageLog.join("");

var obama = new Hint("obama", "has done drugs", "born in america's newest state", "nobel peace prize winner", "ordered a basketball court built");
var clinton = new Hint("clinton", "plays a musical instrument", "faced impeachment", "famous wife", "known for his southern charm");
var nixon = new Hint("nixon", "was known to be tricky", "presided over a war", "sucessfully impeached", "president in the year 3004");
var jackson = new Hint("jackson", "shot in the chest in a duel", "was against the federal bank", "known for his kitchen cabinet", "is on the 20 dollar bill")
var roosevelt = new Hint("roosevelt", "started his own political party", "known for his mountainering", "was played by robin williams", "was shot during a speech, and kept speaking");
var randomizer = Math.floor(Math.random()* 5)
var presidentialArray = [obama, clinton, nixon, jackson, roosevelt];
var randomPresident = (presidentialArray[randomizer]);
var count = 0;

var server = net.createServer(function(socket) {
  console.log('client connected');


  socket.write("welcome, the message history is " + messageLog.join(" \n").toString());
  //console.log(randomPresident);
  //var counter = 0;
  socket.on('data', function(data) {
    console.log(data.toString().trim());
    messageLog.push(data.toString().trim());
    socket.write(data.toString().trim());
    console.log(randomPresident);

    // cows playing presidential trivia
      if (data.toString().trim() === "more cowbell" ) {
        count ++;
       socket.write(cowsay.say({
    text : "Welcome to guess that president! can you guess which U.S president " + randomPresident.hint1 ,

}));
     } 
     else if (data.toString().trim() === "more" && count === 1) {
      count ++;
socket.write(cowsay.say({
    text : "Hint 2: " + randomPresident.hint2 ,

}));
     } 
     else if (data.toString().trim() === "more" && count === 2) {
      count ++;
socket.write(cowsay.say({
    text : "Hint 3: " + randomPresident.hint3 ,

}));
     } 
     else if (data.toString().trim() === "more" && count === 3) {
      count ++;
socket.write(cowsay.say({
    text : "Hint 4: " + randomPresident.hint4 ,

}));
     } 
     else if (data.toString().trim() === "more" && count === 4) {
      
socket.write(cowsay.say({
    text : "I'm sorry I don't have any more clues, try guessing" ,

}));
     } 
     else if (data.toString().trim() === randomPresident.name ) {
      
socket.write(cowsay.say({
    text : "You've guessed right! (╯°□°）╯︵ ┻━┻" ,

}));
     } 

    

  socket.on('end', function() {
    console.log('client disconnected');
  });
});
  });

server.listen(port, function() { //'listening' listener
  console.log('listening on port ' + port );
});

