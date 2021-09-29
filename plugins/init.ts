import { fetchInstance, instance } from '~/utils/instance'

fetchInstance().then(() => {
  localStorage.setItem('bev', instance.version);
  // 他のところで処理してもいいかも
  localStorage.setItem('fev', 'unknown');
});
