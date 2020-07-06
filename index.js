const consume = require('./consumer')
const publish = require('./publisher')

const args = process.argv.slice(2)

if (args.includes('--consume')) {
    consume()
} else {
    publish()
}
