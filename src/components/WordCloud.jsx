import { useEffect } from "react";

function WordCloud(props) {
  function pickColor() {
    let newColors = [...colors];
    newColors.splice(newColors.indexOf(prevColor), 1);
    let newColor = newColors[Math.floor(Math.random() * newColors.length)];
    prevColor = newColor;
    return newColor;
  }
  function shuffleArray(arr) {
    // Knuth shuffle to randomize array
    let cur = arr.length; // starts at end of erray
    let index;

    while (cur !== 0) {
      index = Math.floor(Math.random() * cur); // pick random index
      cur--;

      // swap with cur
      [arr[cur], arr[index]] = [arr[index], arr[cur]];
    }

    return arr;
  }
  const punctuationless = props.text
    .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, "")
    .replace(/(\r\n|\n|\r)/gm, " ");

  // const punctuationless = props.text.replace(
  //   /[.,-/#!$%^&*;:{}=\-_`~()@+?><[]+]/g,
  //   ""
  // );
  const invalidWords = ["a", "an", "the", ""];
  const minFont = 1; //em
  const maxFont = 11;
  const colors = ["#2C3639", "#85586F", "#A27B5C", "#EDECE8", "#E3CAA5", "#B25068"];
  let prevColor = colors[0];
  // console.log("Generating Word Cloud...");
  // console.log(punctuationless);
  const words = punctuationless.split(" ");
  // console.log(words);
  const map = new Map();

  words.forEach((word) => {
    word = word.toLowerCase();
    if (!map.has(word)) {
      if (!invalidWords.includes(word)) {
        map.set(word, 1);
      }
    } else {
      map.set(word, map.get(word) + 1);
    }
  });

  // console.log(map);

  const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  // console.log(sortedMap);
  const keys = sortedMap.keys();
  const keysArr = [...keys];
  useEffect(() => {
    props.updateLimits(keysArr.length);
  }); // so that slider is < 100 if number of words is < 100
  // console.log(keysArr.length);
  const maxFreq = map.get(keysArr[0]);
  const minFreq = map.get(keysArr[props.max - 1]);

  return (
    <div className="wordcloud">
      {shuffleArray(keysArr.slice(0, props.numWords)).map((key) => {
        const fontSize =
          maxFont + ((maxFont - minFont) / (maxFreq - minFreq)) * (map.get(key) - maxFreq);
        return (
          <span
            key={key}
            className="rotated"
            style={{
              fontSize: fontSize + "em",
              color: pickColor(),
            }}
          >
            {" "}
            {key}{" "}
          </span>
        );
      })}
    </div>
  );
}

export default WordCloud;
