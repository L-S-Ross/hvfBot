const fs = require('fs');
const SMA = require('technicalindicators').SMA;
const SMA2 = require('technicalindicators').SMA;
const ADX = require('technicalindicators').ADX;
const ATR = require('technicalindicators').ATR;

const fifteenSMA = require('technicalindicators').SMA;
const fifteenSMA2 = require('technicalindicators').SMA;
const fifteenADX = require('technicalindicators').ADX;
const fifteenATR = require('technicalindicators').ATR;

const hourSMA = require('technicalindicators').SMA;
const hourSMA2 = require('technicalindicators').SMA;
const hourADX = require('technicalindicators').ADX;
const hourATR = require('technicalindicators').ATR;

const threeHourSMA = require('technicalindicators').SMA;
const threeHourSMA2 = require('technicalindicators').SMA;
const threeHourADX = require('technicalindicators').ADX;
const threeHourATR = require('technicalindicators').ATR;

const daySMA = require('technicalindicators').SMA;
const daySMA2 = require('technicalindicators').SMA;
const dayADX = require('technicalindicators').ADX;
const dayATR = require('technicalindicators').ATR;

const pairsArray = ['ETHBTC'];//,'IOTBTC', 'IOTETH', 'ETHBTC', 'NEOBTC', 'NEOETH', 'BTCUSD', 'ETHUSD','IOTUSD', 'NEOUSD'
const BFXTrade = require('./BfxTrade');

var bfx = new BFXTrade(pairsArray);

var pairs = {};
const tmaPeriods = 7;
const tma2Periods = 90;
const tadxPeriods = 15;
const tatrPeriods = 14;

const maPeriods = 10;
const ma2Periods = 100;
const adxPeriods = 35;
const atrPeriods = 35;

const trendStrength = 20;

var openedPositions = 0;
var success = 0;
var loss = 0;
var hvfRunning = false;
var extremeHigh = -Infinity;
var extremeLow = Infinity;

var beep = require('beepbeep')

function Manager(){
// beep()
	
}

function round(number, precision){
	var shift = function(number, precision){
		var numArray = (''+ number).split('e');
		return +(numArray[0] + 'e' + (numArray[1]?(+numArray+precision):precision));
	};
	return shift(Math.round(shift(number, +precision)), -precision);
}

