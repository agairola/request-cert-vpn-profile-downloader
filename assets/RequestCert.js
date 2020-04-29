// handle form submit
$('form').on('submit', (event) => {
    event.preventDefault();  
    let PCA_ARN = $("#PCA_ARN").val(), Username = $("#Username").val(), CommonName = $("#CommonName").val();
    const payload = { 'clientDomainName': CommonName, 'cvpnUser': Username, 'requestedsubca': PCA_ARN };
    grade(payload);
  });
  
  // ajax request
  function grade(payload) {
    $.ajax({
      method: 'POST',
      // url: 'https://68p50vw2v9.execute-api.ap-southeast-2.amazonaws.com/v1',
      // url: 'https://mvwrtxyuph.execute-api.ap-southeast-2.amazonaws.com',
      url: 'https://tq4vw5c0tc.execute-api.ap-southeast-2.amazonaws.com/v1/pca/requestcert',
      dataType: 'text',
      contentType: 'application/x-www-form-urlencoded',
      data: JSON.stringify(payload)
    })
    .done((res) => {
  
        let message = 'Incorrect. Please try again.';
        json = JSON.parse(res);
        if (json) {
            message = 'Success!' + ' Certificate ARN is: ' + json.certarn;
        }
        $('.answer').html(message);
        console.log(res);
        console.log(message);
    })
    .catch((err) => {
      $('.answer').html('Something went terribly wrong!');
      console.log(err);
    });
  }
  