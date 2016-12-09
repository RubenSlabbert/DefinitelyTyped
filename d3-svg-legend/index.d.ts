// Type definitions for d3-svg-legend 2.19
// Project: http://d3-legend.susielu.com
// Definitions by: Ruben Slabbert <https://github.com/RubenSlabbert>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'd3-svg-legend' {
    import * as d3 from 'd3';

    // NOTE: Lots of <T>(this: T): T because the library
    // is very dynamic and this & T doesn't properly propogate types
    namespace Generic {
        interface Scale {
            (...args: any[]): any;
            domain: any;
            range: any;
            ticks?: any;
            invertExtent?: any;
        }

        type Shape = 'rect' | 'circle' | 'line' | 'path';

        interface LabelOpts {
            i: number;
            genLength: number;
            generatedLabels: string[];
            domain: any[];
            range: any[];
        }

        interface Legend<S extends Scale> {
            (svg: d3.Selection<any, any, any, any>): void;

            scale<T, S extends d3.ScaleContinuousNumeric<any, any>>(this: T, scale: S): T & Continuous;
            scale<T, S extends d3.ScaleOrdinal<any, any>>(this: T, scale: S): T;
            scale<T, S extends Scale>(this: T, scale: S): T;

            orient<T>(this: T, orient: 'vertical'): T;
            orient<T>(this: T, orient: 'horizontal'): T & Horizontal<S>;

            shapePadding<T>(this: T, num: number): T;
            classPrefix<T>(this: T, prefix: string): T;
            title<T>(this: T, title: string): T;

            labels<T>(this: T, label: string[]): T;
            labels<T>(this: T, f: (opts: LabelOpts) => string): T;

            labelFormat<T>(this: T, format: (n: number) => string | string): T;
            labelOffset<T>(this: T, num: number): T;
            labelDelimiter<T>(this: T, del: string): T;

            on<T>(this: T, event: 'cellover' | 'cellout' | 'cellclick', f: (d: any) => void): T;
        }

        interface Horizontal<S extends Scale> extends Legend<S> {
            labelAlign<T>(this: T, label: 'start' | 'middle' | 'end'): T;
        }

        interface Rect<S extends Scale> extends Legend<S> {
            shapeWidth<T>(this: T, num: number): T;
        }

        interface Line<S extends Scale> extends Legend<S> {
            shapeWidth<T>(this: T, num: number): T;
        }

        interface Continuous extends Legend<d3.ScaleContinuousNumeric<any, any>> {
            cells<T>(this: T, n: number): T;
            cells<T>(this: T, n: number[]): T;
        }
    }

    namespace Color {
        interface Legend<S extends Generic.Scale> extends Generic.Legend<S> {
            shape<T>(this: T, shape: 'rect'): T & Rect<S>;
            shape<T>(this: T, shape: 'circle'): T & Circle<S>;
            shape<T>(this: T, shape: 'line'): T & Generic.Line<S>;

            // d3.symbol can return string | null
            shape<T>(this: T, shape: 'path', path: string | null): T;

            useClass<T>(this: T, bool: boolean): T;
        }

        interface Rect<S extends Generic.Scale> extends Legend<S>, Generic.Rect<S> {
            shapeHeight<T>(this: T, num: number): T;
        }

        interface Circle<S extends Generic.Scale> extends Legend<S> {
            shapeRadius<T>(this: T, num: number): T;
        }
    }

    namespace Size {
        interface Legend<S extends Generic.Scale> extends Generic.Legend<S> {
            shape<T>(this: T, shape: 'rect'): T & Generic.Rect<S>;
            shape<T>(this: T, shape: 'circle'): T;
            shape<T>(this: T, shape: 'line'): T & Generic.Line<S>;

            useClass<T>(this: T, bool: boolean): T;
        }
    }

    namespace Symbol {
        interface Legend<S extends Generic.Scale> extends Generic.Legend<S> { }
    }

    interface Helpers {
        thresholdLabels: any;
    }

    export function legendColor<S extends Generic.Scale>(): Color.Legend<S> & Generic.Continuous & Color.Rect<S>;
    export function legendSize<S extends Generic.Scale>(): Size.Legend<S> & Generic.Continuous & Generic.Rect<S>;
    export function legendSymbol<S extends Generic.Scale>(): Symbol.Legend<S> & Generic.Continuous;
    export const legendHelpers: Helpers;
}