function initPairs(){

	for(pair of pairsArray){
		
			pairs[pair]={
				ma: new SMA({period : tmaPeriods, values : []}),
				maValue:0,
				ma2: new SMA2({period : tma2Periods, values : []}),
				ma2Value:0,
				adx: new ADX({period : tadxPeriods, close:[], high:[], low:[]}),
				adxValue: 0,
				atr: new ATR({period : tatrPeriods, close:[], high:[], low:[]}),
				atrValue: 0 ,
				prevMaValue:0,
				sell: false,
				buy: false,
				success: 0,
				loss: 0,
				profit: 0,
				profitPct:0,
				open: - Infinity,
				high: - Infinity,
				low: Infinity,
				close: - Infinity,
				tradePrice: - Infinity,
				sellAmount: 0,
				lastPrice: - Infinity,
				dayHighPrice: - Infinity,
				dayLowPrice: Infinity,
				askPrice: - Infinity,
				bidPrice: Infinity,
				volume: - Infinity,
				dayChange: - Infinity,
				dayChangePct: - Infinity,
				ALTSellLevel: Infinity,
				BTCSellLevel: - Infinity,
				prevOpen: - Infinity,
				prevHigh: - Infinity,
				prevLow: Infinity,
				prevClose: - Infinity,
				thirdOpen: - Infinity,
				thirdHigh: - Infinity,
				thirdLow: Infinity,
				thirdClose: - Infinity,
				prevTradePrice: - Infinity,
				prevSellAmount: 0,
				prevLastPrice: - Infinity,
				prevDayHighPrice: - Infinity,
				prevDayLowPrice: Infinity,
				prevAskPrice: - Infinity,
				prevBidPrice: Infinity,
				prevVolume: - Infinity,
				prevDayChange: - Infinity,
				prevDayChangePct: - Infinity,
				prevALTSellLevel: Infinity,
				prevBTCSellLevel: - Infinity,
				latestPerc: 0,
				candlePerc: 0,
				prevCandlePerc: 0,
				thirdCandlePerc: 0,
				fifteenOpen: - Infinity,
				fifteenHigh: - Infinity,
				fifteenLow: Infinity,
				fifteenClose: - Infinity,
				fifteenPrevOpen: - Infinity,
				fifteenPrevHigh: - Infinity,
				fifteenPrevLow: Infinity,
				fifteenPrevClose: - Infinity,
				fifteenThirdOpen: - Infinity,
				fifteenThirdHigh: - Infinity,
				fifteenThirdLow: Infinity,
				fifteenThirdClose: - Infinity,
				fifteenMa: new fifteenSMA({period : maPeriods, values : []}),
				fifteenMaValue:0,
				fifteenMa2: new fifteenSMA2({period : ma2Periods, values : []}),
				fifteenMa2Value:0,
				fifteenAdx: new fifteenADX({period : adxPeriods, close:[], high:[], low:[]}),
				fifteenAdxValue: 0,
				fifteenAtr: new fifteenATR({period : atrPeriods, close:[], high:[], low:[]}),
				fifteenAtrValue: 0 ,
				fifteenPrevMaValue:0,
				hourOpen: - Infinity,
				hourHigh: - Infinity,
				hourLow: Infinity,
				hourClose: - Infinity,
				hourPrevOpen: - Infinity,
				hourPrevHigh: - Infinity,
				hourPrevLow: Infinity,
				hourPrevClose: - Infinity,
				hourThirdOpen: - Infinity,
				hourThirdHigh: - Infinity,
				hourThirdLow: Infinity,
				hourThirdClose: - Infinity,
				hourMa: new hourSMA({period : maPeriods, values : []}),
				hourMaValue:0,
				hourMa2: new hourSMA2({period : ma2Periods, values : []}),
				hourMa2Value:0,
				hourAdx: new hourADX({period : adxPeriods, close:[], high:[], low:[]}),
				hourAdxValue: 0,
				hourAtr: new hourATR({period : atrPeriods, close:[], high:[], low:[]}),
				hourAtrValue: 0 ,
				hourPrevMaValue:0,
				threeHourOpen: - Infinity,
				threeHourHigh: - Infinity,
				threeHourLow: Infinity,
				threeHourClose: - Infinity,
				threeHourPrevOpen: - Infinity,
				threeHourPrevHigh: - Infinity,
				threeHourPrevLow: Infinity,
				threeHourPrevClose: - Infinity,
				threeHourThirdOpen: - Infinity,
				threeHourThirdHigh: - Infinity,
				threeHourThirdLow: Infinity,
				threeHourThirdClose: - Infinity,
				threeHourMa: new threeHourSMA({period : maPeriods, values : []}),
				threeHourMaValue:0,
				threeHourMa2: new threeHourSMA2({period : ma2Periods, values : []}),
				threeHourMa2Value:0,
				threeHourAdx: new threeHourADX({period : adxPeriods, close:[], high:[], low:[]}),
				threeHourAdxValue: 0,
				threeHourAtr: new threeHourATR({period : atrPeriods, close:[], high:[], low:[]}),
				threeHourAtrValue: 0 ,
				threeHourPrevMaValue:0,
				dayOpen: - Infinity,
				dayHigh: - Infinity,
				dayLow: Infinity,
				dayClose: - Infinity,
				dayPrevOpen: - Infinity,
				dayPrevHigh: - Infinity,
				dayPrevLow: Infinity,
				dayPrevClose: - Infinity,
				dayThirdOpen: - Infinity,
				dayThirdHigh: - Infinity,
				dayThirdLow: Infinity,
				dayThirdClose: - Infinity,
				dayMa: new daySMA({period : maPeriods, values : []}),
				dayMaValue:0,
				dayMa2: new daySMA2({period : ma2Periods, values : []}),
				dayMa2Value:0,
				dayAdx: new dayADX({period : adxPeriods, close:[], high:[], low:[]}),
				dayAdxValue: 0,
				dayAtr: new dayATR({period : atrPeriods, close:[], high:[], low:[]}),
				dayAtrValue: 0 ,
				dayPrevMaValue:0,

			}	
	}

	for(pair in pairs){
		bfx.pairSetup(pair, function(pair, ticker) {
			if (pairs[pair]['lastPrice'] != undefined){
				pairs[pair]['preVLastPrice'] = pairs[pair]['lastPrice'];
				pairs[pair]['prevBidPrice'] = pairs[pair]['bidPrice'];
				pairs[pair]['prevAskPrice'] = pairs[pair]['askPrice'];
				pairs[pair]['prevDayHighPrice'] = pairs[pair]['dayHighPrice'];
				pairs[pair]['prevDayLowPrice'] = pairs[pair]['dayLowPrice'];
				pairs[pair]['prevVolume'] = pairs[pair]['volume'];
				pairs[pair]['prevDayChange'] = pairs[pair]['dayChange'];
				pairs[pair]['prevDayChangePct'] = pairs[pair]['dayChangePct'];	
			}
			// console.log(pair,'s Setup prices: ', ticker.lastPrice)
			if ('t'+pair == ticker.symbol){
				pairs[pair]['lastPrice'] = ticker['lastPrice'];
				pairs[pair]['bidPrice'] = ticker['bid'];
				pairs[pair]['askPrice'] = ticker['ask'];
				pairs[pair]['dayHighPrice'] = ticker['high'];
				pairs[pair]['dayLowPrice'] = ticker['low'];
				pairs[pair]['volume'] = ticker['volume'];
				pairs[pair]['dayChange'] = ticker['dailyChange'];
				pairs[pair]['dayChangePct'] = ticker['dailyChangePerc'];
				// console.log('___',pair,' ticker update: ', pairs[pair]['dayChangePct'])
			}

		})
		bfx.getHistData(pair, function(pair, data){
			pairs[pair]['open'] = data[0].open;
			pairs[pair]['high'] = data[0].high;
			pairs[pair]['low'] = data[0].low;
			pairs[pair]['close'] = data[0].close;
			pairs[pair]['prevOpen'] = data[1].open;
			pairs[pair]['prevHigh'] = data[1].high;
			pairs[pair]['prevLow'] = data[1].low;
			pairs[pair]['prevClose'] = data[1].close;
			pairs[pair]['thirdOpen'] = data[2].open;
			pairs[pair]['thirdHigh'] = data[2].high;
			pairs[pair]['thirdLow'] = data[2].low;
			pairs[pair]['thirdClose'] = data[2].close;

			pairs[pair]['candlePerc'] = -100 + (pairs[pair]['close']/pairs[pair]['open'])* 100;
			pairs[pair]['prevCandlePerc'] = -100 + (pairs[pair]['close']/pairs[pair]['prevLow'])* 100;
			pairs[pair]['thirdCandlePerc'] = -100 + (pairs[pair]['close']/pairs[pair]['thirdLow'])* 100;
			pairs[pair]['latestPerc'] = -100 + (pairs[pair]['lastPrice']/pairs[pair]['low'])* 100;			

			var carray = [];
			var harray = [];
			var larray = [];

			for(var d of data){
				carray.push(d['close']);
				harray.push(d['high']);
				larray.push(d['low']);
				// console.log('Historical candle closes: ',carray, 'Highs ', harray, 'lows ', larray)
			}

			//console.log(resppair, carray);
			pairs[pair]['ma'] = new SMA({period : tmaPeriods, values : carray});
			pairs[pair]['ma2'] = new SMA2({period : tma2Periods, values : carray});
			pairs[pair]['adx'] = new ADX({period : tadxPeriods, close : carray, high : harray, low : larray });
			pairs[pair]['atr'] = new ATR({period : tatrPeriods, close : carray, high : harray, low : larray });
			//console.log(pairs);
			// console.log('1m Current',pair, round(pairs[pair]['latestPerc'],4),'%',', 1c%:',round(pairs[pair]['candlePerc'],4));
			// console.log(', 2c%:', round(pairs[pair]['prevCandlePerc'],4),', 3c%',round(pairs[pair]['thirdCandlePerc'],4));
			// console.log('___',pair,'moving average: ',round(pairs[pair]['ma'].price[0],5), ', price:', round(pairs[pair]['lastPrice'],5));
		})

		bfx.getFifteenCandles(pair, function(pair, candles){
		   	pairs[pair]['fifteenOpen'] = candles[0].open;
			pairs[pair]['fifteenHigh'] = candles[0].high;
			pairs[pair]['fifteenLow'] = candles[0].low;
			pairs[pair]['fifteenClose'] = candles[0].close;
			pairs[pair]['fifteenPrevOpen'] = candles[1].open;
			pairs[pair]['fifteenPrevHigh'] = candles[1].high;
			pairs[pair]['fifteenPrevLow'] = candles[1].low;
			pairs[pair]['fifteenPrevClose'] = candles[1].close;
			pairs[pair]['fifteenThirdOpen'] = candles[2].open;
			pairs[pair]['fifteenThirdHigh'] = candles[2].high;
			pairs[pair]['fifteenThirdLow'] = candles[2].low;
			pairs[pair]['fifteenThirdClose'] = candles[2].close;

			pairs[pair]['fifteenCandlePerc'] = -100 + (pairs[pair]['fifteenClose']/pairs[pair]['fifteenOpen'])* 100;
			pairs[pair]['fifteenPrevCandlePerc'] = -100 + (pairs[pair]['fifteenClose']/pairs[pair]['fifteenPrevLow'])* 100;
			pairs[pair]['fifteenThirdCandlePerc'] = -100 + (pairs[pair]['fifteenClose']/pairs[pair]['fifteenThirdLow'])* 100;
			pairs[pair]['fifteenLatestPerc'] = -100 + (pairs[pair]['lastPrice']/pairs[pair]['fifteenLow'])* 100;
			
			var carray = [];
			var harray = [];
			var larray = [];

			for(var d of candles){
				carray.push(d['close']);
				harray.push(d['high']);
				larray.push(d['low']);
				// console.log('Historical candle closes: ',carray, 'Highs ', harray, 'lows ', larray)
			}

			//console.log(resppair, carray);
			pairs[pair]['fifteenMa'] = new fifteenSMA({period : maPeriods, values : carray});
			pairs[pair]['fifteenMa2'] = new fifteenSMA2({period : ma2Periods, values : carray});
			pairs[pair]['fifteenAdx'] = new fifteenADX({period : adxPeriods, close : carray, high : harray, low : larray });
			pairs[pair]['fifteenAtr'] = new fifteenATR({period : atrPeriods, close : carray, high : harray, low : larray });
			//console.log(pairs);
			// console.log('15m Current',pair, round(pairs[pair]['fifteenLatestPerc'],4),'%',', 1c%:',round(pairs[pair]['fifteenCandlePerc'],4));
			// console.log(', 2c%:', round(pairs[pair]['fifteenPrevCandlePerc'],4),', 3c%',round(pairs[pair]['fifteenThirdCandlePerc'],4));
			// console.log('___',pair,'moving average: ',round(pairs[pair]['fifteenMa'].price[0],5), ', price:', round(pairs[pair]['lastPrice'],5));
		})

		bfx.getHourCandles(pair, function(pair, candles){
	 	    pairs[pair]['hourOpen'] = candles[0].open;
			pairs[pair]['hourHigh'] = candles[0].high;
			pairs[pair]['hourLow'] = candles[0].low;
			pairs[pair]['hourClose'] = candles[0].close;
			pairs[pair]['hourPrevOpen'] = candles[1].open;
			pairs[pair]['hourPrevHigh'] = candles[1].high;
			pairs[pair]['hourPrevLow'] = candles[1].low;
			pairs[pair]['hourPrevClose'] = candles[1].close;
			pairs[pair]['hourThirdOpen'] = candles[2].open;
			pairs[pair]['hourThirdHigh'] = candles[2].high;
			pairs[pair]['hourThirdLow'] = candles[2].low;
			pairs[pair]['hourThirdClose'] = candles[2].close;

			pairs[pair]['hourCandlePerc'] = -100 + (pairs[pair]['hourClose']/pairs[pair]['hourOpen'])* 100;
			pairs[pair]['hourPrevCandlePerc'] = -100 + (pairs[pair]['hourClose']/pairs[pair]['hourPrevLow'])* 100;
			pairs[pair]['hourThirdCandlePerc'] = -100 + (pairs[pair]['hourClose']/pairs[pair]['hourThirdLow'])* 100;
			pairs[pair]['hourLatestPerc'] = -100 + (pairs[pair]['lastPrice']/pairs[pair]['hourLow'])* 100;
			
			var carray = [];
			var harray = [];
			var larray = [];

			for(var d of candles){
				carray.push(d['close']);
				harray.push(d['high']);
				larray.push(d['low']);
				// console.log('Historical candle closes: ',carray, 'Highs ', harray, 'lows ', larray)
			}

			//console.log(resppair, carray);
			pairs[pair]['hourMa'] = new hourSMA({period : maPeriods, values : carray});
			pairs[pair]['hourMa2'] = new hourSMA2({period : ma2Periods, values : carray});
			pairs[pair]['hourAdx'] = new hourADX({period : adxPeriods, close : carray, high : harray, low : larray });
			pairs[pair]['hourAtr'] = new hourATR({period : atrPeriods, close : carray, high : harray, low : larray });
			//console.log(pairs);
			// console.log('1h Current',pair, round(pairs[pair]['hourLatestPerc'],4),'%',', 1c%:',round(pairs[pair]['hourCandlePerc'],4));
			// console.log(', 2c%:', round(pairs[pair]['hourPrevCandlePerc'],4),', 3c%',round(pairs[pair]['hourThirdCandlePerc'],4));
			// console.log('___',pair,'moving average: ',round(pairs[pair]['hourMa'].price[0],5), ', price:', round(pairs[pair]['lastPrice'],5));
		})

		bfx.getThreeHourCandles(pair, function(pair, candles){
			pairs[pair]['threeHourOpen'] = candles[0].open;
			pairs[pair]['threeHourHigh'] = candles[0].high;
			pairs[pair]['threeHourLow'] = candles[0].low;
			pairs[pair]['threeHourClose'] = candles[0].close;
			pairs[pair]['threeHourPrevOpen'] = candles[1].open;
			pairs[pair]['threeHourPrevHigh'] = candles[1].high;
			pairs[pair]['threeHourPrevLow'] = candles[1].low;
			pairs[pair]['threeHourPrevClose'] = candles[1].close;
			pairs[pair]['threeHourThirdOpen'] = candles[2].open;
			pairs[pair]['threeHourThirdHigh'] = candles[2].high;
			pairs[pair]['threeHourThirdLow'] = candles[2].low;
			pairs[pair]['threeHourThirdClose'] = candles[2].close;

			pairs[pair]['threeHourCandlePerc'] = -100 + (pairs[pair]['threeHourClose']/pairs[pair]['threeHourOpen'])* 100;
			pairs[pair]['threeHourPrevCandlePerc'] = -100 + (pairs[pair]['threeHourClose']/pairs[pair]['threeHourPrevLow'])* 100;
			pairs[pair]['threeHourThirdCandlePerc'] = -100 + (pairs[pair]['threeHourClose']/pairs[pair]['threeHourThirdLow'])* 100;
			pairs[pair]['threeHourLatestPerc'] = -100 + (pairs[pair]['lastPrice']/pairs[pair]['threeHourLow'])* 100;
			
			var carray = [];
			var harray = [];
			var larray = [];

			for(var d of candles){
				carray.push(d['close']);
				harray.push(d['high']);
				larray.push(d['low']);
				// console.log('Historical candle closes: ',carray, 'Highs ', harray, 'lows ', larray)
			}

			//console.log(resppair, carray);
			pairs[pair]['threeHourMa'] = new threeHourSMA({period : maPeriods, values : carray});
			pairs[pair]['threeHourMa2'] = new threeHourSMA2({period : ma2Periods, values : carray});
			pairs[pair]['threeHourAdx'] = new threeHourADX({period : adxPeriods, close : carray, high : harray, low : larray });
			pairs[pair]['threeHourAtr'] = new threeHourATR({period : atrPeriods, close : carray, high : harray, low : larray });
			//console.log(pairs);
			// console.log('3h Current',pair, round(pairs[pair]['threeHourLatestPerc'],4),'%',', 1c%:',round(pairs[pair]['threeHourCandlePerc'],4));
			// console.log(', 2c%:', round(pairs[pair]['threeHourPrevCandlePerc'],4),', 3c%',round(pairs[pair]['threeHourThirdCandlePerc'],4));
			// console.log('___',pair,'moving average: ',round(pairs[pair]['threeHourMa'].price[0],5), ', price:', round(pairs[pair]['lastPrice'],5));
		})

		bfx.getDayCandles(pair, function(pair, candles){
			pairs[pair]['dayOpen'] = candles[0].open;
			pairs[pair]['dayHigh'] = candles[0].high;
			pairs[pair]['dayLow'] = candles[0].low;
			pairs[pair]['dayClose'] = candles[0].close;
			pairs[pair]['dayPrevOpen'] = candles[1].open;
			pairs[pair]['dayPrevHigh'] = candles[1].high;
			pairs[pair]['dayPrevLow'] = candles[1].low;
			pairs[pair]['dayPrevClose'] = candles[1].close;
			pairs[pair]['dayThirdOpen'] = candles[2].open;
			pairs[pair]['dayThirdHigh'] = candles[2].high;
			pairs[pair]['dayThirdLow'] = candles[2].low;
			pairs[pair]['dayThirdClose'] = candles[2].close;

			pairs[pair]['dayCandlePerc'] = -100 + (pairs[pair]['dayClose']/pairs[pair]['dayOpen'])* 100;
			pairs[pair]['dayPrevCandlePerc'] = -100 + (pairs[pair]['dayClose']/pairs[pair]['dayPrevLow'])* 100;
			pairs[pair]['dayThirdCandlePerc'] = -100 + (pairs[pair]['dayClose']/pairs[pair]['dayThirdLow'])* 100;
			pairs[pair]['dayLatestPerc'] = -100 + (pairs[pair]['lastPrice']/pairs[pair]['dayLow'])* 100;
			
			var carray = [];
			var harray = [];
			var larray = [];

			for(var d of candles){
				carray.push(d['close']);
				harray.push(d['high']);
				larray.push(d['low']);
				// console.log('Historical candle closes: ',carray, 'Highs ', harray, 'lows ', larray)
			}

			//console.log(resppair, carray);
			pairs[pair]['dayMa'] = new daySMA({period : maPeriods, values : carray});
			pairs[pair]['dayMa2'] = new daySMA2({period : ma2Periods, values : carray});
			pairs[pair]['dayAdx'] = new dayADX({period : adxPeriods, close : carray, high : harray, low : larray });
			pairs[pair]['dayAtr'] = new dayATR({period : atrPeriods, close : carray, high : harray, low : larray });
			//console.log(pairs);
			// console.log('1D Current',pair, round(pairs[pair]['dayLatestPerc'],4),'%',', 1c%:',round(pairs[pair]['dayCandlePerc'],4));
			// console.log(', 2c%:', round(pairs[pair]['dayPrevCandlePerc'],4),', 3c%',round(pairs[pair]['dayThirdCandlePerc'],4));
			// console.log('___',pair,'moving average: ',round(pairs[pair]['dayMa'].price[0],5), ', price:', round(pairs[pair]['lastPrice'],5));
		})

		console.log('----------Initialising bot----------');
		console.log('Bot for ', pair)

		console.log('-----------------------------------------------------------------');
		if (pair != undefined) {
			console.log('----------Initialising bot----------');
			console.log('Bot for ', pair, ' MA: ', pairs[pair]['ma'].price[0], ' MA2: ', pairs[pair]['ma2'].price[0])
			
			console.log('-----------------------------------------------------------------');
			//30 minute delay time = 1800000
			var delay = 10000 - Date.now()%10000;
			console.log('trading starts in ', delay/10000, ' minutes');
			console.log('-----------------------------------------------------------------');
			console.log('-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-');

			setTimeout(function(){
				for(var pair in pairs){
					// bfx.getPrices(pair);
					updateIndicators(pair, bfx.prices);
					}

				setInterval(function(){
					for(var pair in pairs){
						// bfx.getPrices(pair);
					updateIndicators(pair, bfx.prices);
					// bfx.resetPrices(pair);
					}
				}, 30000);

				setInterval(function(){
					for(var pair in pairs){
						// bfx.getPrices(pair);
						findTradeOpportunity(pair, bfx.prices);
					}
				}, 1000);
			}, delay);
			// bfx.gIOTistData();
		}
	}

}

