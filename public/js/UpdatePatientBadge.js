
function submitCheck(){
  var bgl = document.getElementById("patientdata_bgl").value
  var weight = document.getElementById("patientdata_weight").value
  var insulin = document.getElementById("patientdata_insulin").value
  var exercise = document.getElementById("patientdata_exercise").value
  var isAllComplete = true
  isAllComplete = isAllComplete && isNumeric(bgl)
  isAllComplete = isAllComplete && isNumeric(weight)
  isAllComplete = isAllComplete && isNumeric(insulin)
  isAllComplete = isAllComplete && isNumeric(exercise)
  document.getElementById("bgl").checked = isNumeric(bgl)
  document.getElementById("weight").checked = isNumeric(weight)
  document.getElementById("exercise").checked = isNumeric(exercise)
  document.getElementById("insulin").checked = isNumeric(insulin)
  if(isAllComplete)
  {
  //  document.getElementById("badge").style.display = "block"
  } else {
 //   document.getElementById("badge").style.display = "none"
  }
}
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
submitCheck()

