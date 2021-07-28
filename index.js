var mouseX, mouseY;

function setPopupInfoPosition(event)
{
    var armorPopupInfo = document.getElementById("armorPopupInfo");
    var offset = 10;
    mouseX = event.pageX;
    mouseY = event.pageY;
    var leftValue = (mouseX+offset).toString()+"px";
    var topValue = (mouseY+offset).toString()+"px";
    armorPopupInfo.style.left = leftValue;
    armorPopupInfo.style.top = topValue;

    // console.log(event.pageX, event.pageY);

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
function NukeCalc_LaunchNuke(bIncludeDetail=false){
    var bIncludeDetail = document.getElementById("nukeCalcIncludeExplainCheckBox").children[0].checked;
    var res = nukeCalculator.Damage(bIncludeDetail);
    var logTextarea = document.getElementById("nukeCalcLog").children[1];
    logTextarea.value += res + '\n';
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_Heal(){
    nukeCalculator.Heal();  
    var logTextarea = document.getElementById("nukeCalcLog").children[1];
    logTextarea.value += '체력이 회복되었습니다.\n';
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ClearLog(){
    var logTextarea = document.getElementById("nukeCalcLog").children[1];
    logTextarea.value = '';
}
function NukeCalc_ChangeHP(inputTag)
{
    nukeCalculator.maxHP = parseInt(inputTag.value);
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeHPArmor(inputTag)
{
    nukeCalculator.hpArmor = parseInt(inputTag.value);
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeShield(inputTag)
{
    nukeCalculator.maxShield = parseInt(inputTag.value);
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeShieldArmor(inputTag)
{
    nukeCalculator.shieldArmor = parseInt(inputTag.value);
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeCoeffScaleType(inputTag)
{
    nukeCalculator.coeffScaleType = inputTag.value;
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeCoeffPosType(inputTag){
    nukeCalculator.coeffPosType = inputTag.value;
    NukeCalc_ViewerUpdateAll();
    var targetDivTag = document.getElementById("nukeCalcTarget");
    switch(nukeCalculator.coeffPosType)
    {
        case '직격':
            targetDivTag.style.left = "240px";
            break;
        case '빗맞음':
            targetDivTag.style.left = "520px";
            break;
        case '맞았나':
            targetDivTag.style.left = "633px";
            break;
    }
}
function NukeCalc_ShowInfo()
{
    var logTextarea = document.getElementById("nukeCalcLog").children[1];
    logTextarea.value += nukeCalculator.GetInfo();
}
//nukeCalculator의 멤버변수 => 입력창들에 업데이트
function NukeCalc_InputInitFromCalculator(){
    var divs=nukeCalcInput.getElementsByTagName("div");
    divs[0].getElementsByTagName("input")[0].value = nukeCalculator.maxHP;
    divs[1].getElementsByTagName("input")[0].value = nukeCalculator.hpArmor;
    divs[2].getElementsByTagName("input")[0].value = nukeCalculator.maxShield;
    divs[3].getElementsByTagName("input")[0].value = nukeCalculator.shieldArmor;
    divs[4].getElementsByTagName("select")[0].value = nukeCalculator.coeffScaleType;
    divs[5].getElementsByTagName("select")[0].value = nukeCalculator.coeffPosType;
}
//nukeCalculator의 멤버변수들로 가시화 업데이트
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
    if (nukeCalculator.curHP < nukeCalculator.maxHP*0.34)
        hpSpanTag.className= 'hpColorRed';
    else if (nukeCalculator.curHP < nukeCalculator.maxHP*0.67)
        hpSpanTag.className= 'hpColorYellow';
    else
        hpSpanTag.className= 'hpColorGreen';
    //체력 방어력
    hpArmorSpanTag.innerHTML = nukeCalculator.hpArmor;
    //쉴드
    shieldSpanTag.innerHTML = nukeCalculator.curShield + '/' + nukeCalculator.maxShield;
    //쉴드 방어력
    shieldArmorSpanTag.innerHTML = nukeCalculator.shieldArmor;
}
function setPositionAtMousePointer()
{
    var targetDivTag = document.getElementById("nukeCalcTarget");
    var leftValue = (mouseX-10 - targetDivTag.clientWidth/2);
    if (leftValue < 10)
        leftValue = 10;
    else if(leftValue >= 750)
        leftValue = 749;
    targetDivTag.style.left = leftValue.toString() + "px";
    if (leftValue < 456){
        nukeCalculator.coeffPosType = "직격";
        NukeCalc_InputInitFromCalculator();
    }
    else if(leftValue < 578){
        nukeCalculator.coeffPosType = "빗맞음";
        NukeCalc_InputInitFromCalculator();
    }
    else{
        nukeCalculator.coeffPosType = "맞았나";
        NukeCalc_InputInitFromCalculator();
    }
}
function NukeCalc_Export(){
    var nukeCalcInfoText = document.getElementById("nukeCalcInfoText");
    nukeCalcInfoText.children[0].value = nukeCalculator.Save();
}
function NukeCalc_Import(){
    var nukeCalcInfoText = document.getElementById("nukeCalcInfoText");
    try{
        nukeCalculator.Load(nukeCalcInfoText.children[0].value);
    }
    catch{
        var logTextarea = document.getElementById("nukeCalcLog").children[1];
        logTextarea.value += "불러오기에 실패했습니다.\n";
    }
    finally{
        NukeCalc_ViewerUpdateAll();
    }
}