/**
	start bot
	**/
Manager.prototype.runbot = function(pair, pairs){

	initPairs()

}

function updateIndicators(pair, prices){
	// console.log(pair, 'MA value: ', pairs[pair]['maValue'], 'MA2 value: ', pairs[pair]['ma2Value'],
	// 	'ADX Value: ', pairs[pair]['adxValue'], 'ATR Value: ',pairs[pair]['atrValue']);
	// console.log('Prices going in: ',prices[pair]['close'], prices[pair]['low'], prices[pair]['high'])
	if (pair != undefined){
		pairs[pair]['maValue'] = pairs[pair]['ma'].nextValue(pairs[pair]['close']);
		pairs[pair]['ma2Value'] = pairs[pair]['ma2'].nextValue(pairs[pair]['close']);
		pairs[pair]['adxValue'] = pairs[pair]['adx'].nextValue({close: pairs[pair]['close'], high: pairs[pair]['high'], low: pairs[pair]['low']});
		pairs[pair]['atrValue'] = pairs[pair]['atr'].nextValue({close: pairs[pair]['close'], high: pairs[pair]['high'], low: pairs[pair]['low']});

		pairs[pair]['fifteenMaValue'] = pairs[pair]['fifteenMa'].nextValue(pairs[pair]['fifteenClose']);
		pairs[pair]['fifteenMa2Value'] = pairs[pair]['fifteenMa2'].nextValue(pairs[pair]['fifteenClose']);
		pairs[pair]['fifteenAdxValue'] = pairs[pair]['fifteenAdx'].nextValue({close: pairs[pair]['fifteenClose'], high: pairs[pair]['fifteenHigh'], low: pairs[pair]['fifteenLow']});
		pairs[pair]['fifteenAtrValue'] = pairs[pair]['fifteenAtr'].nextValue({close: pairs[pair]['fifteenClose'], high: pairs[pair]['fifteenHigh'], low: pairs[pair]['fifteenLow']});
		
		pairs[pair]['hourMaValue'] = pairs[pair]['hourMa'].nextValue(pairs[pair]['hourClose']);
		pairs[pair]['hourMa2Value'] = pairs[pair]['hourMa2'].nextValue(pairs[pair]['hourClose']);
		pairs[pair]['hourAdxValue'] = pairs[pair]['hourAdx'].nextValue({close: pairs[pair]['hourClose'], high: pairs[pair]['hourHigh'], low: pairs[pair]['hourLow']});
		pairs[pair]['hourAtrValue'] = pairs[pair]['hourAtr'].nextValue({close: pairs[pair]['hourClose'], high: pairs[pair]['hourHigh'], low: pairs[pair]['hourLow']});
		
		pairs[pair]['threeHourMaValue'] = pairs[pair]['threeHourMa'].nextValue(pairs[pair]['threeHourClose']);
		pairs[pair]['threeHourMa2Value'] = pairs[pair]['threeHourMa2'].nextValue(pairs[pair]['threeHourClose']);
		pairs[pair]['threeHourAdxValue'] = pairs[pair]['threeHourAdx'].nextValue({close: pairs[pair]['threeHourClose'], high: pairs[pair]['threeHourHigh'], low: pairs[pair]['threeHourLow']});
		pairs[pair]['threeHourAtrValue'] = pairs[pair]['threeHourAtr'].nextValue({close: pairs[pair]['threeHourClose'], high: pairs[pair]['threeHourHigh'], low: pairs[pair]['threeHourLow']});
		
		pairs[pair]['dayMaValue'] = pairs[pair]['dayMa'].nextValue(pairs[pair]['dayClose']);
		pairs[pair]['dayMa2Value'] = pairs[pair]['dayMa2'].nextValue(pairs[pair]['dayClose']);
		pairs[pair]['dayAdxValue'] = pairs[pair]['dayAdx'].nextValue({close: pairs[pair]['dayClose'], high: pairs[pair]['dayHigh'], low: pairs[pair]['dayLow']});
		pairs[pair]['dayAtrValue'] = pairs[pair]['dayAtr'].nextValue({close: pairs[pair]['dayClose'], high: pairs[pair]['dayHigh'], low: pairs[pair]['dayLow']});
		
		if(pairs[pair]['maValue'] != undefined && pairs[pair]['ma2Value'] != undefined) {
			// findTradeOpportunity(pair, prices);
			pairs[pair]['prevMaValue'] = pairs[pair]['maValue'];
			pairs[pair]['prevMa2Value'] = pairs[pair]['ma2Value'];
			pairs[pair]['fifteenPrevMaValue'] = pairs[pair]['fifteenMaValue'];
			pairs[pair]['fifteenPrevMa2Value'] = pairs[pair]['fifteenMa2Value'];
			pairs[pair]['hourPrevMaValue'] = pairs[pair]['hourMaValue'];
			pairs[pair]['hourPrevMa2Value'] = pairs[pair]['hourMa2Value'];
			pairs[pair]['threeHourPrevMaValue'] = pairs[pair]['threeHourMaValue'];
			pairs[pair]['threeHourPrevMa2Value'] = pairs[pair]['threeHourMa2Value'];
			pairs[pair]['dayPrevMaValue'] = pairs[pair]['dayMaValue'];
			pairs[pair]['dayPrevMa2Value'] = pairs[pair]['dayMa2Value'];
			// console.log('Previous price: ', pairs[pair]['prevPrice'], 'ADX Value: ', pairs[pair]['adxValue'], 'ATR Value: ', pairs[pair]['atrValue']);
		}
	}
};

