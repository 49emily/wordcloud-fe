import Slider from "@mui/material/Slider";
function WordSlider(props) {
  function handleChange(event) {
    props.changeNumWords(event.target.value);
  }
  return (
    <div className="slider-area">
      <p>Number of words (filtered by highest frequency):</p>
      <Slider
        color="secondary"
        valueLabelDisplay="auto"
        defaultValue={100}
        min={0}
        max={props.max}
        onChange={handleChange}
        disabled={!props.hasFile}
        className="slider"
      />
    </div>
  );
}

export default WordSlider;
