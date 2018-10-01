function calculate() {
  var
    age = $('select#age option:selected').val(),
    smoking = $('select#smoking option:selected').val(),
    infections = $('select#infections option:selected').val(),
    asthma = $('input[name=asthma]:checked').val(),
    salbutamol = $('input[name=salbutamol]:checked').val();
  
  console.log($('input[name=asthma]:checked').val());
  
  if (age.length === 0 || 
     smoking.length === 0 ||
     infections.length === 0 ||
     asthma === undefined ||
     salbutamol === undefined) { // All values not set, do not calculate risk.
    $('div#low-risk').addClass('d-none');
    $('div#low-risk').removeClass('d-flex');
    $('div#at-risk').addClass('d-none');
    $('div#at-risk').removeClass('d-flex');
    console.log("Missing values");
  } else {
    var
      ageRisk = (age === "below" ? 0 : 1),
      smokingRisk = (smoking === "former" ? 1.55 : 
                     (smoking === "current" ? 2.46 : 0.89)
                     ),
      infectionsRisk = (infections === "one" ? 0.94 : (infections === "two" ? 1.46 : 0)),
      asthmaRisk = (asthma === "yes" ? 0.75 : 0),
      salbutamolRisk = (salbutamol === "yes" ? 1.93 : 0);
    
    var risk = ageRisk * (smokingRisk + infectionsRisk + asthmaRisk + salbutamolRisk);
        
    if (risk >= 2.5) {
      $('div#low-risk').removeClass('d-flex');
      $('div#low-risk').addClass('d-none');
      $('div#at-risk').removeClass('d-none');
      $('div#at-risk').addClass('d-flex');
    } else {
      $('div#at-risk').removeClass('d-flex');
      $('div#at-risk').addClass('d-none');
      $('div#low-risk').removeClass('d-none');
      $('div#low-risk').addClass('d-flex');
    }
  }
}

$(document).ready(function() {
  $('select').change(calculate);
  $('input').change(calculate);
});
