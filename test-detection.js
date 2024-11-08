document.getElementById('analyze-btn').addEventListener('click', analyzeMood);

function analyzeMood() {
  const diaryEntry = document.getElementById('diary-entry').value;
  if (!diaryEntry) {
    alert('Please write something in the diary.');
    return;
  }

  const doc = nlp(diaryEntry);
  const positiveWords = ['happy', 'good', 'love', 'joy', 'great', 'amazing', 'excited', 'awesome'];
  const negativeWords = ['sad', 'angry', 'hate', 'awful', 'bad', 'terrible', 'upset', 'miserable'];

  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach(word => {
    if (doc.has(word)) {
      positiveCount++;
    }
  });

  negativeWords.forEach(word => {
    if (doc.has(word)) {
      negativeCount++;
    }
  });

  let mood = 'Neutral';
  if (positiveCount > negativeCount) {
    mood = 'Positive';
  } else if (negativeCount > positiveCount) {
    mood = 'Negative';
  }

  document.getElementById('mood').textContent = mood;

  const timestamp = new Date().toLocaleString();
  const log = document.getElementById('journal-log');
  const listItem = document.createElement('li');
  listItem.textContent = `${timestamp}: ${mood} - "${diaryEntry}"`;
  log.appendChild(listItem);

  document.getElementById('diary-entry').value = '';
}



  

