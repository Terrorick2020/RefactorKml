import {
    usePolygon,
    PolygonContext,
    usePolygonContext,
    usePointInner,
    useDrawInner,
    usePathFigure,
    usePointsFigure,
    useScissInner,
} from '../model';

import {
    EPolygonWorkType,
    EISPListType,
    type IPolygonProps,
    type IPolygonInnerProps,
    type IPolygonFigureProps,
} from './types';

import { memo, type JSX } from 'react';
import styles from './Polygon.module.scss';


function Polygon(props: IPolygonProps): JSX.Element {
    const ctxValue = usePolygonContext();
    const { polyRef, svgRef } = usePolygon();

    return (
        <PolygonContext.Provider value={ ctxValue }>
            <PolygonInner
                polyRef={ polyRef }
                svgRef={ svgRef }
                { ...props }
            />
        </PolygonContext.Provider>
    )
}

function PolygonInner({
    polyRef,
    svgRef,
    imgWidth,
    imgHeight,
    pointsList,
    setPointsList,
    isSow=true,
    isActive=true,
    workType=EPolygonWorkType.Draw,
    sepСoeff=2,
    pointRad=5,
    lineWidth=1,
    drawWidth=15,
    bgColor='red',
    lineColor='black',
}: IPolygonInnerProps): JSX.Element {
    const { onPointMove, onPointUp } = usePointInner(polyRef, svgRef);
    const {
        polylinePath,
        scissorPoints,
        onScissorsDown,
    } = useScissInner(polyRef, svgRef, pointsList, setPointsList);
    const {
        drawPath,
        cursorPoint,
        onDrowDown,
        onDrawMove,
        onDrowUp,
        onDrowLeave,
    } = useDrawInner(
        polyRef,
        svgRef,
        drawWidth,
        pointsList,
        setPointsList,
    );

    const svgEvents = {
        [EPolygonWorkType.Figure]: {
            onPointerMove: onPointMove,
            onPointerUp: onPointUp,
            onPointerLeave: onPointUp,
        },
        [EPolygonWorkType.Draw]: {
            onPointerDown: onDrowDown,
            onPointerMove: onDrawMove,
            onPointerUp: onDrowUp,
            onPointerLeave: onDrowLeave,
        },
        [EPolygonWorkType.Scissors]: {
            onPointerDown: onScissorsDown,
        }
    }

    return (
        <div
            ref={ polyRef }
            className={ styles['polygon'] }
            style={{ 
                display: isSow ? 'block' : 'none',
                zIndex: +isActive + 1,
            }}
        >
            <svg
                ref={ svgRef }
                viewBox={`0 0 ${imgWidth} ${imgHeight}`}
                { ...svgEvents[workType] }
            >
                { pointsList.map((item, index) => (
                    <PolygonFigure
                        key={ index }
                        outerCoords={ item.outerCoords }
                        innerCoords={ item.innerCoords }
                        showPoints={ isActive &&  workType === EPolygonWorkType.Figure}
                        sepСoeff={ sepСoeff }
                        pointRad={ pointRad }
                        lineWidth={ lineWidth }
                        bgColor={ bgColor }
                        lineColor={ lineColor }
                        setPointsList={ setPointsList(EISPListType.Upt, index) }
                    />
                )) }
                { workType === EPolygonWorkType.Draw &&
                    <>
                        { drawPath && <path
                            d={ drawPath }
                            stroke={ bgColor }
                            strokeWidth={ drawWidth }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        /> }
                        { cursorPoint && <circle
                            cx={ cursorPoint.x }
                            cy={ cursorPoint.y }
                            r={ drawWidth / 2 }
                            fill={ bgColor }
                        /> }
                    </>
                }
                { workType === EPolygonWorkType.Scissors && (
                    <>
                        { polylinePath && (
                            <path
                                d={ polylinePath }
                                stroke="yellow"
                                strokeWidth={ 2 }
                                fill="none"
                            />
                        ) }

                        { scissorPoints.map((p, i) => (
                            <circle
                                key={ i }
                                cx={ p.x }
                                cy={ p.y }
                                r={ 4 }
                                fill="yellow"
                            />
                        )) }
                    </>
                ) }
            </svg>
        </div>
    )
}

function PolygonFigure({
    setPointsList,
    outerCoords,
    innerCoords,
    showPoints=true,
    sepСoeff=2,
    pointRad=5,
    lineWidth=1,
    bgColor='red',
    lineColor='black',
}: IPolygonFigureProps): JSX.Element {
    const { keyId, pathData, fillRule } = usePathFigure(outerCoords, innerCoords);
    const { outerPoints, innerPoints, onPointDowm } = usePointsFigure(
        outerCoords,
        innerCoords,
        sepСoeff,
        setPointsList,
    );

    return (
        <>
            <path
                d={ pathData }
                stroke={ lineColor }
                strokeWidth={ lineWidth }
                fill={ bgColor }
                fillRule={ fillRule }
            />
            { showPoints && outerPoints.map((point, index) => (
                <circle
                    key={ `${point.type}-points-${keyId}-${index}` }
                    cx={ point.x }
                    cy={ point.y }
                    r={ pointRad }
                    fill={ bgColor }
                    stroke={ lineColor }
                    onPointerDown={ (e)=>onPointDowm(point.id, point.type, e) }
                />
            )) }
            { showPoints && innerPoints.map((point, index) => (
                <circle
                    key={ `${point.type}-points-${keyId}-${index}` }
                    cx={ point.x }
                    cy={ point.y }
                    r={ pointRad }
                    fill={ bgColor }
                    stroke={ lineColor }
                    onPointerDown={ (e)=>onPointDowm(point.id, point.type, e) }
                />
            )) }
        </>
    )
}

export default memo( Polygon );
