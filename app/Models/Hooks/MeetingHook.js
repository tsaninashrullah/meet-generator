'use strict'

const uuidv4 = require("uuid/v4");

const MeetingHook = exports = module.exports = {}

MeetingHook.method = async (modelInstance) => {
}

MeetingHook.uuid = async meeting => {
  meeting.id = uuidv4();
};