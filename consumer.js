const amqplib = require('amqplib')

const queue = 'tasks'

let connection

const consume = async () => {
    try {
        connection = await amqplib.connect('amqp://localhost')
        const channel = await connection.createChannel()

        const queueStatusOk = await channel.assertQueue(queue)
        console.log('Queue Status Ok: ', queueStatusOk)

        const consumeReplies = await channel.consume(queue, message => {
            if (message !== null) {
                console.log('Message: ', message.content.toString())
                channel.ack(msg)
            }
        })

        console.log('Replies: ', consumeReplies)

        return consumeReplies
    } catch (error) {
        console.warn(error)
    } finally {
        connection.close()
        process.exit(0)
    }
}

module.exports = consume