function writeHVF(pair, key, data){

			fs.writeFileSync('./draws/'+pair+key+'.json', data)
			console.log('HVF file written: '+pair+key+'.json')
}

function writeTrade(pair, key, data, side){
	if (side == 'bull'){
		fs.writeFileSync('./draws/trades/bullish'+pair+key+'.json', data)
		console.log('HVF bullish trade written @ ./draws/trades/bullish'+pair+key+'.json')
	} else if (side == 'bear') {
		fs.writeFileSync('./draws/trades/bearish'+pair+key+'.json', data)
		console.log('HVF bearish trade written @ ./draws/trades/bearish'+pair+key+'.json')
	}
}

function huntExtreme(pair, pairs) {
	beep()
	var hvf = {'pair': '', 'key': '', 'h1': 0, 'l1': 0, 'h2': 0, 'l2': 0, 'h3': 0, 'l3': 0, 'earlyEntry': 0, 'breakout': 0, 'centre': 0, 'earlyStop': 0, 'breakoutStop': 0, 'centreStop': 0, 'takeProfit': 0, 'altTarget': 0}
	var invHvf = {'pair': '', 'key': '', 'h1': 0, 'l1': 0, 'h2': 0, 'l2': 0, 'h3': 0, 'l3': 0, 'earlyEntry': 0, 'breakout': 0, 'centre': 0, 'earlyStop': 0, 'breakoutStop': 0, 'centreStop': 0, 'takeProfit': 0, 'altTarget': 0}

	if (pairs[pair]['lastPrice'] > extremeHigh){
		extremeHigh = pairs[pair]['lastPrice']
		console.log('extreme high updated:', extremeHigh)
	} else if (pairs[pair]['lastPrice'] < extremeLow){
		extremeLow = pairs[pair]['lastPrice']
		console.log('extreme low updated:', extremeLow)
	}

	if (pairs[pair]['prevLastPrice'] <  pairs[pair]['ma2Value'] && pairs[pair]['LastPrice'] >  pairs[pair]['ma2Value']) {
		//Setup hvf JSON
		let hvfDraw = {pair: pair, key: Date.now()%10000, h1: extremeHigh, l1: pairs[pair]['low'], h2: 0, l2: 0, h3: 0, l3: 0, earlyEntry: 0, breakout: 0, centre: 0, earlyStop: 0, breakoutStop: 0, centreStop: 0, takeProfit: 0, altTarget: 0};
		let key = hvfDraw.key;
		let data = JSON.stringify(hvfDraw);

		fs.writeFileSync('./draws/'+pair+hvfDraw.key+'.json', data)
		console.log('HVF file written: '+pair+hvfDraw.key+'.json')
		//start l1 program
		
		runL1(pair, key)

	} else if (pairs[pair]['prevLastPrice'] >  pairs[pair]['ma2Value'] && pairs[pair]['LastPrice'] <  pairs[pair]['ma2Value']) {
		//setup hvf JSON
		let hvfDraw = {pair: pair, key: Date.now()%10000, h1: pairs[pair]['high'], l1: extremeLow, h2: 0, l2: 0, h3: 0, l3: 0, earlyEntry: 0, breakout: 0, centre: 0, earlyStop: 0, breakoutStop: 0, centreStop: 0, takeProfit: 0, altTarget: 0};
		let data = JSON.stringify(hvfDraw);

		fs.writeFileSync('./draws/inv'+pair+hvfDraw.key+'.json', data)
		console.log('HVF file written: inv'+pair+hvfDraw.key+'.json')

		//start h1 program
		runH1(pair, key)

	}
	console.log('Extreme high:', extremeHigh, ' - Extreme Low:', extremeLow)
}

