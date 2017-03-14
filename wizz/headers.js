const headers = new Headers();
headers.append("accept", "application/json");
headers.append("accept-encoding", "gzip, deflate, br");
headers.append("accept-language", "ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,uk;q=0.2");
headers.append("cache-control", "no-cache");
headers.append("content-length", "210");
headers.append("content-type", "application/json");
headers.append("origin", "https://wizzair.com");
headers.append("pragma", "no-cache");
headers.append("referer", "https://wizzair.com/en-gb/information-and-services/destinations/timetable");

module.exports = headers;
