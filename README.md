# Kafka használata

### Szerver telepítése
- Letöltés a hivatalos oldalról: https://kafka.apache.org/downloads
- Logolás beállítása
    - config/server.properties -> log.dirs helyes útvonal beállítása
    - config/zookeeper.properties -> dataDir helyes útvonal beállítása
    - maxClientCnxns -> Csatlakozási szám IP-ként megadása

### Szerver futtatása (Windows környezetben)
- Parancssorban a kafka főkönyvtárából kell kiindulni!
- Zookeeper indítása a beállított adatokkal:
```.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties```
- Szerver indítása a beállított adatokkal:
```.\bin\windows\kafka-server-start.bat .\config\server.properties```
- Topic létrehozása:
```.\bin\windows\kafka-topics.bat --create --bootstrap-server localhost:9092 --topic [megnevezés]```
- Producer konzol indítása (TX):
```.\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic [topic megnevezése]```
- Consumer konzol indítása (RX):
```.\bin\windows\kafka-console-consumer.bat --topic [topic megnevezése] --bootstrap-server localhost:9092```
    - Amennyiben a fogadó csatlakozásakor az előző üzeneteket is szeretnénk elolvasni a topicban, ahhoz a `--from-beginning` kapcsolót kell hozzátenni!

### KafkaJS Teszt használata
- Üzenetek fogadására szolgáló js fájl indítása:
```node consumer.js``` vagy ```npm run rx```
- Üzenetek küldésére szolgáló js fájl indítása (azonnal kiküldi a kijelölt topicba az üzenetet):
```node producer.js``` vagy ```npm run tx```

### KafkaJS WebAPI használata
- WebAPI indítása:
```node app.js``` vagy ```npm run start```
- POST method értékei: topic és message
![kafkateszt](https://github.com/varsanyib/kafka/assets/109478771/b345f875-0a3f-4918-93c9-9441ba9f159a)
