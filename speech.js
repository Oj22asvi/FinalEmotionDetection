// Speech Recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

// Initialize Sentiment.js
const sentiment = new Sentiment();

// Start recording when the user clicks the button
function startRecognition() {
  recognition.start();
}

// When speech is recognized, analyze sentiment
recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;
  console.log('Transcript:', transcript);  // Logs the transcript
  document.getElementById('output').textContent = `You said: ${transcript}`;
  analyzeSentiment(transcript);  // Send transcript for sentiment analysis
};

// Analyze sentiment using Sentiment.js
function analyzeSentiment(text) {
  const result = sentiment.analyze(text);
  console.log(result);  // Logs the sentiment score and comparison
  
  let mood = 'Neutral';
  if (result.score > 0) {
    mood = 'Positive';
  } else if (result.score < 0) {
    mood = 'Negative';
  }
  document.getElementById('mood').textContent = `Mood: ${mood}`;
}
