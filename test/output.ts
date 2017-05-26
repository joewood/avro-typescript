export enum numberEnumType { ONE, TWO };

export interface AllocsType {
	allocAccount: null | undefined | string;
	noNestedPartyIDs: null | undefined | number;
	allocQty: null | undefined | number;
}

export interface ExampleType {
	unionEnum: null | undefined | string | numberEnumType;
	mandatoryString: string;
	adouble: null | undefined | number;
	astring: null | undefined | string;
	amap: null | undefined | string | { [index:string]:numberEnumType };
	recordArray: null | undefined | AllocsType[];
	processCode: null | undefined | string;
	named: null | undefined | AllocsType;
}

