var Message = module.exports = function(buffer) {
  this.timestamp = buffer.readInt32BE(0) + '' + buffer.readInt32BE(4)
  this.attempts = buffer.readInt16BE(8)
  this.id = buffer.toString('ascii', 10, 26)
  this.data = buffer.slice(26)
  this.client = null
}

//sets the client to use for communcation
Message.prototype.setClient = function(client) {
  this.client = client
}

Message.prototype.finish = function() {
  this.client.finish(this)
}

Message.prototype.requeue = function() {
  this.client.requeue(this)
}

Message.prototype.touch = function() {
  this.client.touch(this)
}

Message.prototype.json = function() {
  return JSON.parse(this.data.toString('utf8'))
}