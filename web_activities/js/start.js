// starting an activity
function $(id) { return document.getElementById(id); }

function pickImage() {
  var a = new MozActivity({
    name: "pick",
    // define activity data
    data: {
      type: ["image/jpeg", "image/png", "image/*"] // data options list
    }
  });

  a.onsuccess = function() {
    var picture = this.result;
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(picture.blob);
    img.height = 400;
    img.width = 300;
    img.onload = function(e) {
      window.URL.revokeObjectURL(this.src);
    };
    var wrapper = document.getElementById('image-wrapper');
    wrapper.appendChild(img);
    console.log("A picture has been retrieved");
    // hide gallery if is open
    var welcome = $('gallery');
    var buttons = $('buttons');

    if (buttons.hasAttribute('class', 'hide')) {
      welcome.removeAttribute('class', 'show');
      welcome.setAttribute('class', 'hide');
      buttons.removeAttribute('class', 'hide');
      buttons.setAttribute('class', 'show');
    }
  };

  a.onerror = function() {
    console.log('some error ocurred');
    console.log(this.error);
  };
}

var pickBtn = document.querySelector('#pick-btn');

pickBtn.addEventListener('click', pickImage, false);
pickBtn.addEventListener('touch', pickImage, false);

function sendSMS() {
  var a = new MozActivity({
    name: "new",
    data: {
      type: "websms/sms",
      number: "+51930503649"
    }
  });

  a.onsuccess = function() {
    var sms = this.result;
    console.log("A sms has been sended");
  };

  a.onerror = function() {
    console.log(this.error);
  };
}

var smsBtn = document.querySelector('#sms-btn');

smsBtn.addEventListener('click', sendSMS, false);
smsBtn.addEventListener('touch', sendSMS, false);
