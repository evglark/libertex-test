<template>
  <div class="appWrapper">
    <div class="row header">
      <div>Инвестировать сейчас</div>
    </div>
    <div class="row">
      <div>Сумма инвестиции</div>
      <InvestmentAmount v-model:value="sumInv" :error="!validSumInv"/>
      <div class="warningAlertWrapper" v-show="!validSumInv">
        <div class="warningAlert">Минимальная сумма инвестиции $ <span @click="setMinSumInv">100</span></div>
        <div class="popupTriangle"/>
      </div>
    </div>
    <div class="row">
      <div>Мультипликатор</div>
      <InputMultiplier range="0-99" v-model:value="mult" :output="getOutput">
        <ActualInvestmentAmount :output="getOutput" />
      </InputMultiplier>
    </div>
    <div class="row">
      <AccordionComponent title="Ограничить прибыль и убыток">
        <div class="row">
          <div>Ограничения в</div>
          <CheckboxRestrictions v-model:value="restrictions"/>
        </div>
        <div class="row">
          <CheckboxLine label="Прибыль" checkbox="profit" v-model:checked="takeProfit"
                        v-model:value="takeProfitValue" :investmentAmount="sumInv"/>
        </div>
        <div class="row">
          <CheckboxLine label="Убыток" checkbox="loss" v-model:checked="stopLoss"
                        v-model:value="stopLossValue" :investmentAmount="sumInv"/>
        </div>
      </AccordionComponent>
    </div>
    <div class="btnGroup">
      <div class="button" @click="handlerOnClick('reduction')">
        <div class="buttonIcon buttonDarkRed">v</div>
        <div class="buttonContent buttonRed">В снижение</div>
      </div>
      <div class="button" @click="handlerOnClick('growth')">
        <div class="buttonIcon buttonDarkGreen">^</div>
        <div class="buttonContent buttonGreen">В рост</div>
      </div>
    </div>
  </div>
</template>
<script>
import AccordionComponent from './components/AccordionComponent.vue'
import ActualInvestmentAmount from './components/ActualInvestmentAmount.vue'
import CheckboxLine from './components/CheckboxLine.vue'
import CheckboxRestrictions from './components/CheckboxRestrictions.vue'
import InvestmentAmount from './components/InvestmentAmount.vue'
import InputMultiplier from './components/InputMultiplier.vue'

export default {
  name: 'App',
  components: {
    InvestmentAmount,
    InputMultiplier,
    ActualInvestmentAmount,
    AccordionComponent,
    CheckboxRestrictions,
    CheckboxLine,
  },
  data() {
    return ({
      sumInv: 5000,
      validSumInv: true,
      mult: 40,
      takeProfit: false,
      takeProfitValue: null,
      stopLoss: false,
      stopLossValue: null,
      restrictions: 'dollar',

    });
  },
  methods: {
    setMinSumInv() {
      this.sumInv = 100
    },
    handlerOnClick(direction) {
      this.validSumInv = this.sumInv >= 100
      if (this.validSumInv) {
        this.sendForm(direction)
      }
    },
    sendForm(direction) {
      const takeProfit = this.takeProfit ? { takeProfit: this.takeProfitValue} : null
      const stopLoss = this.stopLoss ? { stopLoss: this.stopLossValue} : null
      fetch('/', {
        method: 'POST',
        body: JSON.stringify({
          sumInv: this.sumInv,
          mult: this.mult,
          ...takeProfit,
          ...stopLoss,
          direction,
        }),
      });
    }
  },
  computed: {
    getOutput() {
      return (this.sumInv * this.mult)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
    }
  },
  watch: {
    sumInv(currentSumInv) {
      if (currentSumInv >= 100) this.validSumInv = true
    }
  }
}
</script>
<style>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
}

.appWrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding-left: 20px;
}

.row {
  position: relative;
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
}

.header {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(220, 223, 225);
}

.header, label {
  font-size: 18px;
  font-weight: 400;
}

.btnGroup {
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.button {
  display: flex;
  width: 100px;
  height: 30px;
  cursor: pointer;
}

.buttonIcon {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(250, 250, 250);
}

.buttonContent {
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(250, 250, 250);
}

.buttonDarkGreen {
  background-color: rgb(60, 142, 43);
}

.buttonGreen {
  background-color: rgb(68, 153, 51);
}

.buttonDarkRed {
  background-color: rgb(225, 72, 77);
}

.buttonRed {
  background-color: rgb(236, 77, 84);
}

.warningAlertWrapper {
  position: absolute;
  top: -40px;
  left: 175px;
}

.popupTriangle {
  margin: 0 20px;
  width: 0;
  height: 0;
  border-top: 4px solid rgb(221, 45, 54);
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
}

.warningAlert {
  padding: 5px;
  background-color: rgb(221, 45, 54);
  color: rgb(250, 250, 250);
  text-align: center;
  font-size: 10px;
}

.warningAlert > span {
  border-bottom: 1px dashed rgb(250, 250, 250);
  cursor: pointer;
}
</style>
