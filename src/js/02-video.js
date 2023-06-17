import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const saveTimeThrottled = throttle(function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveTimeThrottled(currentTime);
});

window.addEventListener('DOMContentLoaded', function () {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
});
