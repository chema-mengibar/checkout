
const baseUrl = 'http://motuo.info'

export default {

  getCart: async( cartId ) => {
    let req = await fetch( 
      baseUrl + '/checkout/?type=cart&cart=' + cartId,
      { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })

    let jsonResp = await req;
    return jsonResp.json()
  },

  checkPayment: async( paymentId ) => {
    let reqPayment = await fetch( 
      baseUrl + '/checkout/?type=payment&payment=' + paymentId,
      { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })

    let jsonRespPayment = await reqPayment;
    return jsonRespPayment.json()
  },

  sendOrder: async( orderData ) => {

    let reqPayment = await fetch( 
      baseUrl + '/checkout/',
      { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify( orderData ),
        cache: 'no-cache',
      })

    let jsonRespPayment = await reqPayment;
    return jsonRespPayment.json()
  }
 

}