function runH1(pair, key){
	var hvfRunning = true;
	let rawData = fs.readFileSync('./draws/'+pair+key+'.json')
	let hvf = JSON.parse(rawData)
	console.log('inside hvf, running H1:', hvf.pair, hvf.key, hvf.h1)
	var data = hvf;
	var h1 = pairs[pair]['lastPrice'];

	if (pairs[pair]['lastPrice'] > h1){
		h1 = pairs[pair]['lastPrice']
		console.log('h1 updated')
	} else if (pairs[pair]['lastPrice'] < hvf.l1){
		runL1(pair, key)
	}

	if (pairs[pair]['lastPrice'] < pairs[pair]['ma2']){
		//update hvf json
		hvf.h1 = h1
		//write json
		writeHVF(pair, key, hvf)

		//start l1 program with updated json
		runL2(pair, key, data)
	}
}

function runL1(pair, key){
	hvfRunning = true;
	let rawData = fs.readFileSync('./draws/'+pair+key+'.json');
	let hvf = JSON.parse(rawData);
	var l1 = pairs[pair]['lastPrice'];
	console.log('inside hvf, running L1:', hvf.pair, hvf.key, hvf.h1)
	

	if (pairs[pair]['lastPrice'] > pairs[pair]['ma2']){
		runH2(pair, key, hvf)
	} else if (pairs[pair]['lastPrice'] < pairs[pair]['ma2']){
		runH1(pair, key, hvf)
	}

	//update hvf json
	hvf.l1 = l1
	if (hvf.l1 == l1){
		data = JSON.stringify(hvf)

		//write json
		writeHVF(pair, key, data)
	}
	

		// data.l1 = l1
		// if (data.l1 == l1){
		// 	writeHVF(pair, key, data)
		// }


	// if (pairs[pair]['lastPrice'] > hvf.h1){
	// 		runH1(pair, key)
	// } else if (pairs[pair]['lastPrice'] < l2){
	// 	l1 = pairs[pair]['lastPrice']
	// }
	// if (pairs[pair]['lastPrice'] > pairs[pair]['ma2']){
	// 	var data = hvf;
	// 	data.l1 = l1
	// 	if (data.l1 == l1){
	// 		writeHVF(pair, key, data)
	// 	}
		
	// }
	runH2(pair, key)
}

