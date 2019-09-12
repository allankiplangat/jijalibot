module.exports = function setSessionAndUser(senderID) {
  if (!sessionIds.has(senderID)) {
    sessionIds.set(senderID, uuid.v1());
  }

  if (!usersMap.has(senderID)) {
    userService.addUser(function(user) {
      usersMap.set(senderID, user);
    }, senderID);
  }
};
