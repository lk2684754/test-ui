let animation = new explosion.default('container', {
  surface: '5E6262',
  inside: '00B8C4',
  background: 'transparent',
});
animation.scene.rotation.x = Math.PI / 2 + 0.5;
animation.scene.rotation.y = Math.PI * 3 / 2;
animation.scene.rotation.z = Math.PI / 2;

window.onload = function () {
  setTimeout(function () {
    bool();
  }, 5000);
};

function bool() {
  let aa = new TimelineMax();
  aa.to(
    animation.settings,
    40,
    {
      progress: 0.5,
      ease: Expo.easeOut,
    },
    0,
  );
  setTimeout(function () {
    aa.pause();
    setTimeout(() => {
      aa.play();
      aa.to(
        animation.settings,
        10,
        {
          progress: 0,
          ease: Quart.easeInOut,
        },
        0.5,
      ).call(
        function () {
          setTimeout(function () {
            bool();
          }, 10000);
        },
        null,
        null,
        4.4,
      );
    }, 5000);
  }, 4000);
}
