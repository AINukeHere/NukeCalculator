function setPopupInfoPosition(event)
{
    var armorPopupInfo = document.getElementById("armorPopupInfo");
    var offset = 10;
    var leftValue = (event.pageX+offset).toString()+"px";
    var topValue = (event.pageY+offset).toString()+"px";
    armorPopupInfo.style.left = leftValue;
    armorPopupInfo.style.top = topValue;
}
function showNukeCalcArmorPopup(bShield)
{
    var armorPopupInfo = document.getElementById("armorPopupInfo");
    armorPopupInfo.style.display="inline";
    if(bShield)
        armorPopupInfo.children[0].innerHTML = '보호막 ' + nukeCalculator.shieldArmor;
    else
        armorPopupInfo.children[0].innerHTML = '장갑 ' + nukeCalculator.hpArmor;
}
function hideNukeCalcArmorPopup(bShield)
{
    var armorPopupInfo = document.getElementById("armorPopupInfo");
    armorPopupInfo.style.display="none";
}
function NukeCalc_LaunchNuke(){
    var res = nukeCalculator.Damage();
    var logDiv = document.getElementById("nukeCalcLog");
    logDiv.children[1].innerHTML += res + '<br>';
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_Heal(){
    nukeCalculator.Heal();  
    var logDiv = document.getElementById("nukeCalcLog");
    logDiv.children[1].innerHTML += '체력이 회복되었습니다.<br>';
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ClearLog(){
    var logDiv = document.getElementById("nukeCalcLog");
    logDiv.children[1].innerHTML = '';
}
function NukeCalc_ChangeHP(inputTag)
{
    nukeCalculator.maxHP = inputTag.value;
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeHPArmor(inputTag)
{
    nukeCalculator.hpArmor = inputTag.value;
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeShield(inputTag)
{
    nukeCalculator.maxShield = inputTag.value;
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeShieldArmor(inputTag)
{
    nukeCalculator.shieldArmor = inputTag.value;
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeCoeffScaleType(inputTag)
{
    nukeCalculator.coeffScaleType = inputTag.value;
    NukeCalc_ViewerUpdateAll();
    console.log(nukeCalculator.coeffScaleType);
}
function NukeCalc_ShowInfo()
{
    var logDiv = document.getElementById("nukeCalcLog");
    logDiv.children[1].innerHTML += nukeCalculator.GetInfo();
}
function NukeCalc_InputInitFromCalculator(){
    var divs=nukeCalcInput.getElementsByTagName("div");
    divs[0].getElementsByTagName("input")[0].value = nukeCalculator.maxHP;
    divs[1].getElementsByTagName("input")[0].value = nukeCalculator.hpArmor;
    divs[2].getElementsByTagName("input")[0].value = nukeCalculator.maxShield;
    divs[3].getElementsByTagName("input")[0].value = nukeCalculator.shieldArmor;
    divs[4].getElementsByTagName("select")[0].value = nukeCalculator.coeffScaleType;
    divs[5].getElementsByTagName("select")[0].value = nukeCalculator.coeffPosType;
}
function NukeCalc_ViewerUpdateAll()
{
    var nukeCalcInfoViewer = document.getElementById("nukeCalcInfoViewer");
    var nukeCalcArmorContainer = document.getElementById("nukeCalcArmorContainer");
    var nukeCalcShieldArmorContainer = document.getElementById("nukeCalcShieldArmorContainer");

    var targetImgTag = nukeCalcInfoViewer.getElementsByTagName("img")[0];
    var hpArmorImgTag = nukeCalcArmorContainer.getElementsByTagName("img")[0];
    var hpSpanTag = nukeCalcInfoViewer.getElementsByTagName("span")[1];
    var hpArmorSpanTag = nukeCalcArmorContainer.getElementsByTagName("span")[0];
    var shieldSpanTag = nukeCalcInfoViewer.getElementsByTagName("span")[0];
    var shieldArmorSpanTag = nukeCalcShieldArmorContainer.getElementsByTagName("span")[0];
    
    //유닛크기
    var srcName = "data/";
    switch(nukeCalculator.coeffScaleType){
        case '소형':
            srcName += "small_target";
            hpArmorImgTag.src = 'data/Armor.png'
            break;
        case '중형':
            srcName += "middle_target";
            hpArmorImgTag.src = 'data/Armor2.png'
            break;
        case '대형':
            srcName += "large_target";
            hpArmorImgTag.src = 'data/Armor.png'
            break;
    }
    if(nukeCalculator.curShield > 0)
        srcName += "_with_shield";
    targetImgTag.src = srcName + ".png";

    //체력
    hpSpanTag.innerHTML = nukeCalculator.curHP + '/' + nukeCalculator.maxHP;
    //체력 방어력
    hpArmorSpanTag.innerHTML = nukeCalculator.hpArmor;
    //쉴드
    shieldSpanTag.innerHTML = nukeCalculator.curShield + '/' + nukeCalculator.maxShield;
    //쉴드 방어력
    shieldArmorSpanTag.innerHTML = nukeCalculator.shieldArmor;
}
function NukeCalc_Export(){
    
}
function NukeCalc_Import(){
    
}