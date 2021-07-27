var nukeCalculator={
    init:function(){
        this.maxHP = 10000;
        this.curHP = this.maxHP; // 4 * 3
        this.maxShield = 5000;
        this.curShield = this.maxShield; // 4 * 3
        this.hpArmor = 100;
        this.shieldArmor = 50;
        this.coeffPosType = "직격";
        this.coeffScaleType = "소형";
        this.Dot5 = false;
    },
        
    GetCoeffPosValue:function(){
        if (this.coeffPosType == '직격')
            return 1.0;
        else if (this.coeffPosType == '빗맞음')
            return 0.5;
        else if (this.coeffPosType == '맞았나')
            return 0.25;
        else
            return -1;
    },

    GetCoeffScaleValue:function(){
        if (this.coeffScaleType == '소형')
            return 0.5;
        else if (this.coeffScaleType == '중형')
            return 0.75;
        else if (this.coeffScaleType == '대형')
            return 1.0;
        else
            return -1;
    },

    GetInfo:function(){
        res = '체력 : '+this.curHP+' / '+this.maxHP+', 방어력 : '+this.hpArmor+'\n';
        res += '쉴드 : '+this.curShield+' / '+this.maxShield+', 방어력 : '+this.shieldArmor+'\n';
        res += '유닛크기 : '+this.coeffScaleType+'\n';
        res += '타격위치 : '+this.coeffPosType;
        return res;
    },
    Damage:function(bIncludeDetail = false){
        res = ''
        coeffPosValue = this.GetCoeffPosValue();
        if (coeffPosValue == -1) return 1;
        if (bIncludeDetail){
            res += '일단 몇가지 계수들을 먼저 계산해둘게\n';
            res += this.coeffPosType+'으로 맞았으니 총 데미지를 계산할때 '+coeffPosValue+'만큼 곱해줄꺼야.\n';
        }
        coeffScaleValue = this.GetCoeffScaleValue();
        if (coeffScaleValue == -1) return 1;
        if (bIncludeDetail)
            res += '유닛 크기가 '+this.coeffScaleType+'이니 나중에 상성을 계산할때 '+coeffScaleValue+'만큼 곱해줄꺼야.\n';

        totalMaxHP = this.maxHP + this.maxShield;
        if (bIncludeDetail)
            res += '1. 우선 최대체력이 '+this.maxHP+'이고 최대쉴드량이 '+this.maxShield+'이니 대상의 총 최대체력은 '+totalMaxHP+'이야\n';
        if (totalMaxHP >= 750)
        {
            totalDamage = totalMaxHP * 2. / 3. * coeffPosValue;
            if (bIncludeDetail)
                res += '2. 체력이 750이상이니 총 데미지는 총 최대체력에 2/3를 곱하고 위에서 계산해둔 거리에 따른 계수 '+coeffPosValue+'를 곱해서 '+totalDamage+'}가 나와.\n';
        }
        else{
            totalDamage = 500*coeffPosValue
            if (bIncludeDetail)
                res += '2. 체력이 750미만이니 총 데미지는 500에 위에서 계산해둔 거리에 따른 계수 '+coeffPosValue+'를 곱해서 '+totalDamage+'가 나와.\n';
        }
        if (this.curShield > 0){
            if ((this.curShield + this.shieldArmor) > totalDamage) // 쉴드선에서 막힌다.
            {
                remainShield = (this.curShield + this.shieldArmor) - parseInt(totalDamage);
                remainHP = this.curHP;
                totalDamage = 0
                if (bIncludeDetail){
                    res += '3. 현재 쉴드량이 '+this.curShield+'이고 쉴드방어력이 '+this.shieldArmor+'이니 핵 데미지가 쉴드를 뚫지못해.\n'
                    res += '   결국 쉴드는 '+remainShield+'만큼 남고 체력은 그대로 '+remainHP+'가 돼.\n';
                }
            }
            else{
                remainShield = 0;
                totalDamage -= (this.curShield + this.shieldArmor); // 쉴드로 막고 남은 데미지 갱신
                if (bIncludeDetail){
                    res += '3. 현재 쉴드량이 '+this.curShield+'이고 쉴드방어력이 '+this.shieldArmor+'이니 핵 데미지가 쉴드를 뚫고도 남아.\n';
                    res += '   결국 쉴드는 '+remainShield+'이 되고 남은 데미지인 '+totalDamage+'가 체력을 깎을 거야.\n';
                }
            }
        }
        else{
            remainShield = 0;
            if (bIncludeDetail)
                res += '3. 쉴드가 없으니 그대로 총 데미지인 '+totalDamage+'가 체력을 깎을 거야.\n';
        }
        if (totalDamage > 0){
            // 체력이 남은 데미지를 받는다.
            hpDamage = parseInt((totalDamage - this.hpArmor)*coeffScaleValue) % 65536;
            if (bIncludeDetail){
                res += '4. 체력이 입는 데미지는 총 데미지 에서 방어력만큼 뺀 뒤에 위에서 계산해둔 유닛크기에 따른 계수를 곱해주고 데미지의 최대치가 65535이므로 65536으로 나머지 연산을 하면 돼.\n';
                res += '   식으로 표현하면 (('+totalDamage+' - '+this.hpArmor+')*'+coeffScaleValue+') % 65536 이고 계산결과는 '+hpDamage+'야.\n';
            }
            if (hpDamage == 0){
                if (this.Dot5){
                    this.Dot5 = false;
                    hpDamage += 1;
                    if (bIncludeDetail)
                        res += '   데미지가 0이므로 0.5만큼 데미지가 들어가 이미 체력이 0.5 달았었으니 체력이 1깎인것처럼 보여.';
                }
                else{
                    this.Dot5 = true;
                    if (bIncludeDetail)
                        res += '   데미지가 0이므로 0.5만큼 데미지가 들어가 아직은 체력이 그대로 표시돼.';
                }
            }
            remainHP = this.curHP - hpDamage;
            if (bIncludeDetail)
                res += '   그러면 결국 남은 체력은 '+this.curHP+' - '+hpDamage+' 로 '+remainHP+'가 돼.\n   어때 간단하지?\n\n';
        }
        res += '쉴드에 가해진 데미지 : '+(this.curShield - remainShield)+'\n';
        res += '체력에 가해진 데미지 : '+(this.curHP - remainHP)+'\n';
        if (remainHP < 0)
            remainHP = 0;
        res += '남은 쉴드 : '+remainShield+'\n';
        res += '남은 체력 : '+remainHP+'\n';
        if (remainHP == 0)
            res += '죽었다 ㅠㅠ';
        else
            res += '살았다!';
        this.curShield = remainShield;
        this.curHP = remainHP;
        return res;
    },
    Heal:function(){
        this.curHP = this.maxHP;
        this.curShield = this.maxShield;
    },
    Save:function(){
        return JSON.stringify(this);
    },
    Load:function(nukeInfo){
        var res = JSON.parse(nukeInfo);
        this.curHP = parseInt(res.curHP);
        this.maxHP = parseInt(res.maxHP);
        this.curShield = parseInt(res.curShield);
        this.maxShield = parseInt(res.maxShield);
        this.hpArmor = parseInt(res.hpArmor);
        this.shieldArmor = parseInt(res.shieldArmor);
        this.coeffPosType = res.coeffPosType;
        this.coeffScaleType = res.coeffScaleType;
    },
    MakeHPforGoalDamage:function(goalDamage){
        coeffPosValue = this.GetCoeffPosValue();
        coeffScaleValue = this.GetCoeffScaleValue();
        baseHP = parseInt(3/(2.*coeffPosValue)*(goalDamage / coeffScaleValue + this.hpArmor));
        alphaHP = parseInt(98304 / (coeffPosValue*coeffScaleValue));
        if (this.maxShield > 0){
            if (baseHP <= this.maxShield)
                baseHP += alphaHP;
            baseHP -= this.maxShield;
        }
        if (baseHP < 750)
            baseHP += alphaHP;
        this.maxHP = baseHP;
        this.curHP = this.maxHP;
        return baseHP, alphaHP;
    }
}
nukeCalculator.init();
