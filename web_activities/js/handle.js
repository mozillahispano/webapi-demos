/* handle an activity */
var activity;
var files = [];

var Gallery = {
  /* a simple gallery */
  init: function() {
    this.thumbnails = $('thumbnails');

    this.setGalleryUI();
    this.showImages();
  },

  setGalleryUI: function() {
    var welcome = $('gallery');
    var buttons = $('buttons');

    buttons.setAttribute('class', 'hide');
    welcome.removeAttribute('class', 'hide');
    welcome.setAttribute('class', 'show');
  },

  showImages: function() {
    var pics = navigator.getDeviceStorage("pictures");
    var cursor = pics.enumerate();

    cursor.onsuccess = function() {
      var pic = this.result;
      if (pic !== undefined) {
        var img = document.createElement('img');
        var thumbs = $('thumbnails');
        img.src = window.URL.createObjectURL(pic);
        img.height = 100;
        img.width = 75;
        img.onload = function(e) {
          window.URL.revokeObjectURL(this.src);
        };
        thumbs.appendChild(img);

        img.onclick = function(e) {
          var i = e.target.getAttribute('data-index');
          var blob = files[i];
          var picture = {type: blob.type, blob: blob};
          activity.postResult(picture);
        };

        files.push(this.result);
        this.done = false;
      } else {
        this.done = true;
        var imgs = document.getElementsByTagName('img');
        for (var i=0; i < imgs.length; i++) {
          var el = imgs[i];
          el.setAttribute('data-index', i);
        }
      }
      
      if (!this.done) {
        this.continue();
      }
    };

    cursor.onerror = function () {
      console.warn("No file found: " + this.error);
    };
  }
};

navigator.mozSetMessageHandler('activity', function(activityRequest) {
  activity = activityRequest;
  var name = activity.source.name;

  if (name === "pick") {
    // Do something to handle the activity
    Gallery.init();
  }
});
