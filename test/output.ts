export enum numb { ONE, TWO };

export interface AllocsType {
	allocAccount: null | undefined | string;
	allocAcctIDSource: null | undefined | number;
	allocSettlCurrency: null | undefined | number;
	individualAllocID: null | undefined | string;
	noNestedPartyIDs: null | undefined | number;
	allocQty: null | undefined | number;
}

export interface StipulationsType {
	stipulationType: null | undefined | string;
	stipulationValue: null | undefined | string;
}

export interface TradingSessionsType {
	tradingSessionID: null | undefined | string;
	tradingSessionSubID: null | undefined | string;
}

export interface PartyIDsType {
	partyID: null | undefined | string;
	partyIDSource: null | undefined | string;
	partyRole: null | undefined | number;
	noPartySubIDs: null | undefined | number;
}

export interface SecurityAltIDType {
	securityAltID: null | undefined | string;
	securityAltIDSource: null | undefined | string;
}

export interface UnderlyingsType {
	underlyingSymbol: null | undefined | string;
	underlyingSymbolSfx: null | undefined | string;
	underlyingSecurityID: null | undefined | string;
	underlyingSecurityIDSource: null | undefined | string;
	noUnderlyingSecurityAltID: null | undefined | number;
	underlyingProduct: null | undefined | number;
	underlyingCFICode: null | undefined | string;
	underlyingSecurityType: null | undefined | string;
	underlyingSecuritySubType: null | undefined | string;
	underlyingMaturityMonthYear: null | undefined | string;
	underlyingMaturityDate: null | undefined | string;
	underlyingPutOrCall: null | undefined | number;
	underlyingCouponPaymentDate: null | undefined | string;
	underlyingIssueDate: null | undefined | string;
	underlyingRepoCollateralSecurityType: null | undefined | string;
	underlyingRepurchaseTerm: null | undefined | number;
	underlyingRepurchaseRate: null | undefined | number;
	underlyingFactor: null | undefined | number;
	underlyingCreditRating: null | undefined | string;
	underlyingInstrRegistry: null | undefined | string;
	underlyingCountryOfIssue: null | undefined | string;
	underlyingStateOrProvinceOfIssue: null | undefined | string;
	underlyingLocaleOfIssue: null | undefined | string;
	underlyingRedemptionDate: null | undefined | string;
	underlyingStrikePrice: null | undefined | number;
	underlyingStrikeCurrency: null | undefined | number;
	underlyingOptAttribute: null | undefined | string;
	underlyingContractMultiplier: null | undefined | number;
	underlyingCouponRate: null | undefined | number;
	underlyingSecurityExchange: null | undefined | string;
	underlyingIssuer: null | undefined | string;
	encodedUnderlyingIssuerLen: null | undefined | number;
	encodedUnderlyingIssuer: null | undefined | Buffer;
	underlyingSecurityDesc: null | undefined | string;
	encodedUnderlyingSecurityDescLen: null | undefined | number;
	encodedUnderlyingSecurityDesc: null | undefined | Buffer;
	underlyingCPProgram: null | undefined | string;
	underlyingCPRegType: null | undefined | string;
	underlyingCurrency: null | undefined | number;
	underlyingQty: null | undefined | number;
	underlyingPx: null | undefined | number;
	underlyingDirtyPrice: null | undefined | number;
	underlyingEndPrice: null | undefined | number;
	underlyingStartValue: null | undefined | number;
	underlyingCurrentValue: null | undefined | number;
	underlyingEndValue: null | undefined | number;
	noUnderlyingStips: null | undefined | number;
}

export interface EventsType {
	eventType: null | undefined | number;
	eventDate: null | undefined | string;
	eventPx: null | undefined | number;
	eventText: null | undefined | string;
}

