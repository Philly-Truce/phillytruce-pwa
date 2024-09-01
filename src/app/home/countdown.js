export function startProgressBar(hours) {
  const startTime = Date.now();
  const HRS_TO_SERVE = hours;
  const totalTime = HRS_TO_SERVE * 60 * 60 * 1000;
  var timeServed = 0;
  var timeRemain = totalTime;
  const endTime = startTime + timeRemain;
  const timeServedBar = document.querySelector(".time-served-bar");
  const timeRemainBar = document.querySelector(".time-remain-bar");
  var timeRemainNumber = document.querySelector("#timeRemainNumber");


  function progressBar() {
    const currentTime = Date.now();
    timeServed = currentTime - startTime;
    timeRemain = endTime - currentTime;

    const servedPercentage = (timeServed / totalTime) * 100;
    const remainPercentage = (timeRemain / totalTime) * 100;

    timeServedBar.style.width = servedPercentage.toFixed(2) + "%";
    timeRemainBar.style.width = remainPercentage.toFixed(2) + "%";

    timeRemainNumber.innerHTML = (timeRemain / (60 * 60 * 1000)).toFixed(1);

    if (currentTime < endTime) {
      requestAnimationFrame(progressBar);
    }
  }

  progressBar();
}
