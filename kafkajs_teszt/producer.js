const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'FTSHTeszt_JS',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner});

const runProducer = async () => {
  await producer.connect();

  await producer.send({
    topic: 'TesztElekTopic',
    messages: [
      { value: 'Elso kikuldott uzenet' },
      { value: 'Masodik kikuldott uzenet' },
    ],
  });

  console.log('Üzenetek sikeresen elküldve!');

  await producer.disconnect();
};

runProducer().catch(console.error);