export interface NewOrderSingle {
	account: null | undefined | string | numb;
	clOrdID: string;
	commission: null | undefined | number;
	commType: null | undefined | string;
	currency: null | undefined | number;
	execInst: null | undefined | string[];
	handlInst: null | undefined | string;
	securityIDSource: null | undefined | string;
	iOIID: null | undefined | string;
	orderQty: null | undefined | number;
	ordType: string;
	price: null | undefined | number;
	securityID: null | undefined | string;
	side: string;
	symbol: string;
	text: null | undefined | string;
	timeInForce: null | undefined | string;
	transactTime: string;
	settlType: null | undefined | string;
	settlDate: null | undefined | string;
	symbolSfx: null | undefined | string;
	allocID: null | undefined | string;
	tradeDate: null | undefined | string;
	positionEffect: null | undefined | string | { [index:string]:numb };
	noAllocs: null | undefined | AllocsType[];
	processCode: null | undefined | string;
	stopPx: null | undefined | number;
	exDestination: null | undefined | string;
	issuer: null | undefined | string;
	securityDesc: null | undefined | string;
	minQty: null | undefined | number;
	maxFloor: null | undefined | number;
	locateReqd: null | undefined | boolean;
	quoteID: null | undefined | string;
	settlCurrency: null | undefined | number;
	forexReq: null | undefined | boolean;
	expireTime: null | undefined | string;
	prevClosePx: null | undefined | number;
	cashOrderQty: null | undefined | number;
	securityType: null | undefined | string;
	effectiveTime: null | undefined | string;
	orderQty2: null | undefined | number;
	settlDate2: null | undefined | string;
	maturityMonthYear: null | undefined | string;
	putOrCall: null | undefined | number;
	strikePrice: null | undefined | number;
	coveredOrUncovered: null | undefined | number;
	optAttribute: null | undefined | string;
	securityExchange: null | undefined | string;
	maxShow: null | undefined | number;
	pegOffsetValue: null | undefined | number;
	spread: null | undefined | number;
	benchmarkCurveCurrency: null | undefined | number;
	benchmarkCurveName: null | undefined | string;
	benchmarkCurvePoint: null | undefined | string;
	couponRate: null | undefined | number;
	couponPaymentDate: null | undefined | string;
	issueDate: null | undefined | string;
	repurchaseTerm: null | undefined | number;
	repurchaseRate: null | undefined | number;
	factor: null | undefined | number;
	tradeOriginationDate: null | undefined | string;
	contractMultiplier: null | undefined | number;
	noStipulations: null | undefined | StipulationsType[];
	yieldType: null | undefined | string;
	yield: null | undefined | number;
	repoCollateralSecurityType: null | undefined | string;
	redemptionDate: null | undefined | string;
	creditRating: null | undefined | string;
	encodedIssuerLen: null | undefined | number;
	encodedIssuer: null | undefined | Buffer;
	encodedSecurityDescLen: null | undefined | number;
	encodedSecurityDesc: null | undefined | Buffer;
	encodedTextLen: null | undefined | number;
	encodedText: null | undefined | Buffer;
	complianceID: null | undefined | string;
	solicitedFlag: null | undefined | boolean;
	noTradingSessions: null | undefined | TradingSessionsType[];
	discretionInst: null | undefined | string;
	discretionOffsetValue: null | undefined | number;
	priceType: null | undefined | number;
	gTBookingInst: null | undefined | number;
	expireDate: null | undefined | string;
	noPartyIDs: null | undefined | PartyIDsType[];
	noSecurityAltID: null | undefined | SecurityAltIDType[];
	product: null | undefined | number;
	cFICode: null | undefined | string;
	roundingDirection: null | undefined | string;
	roundingModulus: null | undefined | number;
	countryOfIssue: null | undefined | string;
	stateOrProvinceOfIssue: null | undefined | string;
	localeOfIssue: null | undefined | string;
	commCurrency: null | undefined | number;
	cancellationRights: null | undefined | string;
	moneyLaunderingStatus: null | undefined | string;
	designation: null | undefined | string;
	fundRenewWaiv: null | undefined | string;
	registID: null | undefined | string;
	orderPercent: null | undefined | number;
	secondaryClOrdID: null | undefined | string;
	orderCapacity: null | undefined | string;
	orderRestrictions: null | undefined | string[];
	maturityDate: null | undefined | string;
	instrRegistry: null | undefined | string;
	cashMargin: null | undefined | string;
	accountType: null | undefined | number;
	custOrderCapacity: null | undefined | number;
	clOrdLinkID: null | undefined | string;
	dayBookingInst: null | undefined | string;
	bookingUnit: null | undefined | string;
	preallocMethod: null | undefined | string;
	clearingFeeIndicator: null | undefined | string;
	price2: null | undefined | number;
	acctIDSource: null | undefined | number;
	benchmarkPrice: null | undefined | number;
	benchmarkPriceType: null | undefined | number;
	contractSettlMonth: null | undefined | string;
	pool: null | undefined | string;
	yieldRedemptionDate: null | undefined | string;
	yieldRedemptionPrice: null | undefined | number;
	yieldRedemptionPriceType: null | undefined | number;
	benchmarkSecurityID: null | undefined | string;
	yieldCalcDate: null | undefined | string;
	noUnderlyings: null | undefined | UnderlyingsType[];
	benchmarkSecurityIDSource: null | undefined | string;
	securitySubType: null | undefined | string;
	bookingType: null | undefined | number;
	terminationType: null | undefined | number;
	pegMoveType: null | undefined | number;
	pegOffsetType: null | undefined | number;
	pegLimitType: null | undefined | number;
	pegRoundDirection: null | undefined | number;
	pegScope: null | undefined | number;
	discretionMoveType: null | undefined | number;
	discretionOffsetType: null | undefined | number;
	discretionLimitType: null | undefined | number;
	discretionRoundDirection: null | undefined | number;
	discretionScope: null | undefined | number;
	targetStrategy: null | undefined | number;
	targetStrategyParameters: null | undefined | string;
	participationRate: null | undefined | number;
	qtyType: null | undefined | number;
	noEvents: null | undefined | EventsType[];
	datedDate: null | undefined | string;
	interestAccrualDate: null | undefined | string;
	cPProgram: null | undefined | number;
	cPRegType: null | undefined | string;
	marginRatio: null | undefined | number;
	agreementDesc: null | undefined | string;
	agreementID: null | undefined | string;
	agreementDate: null | undefined | string;
	startDate: null | undefined | string;
	endDate: null | undefined | string;
	agreementCurrency: null | undefined | number;
	deliveryType: null | undefined | number;
	strikeCurrency: null | undefined | number;
}

