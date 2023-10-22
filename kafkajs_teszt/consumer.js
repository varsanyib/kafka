const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'FTSHTeszt_JSClient',
  brokers: ['localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'TesztGroup2' })

consumer.connect()
consumer.subscribe({ topic: 'TesztElekTopic', fromBeginning: false })

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  },
})