const express = require('express')

const ProjectRouter = require ('./ProjectRouter.js')
const ActionRouter = require ('./ActionRouter.js')

const server = express()

server.use('/api/projects', ProjectRouter)
server.use('/api/actions', ActionRouter)

module.exports = server