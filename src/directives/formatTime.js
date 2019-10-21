const formatTime = function (time) {
  time = Math.round(time);
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return minutes + ':' + seconds;
}
export default {
  bind: function(el, binding) {
    if (_.isNull(binding.value) || _.isUndefined(binding.value)) {
      return '--:--'
    } else {
      return formatTime(binding.value)
    }
  }
}
