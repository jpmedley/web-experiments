

self.addEventListener('push', function(event) {
  console.log('Push message received: ', event);
  event.waitUntil(
  	fetch('data.json')
  	  .then(function(response) {
  	  	response.json().then(function(data){
  	  		console.log(data.message);
			var title = 'Yay a message.';
			self.registration.showNotification(title, {
				body: data.message,
				icon: 'images/icon.png'
			})
  	  	})
      })
  );
});