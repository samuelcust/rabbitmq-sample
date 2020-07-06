const amqplib = require('amqplib')

const queue = 'tasks'

let connection

const publish = async () => {
    try {
        connection = await amqplib.connect('amqp://localhost')
        const channel = await connection.createChannel()

        const queueStatusOk = await channel.assertQueue(queue)
        console.log('Queue Status Ok: ', queueStatusOk)

        return channel.sendToQueue(queue, Buffer.from('something to do'))
    } catch (error) {
        console.warn(error)
    } finally {
        connection.close()
        process.exit(0)
    }
}

module.exports = publish