function runH2(pair, key){
	hvfRunning = true;
	let rawData = fs.readFileSync('./draws/'+pair+key+'.json');
	let hvf = JSON.parse(rawData);
	var h2 = pairs[pair]['lastPrice'];
	console.log('inside hvf, running H2:', pair, key, hvf.h1);

	if (pairs[pair]['lastPrice'] > h2){
		h2 = pairs[pair]['lastPrice'];
		console.log('h2 updated');
	} else if (pairs[pair]['lastPrice'] < hvf.l1){
		runL1(pair, key);
	};

	if (pairs[pair]['lastPrice'] > hvf.h1){
		runH1(pair, key);
	};

	if (pairs[pair]['lastPrice'] < pairs[pair]['ma2']){
		//update hvf json
		hvf.h2 = h2;

		if (hvf.h2 == h2){
			data = JSON.stringify(hvf);
			//write json
			writeHVF(pair, key, data);
		}

		runL2(pair, key)
	}
};

function runL2(pair, key){
	hvfRunning = true;
	let rawData = fs.readFileSync('./draws/'+pair+key+'.json');
	let hvf = JSON.parse(rawData);
	var l2 = pairs[pair]['lastPrice'];
	console.log('inside hvf, running L2:', hvf.pair, hvf.key, hvf.h1)

	if (pairs[pair]['lastPrice'] < l2){
		l2 = pairs[pair]['lastPrice'];
		console.log('l2 updated');
	} else if (pairs[pair]['lastPrice'] > hvf.h1){
		runH1(pair, key);
	};

	if (pairs[pair]['lastPrice'] > hvf.h1){
		runH1(pair, key);
	};
	
	if (pairs[pair]['lastPrice'] > pairs[pair]['ma2']){
		//update hvf json
		hvf.l2 = l2;

		if (hvf.l2 == l2){
			data = JSON.stringify(hvf);
			//write json
			writeHVF(pair, key, data);
		}

		runL2(pair, key)
	}

}

