// handle form submit
$('form').on('submit', (event) => {
    event.preventDefault();  
    let Username = $("#Username").val(), Passphrase = $("#Passphrase").val(), ClientVPNTag = $("#ClientVPNTag").val(), S3Bucket = $("#S3Bucket").val();
    const payload = { 'CertTag': Username, 'PassPhrase': Passphrase, 'cVPNTag': ClientVPNTag, 'TempS3': S3Bucket };
    grade(payload);
  });
  
  // ajax request
  function grade(payload) {
    $.ajax({
      method: 'POST',
      // url: 'https://68p50vw2v9.execute-api.ap-southeast-2.amazonaws.com/v1',
      // url: 'https://mvwrtxyuph.execute-api.ap-southeast-2.amazonaws.com',
      url: 'https://tq4vw5c0tc.execute-api.ap-southeast-2.amazonaws.com/v1/cvpn/getclientprofile',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      data: JSON.stringify(payload)
    })
    .done((res) => {
  
        let message = 'Incorrect. Please try again.';
        json = JSON.parse(JSON.stringify(res));
        if (json) {
            
            message = 'Success!';
         
        }
        $('.answer').html(message);
        $('.answer').each(function(){
          $(this).append('&nbsp;<a href="foo.html" id="s3link">S3 Download Link</a>')
          }
        );
        $("#s3link").attr("href", json.s3link);
        console.log(res);
        console.log(message);
    })
    .catch((err) => {
      $('.answer').html('Something went terribly wrong!');
      console.log(err);
    });
  }
  