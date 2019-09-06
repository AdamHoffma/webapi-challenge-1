const express = require('express')

const ProjectRouter = require ('./ProjectRouter.js')
const ActionRouter = require ('./ActionRouter.js')

const server = express()

server.use('/api', ProjectRouter)
server.use('/api', ActionRouter)

module.exports = server