function runH3(pair, key){
	hvfRunning = true;
	let rawData = fs.readFileSync('./draws/'+pair+key+'.json');
	let hvf = JSON.parse(rawData);
	var h3 = pairs[pair]['lastPrice'];
	console.log('inside hvf, running H3:', hvf.pair, hvf.key, hvf.h1)

	if (pairs[pair]['lastPrice'] > h3){
		h3 = pairs[pair]['lastPrice'];
		console.log('h3 updated');
	} else if (pairs[pair]['lastPrice'] < hvf.l2){
		runL2(pair, key);
	};

	if (pairs[pair]['lastPrice'] > hvf.h2){
		runH2(pair, key);
	};
	
	if (pairs[pair]['lastPrice'] < pairs[pair]['ma2']){
		//update hvf json
		hvf.h3 = h3;

		if (hvf.h3 == h3){
			data = JSON.stringify(hvf);
			//write json
			writeHVF(pair, key, data);
		}

		runL3(pair, key)
	}

}

function runL3(pair, key){
	hvfRunning = true;
	let rawData = fs.readFileSync('./draws/'+pair+key+'.json');
	let hvf = JSON.parse(rawData);
	var l3 = pairs[pair]['lastPrice'];
	console.log('inside hvf, running L3:', hvf.pair, hvf.key, hvf.h1)
	
	if (pairs[pair]['lastPrice'] < l3){
		l3 = pairs[pair]['lastPrice'];
		console.log('l3 updated');
	} else if (pairs[pair]['lastPrice'] > hvf.h2){
		runH1(pair, key);
	};

	if (pairs[pair]['lastPrice'] > hvf.h2){
		runH1(pair, key);
	};
	
	if (pairs[pair]['lastPrice'] > pairs[pair]['ma2']){
		//update hvf json
		hvf.l3 = l3;

		if (hvf.h3 == 0){
			runH3(pair, key)
		} else {
			if (hvf.l3 == l3){
				data = JSON.stringify(hvf);
				//write json
				writeHVF(pair, key);
			}
			runBullTrade(pair, key)
		}
	}
}

function runBullTrade(pair, key){
	hvfRunning = true;
	beep()
	let rawData = fs.readFileSync('./draws/'+pair+key+'.json');
	let hvf = JSON.parse(rawData);
	var side = 'bull'

	hvf.breakout = hvf.h3
	hvf.breakoutStop = hvf.l3
	hvf.earlyEntry = hvf.l3
	hvf.earlyStop = hvf.l2
	hvf.centre = hvf.l3 + (hvf.h3 - hvf.l3 / 2);
	hvf.centreStop = hvf.l3 - (hvf.h3 - hvf.l3 / 2)
	hvf.takeProfit = hvf.centre + (hvf.h1 - hvf.l1)
	hvf.altTarget = hvf.centre - (hvf.h1 - hvf.l1)

	console.log('HVF in bull trade;', hvf)
	writeTrade(pair, key, JSON.stringify(hvf), side)

	//set entry points
	if (pairs[pair]['lastPrice'] > hvf.h3) {
		pairs[pair]['tradePrice'] = hvf.breakout
		buyPosition(pair, hvf);
		if (hvf.centre != 0){
			pairs[pair]['tradePrice'] = hvf.centre
			buyPosition(pair, hvf)
			if (hvf.earlyEntry != 0){
				pairs[pair]['tradePrice'] = hvf.earlyEntry
				buyPosition(pair, hvf)
			}
		}
	};

	//set exit points
	if (hvf.takeProfit != 0) {
		pairs[pair]['tradePrice'] = hvf.takeProfit
		sellPosition(pair, hvf);
		if (hvf.centreStop != 0){
			pairs[pair]['tradePrice'] = hvf.centreStop
			sellPosition(pair, hvf)
			if (hvf.earlyStop != 0){
				pairs[pair]['tradePrice'] = hvf.earlyStop
				sellPosition(pair, hvf)
			}
		}
	};

}

function runBearTrade(pair, key){
	hvfRunning = true;
	beep()
	let rawData = fs.readFileSync('./draws/'+pair+key+'.json');
	let hvf = JSON.parse(rawData);
	var side = 'bear'

	hvf.breakout = hvf.l3
	hvf.breakoutStop = hvf.h3
	hvf.earlyEntry = hvf.h3
	hvf.earlyStop = hvf.h2
	hvf.centre = hvf.h3 - (hvf.h3 - hvf.l3 / 2);
	hvf.centreStop = hvf.h3 + (hvf.h3 - hvf.l3 / 2)
	hvf.takeProfit = hvf.centre - (hvf.h1 - hvf.l1)
	hvf.altTarget = hvf.centre + (hvf.h1 - hvf.l1)

	console.log('HVF in bear trade;', hvf)
	writeTrade(pair, key, JSON.stringify(hvf), side)


	//set entry points
	if (pairs[pair]['lastPrice'] < hvf.l3) {
		pairs[pair]['tradePrice'] = hvf.breakout;
		buyPosition(pair, hvf);
		if (hvf.centre != 0){
			pairs[pair]['tradePrice'] = hvf.centre
			buyPosition(pair, hvf)
			if (hvf.earlyEntry != 0){
				pairs[pair]['tradePrice'] = hvf.earlyEntry
				buyPosition(pair, hvf)
			}
		}
	};

	//set exit points
	if (hvf.takeProfit != 0) {
		pairs[pair]['tradePrice'] = hvf.takeProfit
		buyPosition(pair, hvf);
		if (hvf.centreStop != 0){
			pairs[pair]['tradePrice'] = hvf.centreStop
			buyPosition(pair, hvf)
			if (hvf.earlyStop != 0){
				pairs[pair]['tradePrice'] = hvf.earlyStop
				buyPosition(pair, hvf)
			}
		}
	};
}

