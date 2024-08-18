export function startProgressBar() {
  const startTime = Date.now();
  const HRS_TO_SERVE = 2;
  const totalTime = HRS_TO_SERVE * 60 * 60 * 1000;
  var timeServed = 0;
  var timeRemain = totalTime;
  const endTime = startTime + timeRemain;
  const timeServedBar = document.querySelector(".time-served");
  const timeRemainBar = document.querySelector(".time-remain");

  function progressBar() {
    const currentTime = Date.now();
    timeServed = currentTime - startTime;
    timeRemain = endTime - currentTime;

    const servedPercentage = (timeServed / totalTime) * 100;
    const remainPercentage = (timeRemain / totalTime) * 100;

    timeServedBar.style.width = servedPercentage.toFixed(2) + "%";
    timeRemainBar.style.width = remainPercentage.toFixed(2) + "%";

    if (currentTime < endTime) {
      requestAnimationFrame(progressBar);
    }
  }

  progressBar();
}
