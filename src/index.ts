/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project rabbitmq
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {CreatePlugin} from "@pomegranate/plugin-tools";
import {connect} from 'amqplib'
export const Plugin = CreatePlugin('anything')
  .configuration({
    name: "RabbitMQ",
    injectableParam: "RabbitMQ",
  })
  .variables({
    host: 'amqp://localhost',
    socketOptions: {}
  })
.hooks({
  load: (PluginVariables, PluginLogger) => {
    return connect(PluginVariables.host)
      .then((connection) => {
        PluginLogger.log('Connected to RMQ')
        return connection
      })
  },
  start: () => {

  },
  stop: (RabbitMQ, PluginLogger) => {
    PluginLogger.log('Stopping RMQ')
    return RabbitMQ.close()
      .then(() => {
        PluginLogger.log('RMQ connection closed.')
        return null
      })
  }
})