function findTradeOpportunity(pair, prices){
	console.log('____________________________________________________________');
	console.log('Analysing...', pair, pairs[pair]['lastPrice']);
	// console.log('ALT sell @:', round(pairs[pair]['ALTSellLevel'],7), ',', 'BTC sell @:',round(pairs[pair]['BTCSellLevel'],7));
	console.log('1h Current',pair, round(pairs[pair]['hourLatestPerc'],4),'%',', 1c%:',round(pairs[pair]['hourCandlePerc'],4));
	console.log('2c%:', round(pairs[pair]['hourPrevCandlePerc'],4),', 3c%',round(pairs[pair]['hourThirdCandlePerc'],4));
	console.log('Fast MA -', round(pairs[pair]['ma'].result[0], 4), '15m:',round(pairs[pair]['fifteenMa'].result[0], 4),'1hr:',round(pairs[pair]['hourMa'].result[0], 4),'Day:',round(pairs[pair]['dayMa'].result[0], 4));
	console.log('Slow MA -', round(pairs[pair]['ma2'].result[0], 4), '15m:',round(pairs[pair]['fifteenMa2'].result[0], 4),'1hr:',round(pairs[pair]['hourMa2'].result[0], 4),'Day:',round(pairs[pair]['dayMa2'].result[0], 4))
	console.log('15m ADX:',round(pairs[pair]['fifteenAdxValue'].adx, 4), 'ATR:', round(pairs[pair]['fifteenAtrValue'], 4))
	console.log('1hr ADX:',round(pairs[pair]['hourAdxValue'].adx, 4), 'ATR:', round(pairs[pair]['hourAtrValue'], 4))
	console.log('OHLC - 15m - open:',pairs[pair]['fifteenOpen'], 'high:',pairs[pair]['fifteenHigh'], 'low:',pairs[pair]['fifteenLow'], 'close:',pairs[pair]['fifteenClose']);
	console.log('OHLC - 1hr - open:',pairs[pair]['hourOpen'], 'high:',pairs[pair]['hourHigh'], 'low:',pairs[pair]['hourLow'], 'close:',pairs[pair]['hourClose']);
	console.log('OHLC - 3hr - open:',pairs[pair]['threeHourOpen'], 'high:',pairs[pair]['threeHourHigh'], 'low:',pairs[pair]['threeHourLow'], 'close:',pairs[pair]['threeHourClose']);
	console.log('OHLC - Day - open:',pairs[pair]['dayOpen'], 'high:',pairs[pair]['dayHigh'], 'low:',pairs[pair]['dayLow'], 'close:',pairs[pair]['dayClose']);	

	huntExtreme(pair, pairs)


	// if (pairs[pair]['lastPrice'] > pairs[pair]['ALTSellLevel']){
	// 	pairs[pair]['tradePrice'] = pairs[pair]['lastPrice'];
	// 	if (pairs[pair]['maValue'] > pairs[pair]['ma2Value']){
	// 		pairs[pair]['sellAmount'] = 0 - (pairs[pair]['lastPrice']/pairs[pair]['open']);
	// 	} else if (pairs[pair]['maValue'] < pairs[pair]['ma2Value']){
	// 		pairs[pair]['sellAmount'] = 0 - (pairs[pair]['lastPrice']/pairs[pair]['open']);
	// 	}
	// 	pairs[pair]['ALTSellLevel'] = pairs[pair]['askPrice'];
	// 	pairs[pair]['BTCSellLevel'] = pairs[pair]['bidPrice'];
	// 	pairs[pair]['sell']++;
	// 	sellPosition(pair, pairs, 'sell');
	// 	console.log('-----------------------------------------------------------------------');
	// 	console.log(pair, ' IOT SPIKE sold @ ', pairs[pair]['tradePrice'], pairs[pair]['sellAmount']);
	// 	console.log('-----------------------------------------------------------------------');

	// } else if (pairs[pair]['lastPrice'] < pairs[pair]['BTCSellLevel']){
	// 		pairs[pair]['tradePrice'] = pairs[pair]['close'];
	// 		if (pairs[pair]['maValue'] > pairs[pair]['ma2Value']){
	// 			pairs[pair]['sellAmount'] = (pairs[pair]['open']/pairs[pair]['lastPrice']);
	// 		} else if (pairs[pair]['maValue'] < pairs[pair]['ma2Value']){
	// 			pairs[pair]['sellAmount'] = (pairs[pair]['open']/pairs[pair]['lastPrice']);
	// 		}
	// 		pairs[pair]['ALTSellLevel'] = pairs[pair]['askPrice'];
	// 		pairs[pair]['BTCSellLevel'] = pairs[pair]['bidPrice'];
	// 		pairs[pair]['buy']++;
	// 		buyPosition(pair, pairs, 'buy');
	// 		console.log('-----------------------------------------------------------------------');
	// 		console.log(pair, ' Bitcoin SPIKE sold @ ', pairs[pair]['tradePrice'], pairs[pair]['sellAmount']);
	// 		console.log('-----------------------------------------------------------------------');
	// }

	// if (pairs[pair]['ALTSellLevel'] == Infinity){
	// 	pairs[pair]['ALTSellLevel'] = pairs[pair]['askPrice']* 1.02;
	// 	pairs[pair]['BTCSellLevel'] = pairs[pair]['bidPrice']* 0.98;
	// }
	pairs[pair]['prevPrice'] = pairs[pair]['lastPrice'];	
};


function buyPosition(pair, pairs, hvf, action){
	console.log('inside selling BTC function', pairs[pair]['lastPrice'], pairs[pair]['sellAmount']);
	console.log('££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££');

	bfx.trade(pair, pairs, action, 'buy', function(){
		console.log('Setting early entry', hvf.earlyEntry);
		
		pairs[pair]['buy'] = true;
		pairs[pair]['tradePrice'] = pairs[pair]['close'];
		openedPositions++;
		console.log(pair, ' Sold BTC at ', pairs[pair]['tradePrice'], ' Amount ', amount);
		console.log('---------------------------------------------------------')
		// console.log(pair, 'Trade was not successful'); 	
	});	

		bfx.trade(pair, pairs, action, 'sell', function(){
			console.log('Setting breakout entry', hvf.breakout);

		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		console.log('Setting breakout entry', hvf.breakout);
		
		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
}


function sellPosition(pair, pairs, hvf, action){
	console.log('inside selling ALT function', pairs[pair]['lastPrice'], pairs[pair]['sellAmount']);	
	console.log('££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££');

	bfx.trade(pair, pairs, action, 'sell', function(){
		console.log('ALT purchase log ', pairs[pair]['sellAmount'], pairs[pair]['tradePrice']);
		console.log('inside ALT trade function');
		
		pairs[pair]['sell'] = true;
		pairs[pair]['tradePrice'] = pairs[pair]['close'];
		openedPositions++;
		console.log(pair, ' Sold ALT at ', pairs[pair]['tradePrice'], ' Amount ', amount);
		console.log('---------------------------------------------------------');
		// console.log(pair, 'Trade was not successful');	
	});	

	bfx.trade(pair, pairs, action, 'sell', function(){

		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
	bfx.trade(pair, pairs, action, 'sell', function(){
		
		});	
}


function getPositionSize(pair, price, amount){

	var close = pairs['pair']['close'];
	var open = pairs['pair']['open'];

	if (close > open){
		//How much IOT will we sell?
		var difference = (close*open) * 100

	} else {
		//How much BTC will we sell?
		var difference = (close*open) * 100
	}

	var positionSize = difference;
	return positionSize;
}

module.exports = Manager;

