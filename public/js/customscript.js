function editrecord(id)
{
  alert(id);
  var data=
  { 'name':$('#name').val(),
    'email':$('#email').val(),
    'address':$('#address').val(),
    'dob':$('#dob').val(),
    'country':$("#country").val()
   }
  var url="/updaterecord/"+id;
        $.ajax({
           type:'put',
                url:url,
                data:data,
                before:function()
                {
                //  alert("before");
                },
                success:function(res)
                {
                  if(res.status==1)
                  location.reload();
                }
           });
}
function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}
function getrecordonmodel(id,name,email,address,dob,country)
{  //$("#country option:contains('America')").attr('selected', true);
  //  var date = dateFormat(new Date("Thu Oct 14 2010 00:00:00 GMT 0530 (India Standard Time)", 'dd/mm/yyyy'));
var dob=convert(dob);
  //alert(id+' '+name+' '+email+' '+address+' '+dob+' '+country);
  $('#name').val(name);
  $('#email').val(email);
  $('#address').val(address);
  $('#dob').val(dob);
  $("#country").val(country).change();
  $('#updatebtn').val(id);
}
