export default {
  sendOrder: async(opts) => {
    fetch('/checkout', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log( 'responseerror', data.html_url);
    });
  }

}