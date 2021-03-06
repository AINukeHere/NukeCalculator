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
    NukeCalc_Log(res + '\n');
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_Heal(){
    nukeCalculator.Heal();
    NukeCalc_Log('체력이 회복되었습니다.\n');
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ClearLog(){
    var logTextarea = document.getElementById("nukeCalcLog").children[1];
    logTextarea.value = '';
}
function NukeCalc_ChangeHP(inputTag)
{
    var val = parseInt(inputTag.value);
    if(val < 1)
    {
        inputTag.value = val = 1;
        NukeCalc_Log("※주의※ 체력은 1보다 작을 수 없습니다.\n");
    }
    else if(8688607 < val){
        inputTag.value = val = 8688607;
        NukeCalc_Log("※주의※ 체력은 8688607보다 클 수 없습니다.\n");
    }
    nukeCalculator.maxHP = parseInt(val);
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeHPArmor(inputTag)
{
    var val = parseInt(inputTag.value);
    if(val < 0)
    {
        inputTag.value = val = 0;
        NukeCalc_Log("※주의※ 체력방어력은 0보다 작을 수 없습니다.\n");
    }
    else if(510 < val){
        inputTag.value = val = 510;
        NukeCalc_Log("※주의※ 체력방어력은 510보다 클 수 없습니다.\n");
    }
    nukeCalculator.hpArmor = parseInt(val);
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeShield(inputTag)
{
    var val = parseInt(inputTag.value);
    if(val < 0)
    {
        inputTag.value = val = 0;
        NukeCalc_Log("※주의※ 쉴드는 0보다 작을 수 없습니다.\n");
    }
    else if(65535 < val){
        inputTag.value = val = 65535;
        NukeCalc_Log("※주의※ 쉴드는 65535보다 클 수 없습니다.\n");
    }
    nukeCalculator.maxShield = parseInt(inputTag.value);
    nukeCalculator.Heal();
    NukeCalc_ViewerUpdateAll();
}
function NukeCalc_ChangeShieldArmor(inputTag)
{
    var val = parseInt(inputTag.value);
    if(val < 0)
    {
        inputTag.value = val = 0;
        NukeCalc_Log("※주의※ 쉴드방어력은 0보다 작을 수 없습니다.\n");
    }
    else if(255 < val){
        inputTag.value = val = 255;
        NukeCalc_Log("※주의※ 쉴드방어력은 255 클 수 없습니다.\n");
    }
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
    NukeCalc_PosViewerUpdate();
}
function NukeCalc_PosViewerUpdate(){
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
    NukeCalc_Log(nukeCalculator.GetInfo()+'\n');
}
//nukeCalculator의 멤버변수 => 입력창들에 업데이트
function NukeCalc_InputInitFromCalculator(){
    var divs=nukeCalcInput.getElementsByTagName("div");
    divs[0].getElementsByTagName("input")[0].value = nukeCalculator.maxHP;
    divs[0].getElementsByTagName("input")[1].value = nukeCalculator.hpArmor;
    divs[1].getElementsByTagName("input")[0].value = nukeCalculator.maxShield;
    divs[1].getElementsByTagName("input")[1].value = nukeCalculator.shieldArmor;
    divs[2].getElementsByTagName("select")[0].value = nukeCalculator.coeffScaleType;
    divs[3].getElementsByTagName("select")[0].value = nukeCalculator.coeffPosType;
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

    //유닛위치
     
    
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
//타격위치 마우스로 설정
function setPositionAtMousePointer()
{
    var targetDivTag = document.getElementById("nukeCalcTarget");
    var leftValue = (mouseX-10 - targetDivTag.clientWidth/2);
    if (leftValue < 10)
        leftValue = 10;
    else if(leftValue >= 696)
        leftValue = 695;
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
    var nukeCalcInfoTextarea = document.getElementById("nukeCalcInfoText").getElementsByTagName("textarea")[0];
    nukeCalcInfoTextarea.value = nukeCalculator.Save();
}
function NukeCalc_Import(){
    var nukeCalcInfoTextarea = document.getElementById("nukeCalcInfoText").getElementsByTagName("textarea")[0];
    try{
        nukeCalculator.Load(nukeCalcInfoTextarea.value);
    }
    catch{
        NukeCalc_Log("불러오기에 실패했습니다.\n");
    }
    finally{
        NukeCalc_ViewerUpdateAll();
        NukeCalc_InputInitFromCalculator();
        NukeCalc_PosViewerUpdate();
    }
}
function NukeCalc_MakeHPFromGoalDamage(){
    var inputTag = document.getElementById("데미지맞춤");
    if(inputTag.value != ""){
        var val = parseInt(inputTag.value);
        if(val < 0){
            val  = 0;
            NukeCalc_Log("※주의※ 데미지는 0 ~ 65535사이의 값이어야합니다. "+val+"로 계산합니다.\n");
        }
        else if(65535 < val){
            val %= 65536;
            NukeCalc_Log("※주의※ 데미지는 0 ~ 65535사이의 값이어야합니다. "+val+"로 계산합니다.\n");
        }
        res = nukeCalculator.MakeHPforGoalDamage(val);
        NukeCalc_Log("최대체력을 제외한 항목들을 고려하여 "+val+"의 데미지를 받기위해서는 최소체력이 "+res.baseHP+'가 되어야하며\n'+res.plusAlphaHP+'씩 증가시키면 받는 데미지를 유지할 수 있습니다.\n단, 쉴드가 존재할 때에는 쉴드가 버텨주는동안 데미지가 다르게 나올 수 있습니다.\n가능한 최소체력으로 설정되었습니다.\n');
        NukeCalc_InputInitFromCalculator();
        NukeCalc_ViewerUpdateAll();
    }
    else{
        NukeCalc_Log("원하는 데미지를 입력하셔야합니다.");
    }
}
function NukeCalc_Log(content){
    var logTextarea = document.getElementById("nukeCalcLog").children[1];
    logTextarea.value += content;
    logTextarea.scrollTop = logTextarea.scrollHeight;
}