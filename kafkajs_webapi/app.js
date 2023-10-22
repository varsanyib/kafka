const express = require('express');
const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

const kafka = new Kafka({
  clientId: 'FTSH_KAFKAWEBAPI',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/send', async (req, res) => {
  try {
    const message = req.body.message;
    const topic = req.body.topic;
    console.log(req.body);
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    await producer.disconnect();

    res.json({ message: 'Kafka üzenet sikeresen elküldve' });
  } catch (error) {
    console.error('Hiba az üzenet küldése során:', error);
    res.status(500).json({ error: 'Hiba a Kafka üzenet küldése során' });
  }
});

app.listen(port, () => {
  console.log(`Web: http://localhost:${port}`);
});