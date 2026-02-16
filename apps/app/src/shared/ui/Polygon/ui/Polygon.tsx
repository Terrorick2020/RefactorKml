import {
    memo,
    type JSX,
    type CSSProperties,
} from 'react';

import { usePolygonBox, usePoints, useMarker } from '../model';
import { EPolygonWorkType, type IPolygonProps } from './types';

import styles from './Polygon.module.scss';


function Polygon({
    pointsList,
    isSow=true,
    isActive=false,
    bgColor='transprent',
    sepСoeff=2,
    strMarWid=20,
    workType=EPolygonWorkType.Figure,
    setPointsList=()=>{}
}: IPolygonProps): JSX.Element {
    const { boxRef, polygonPoints, key } = usePolygonBox(pointsList);

    const {
        svgRef,
        circlePoints,
        onMouseDown,
        onMouseMove,
        onMouseUp,
    } = usePoints(pointsList, sepСoeff, setPointsList);
    
    const {
        drawPath,
        handleDrawStart,
        handleDrawMove,
        handleDrawEnd,
    } = useMarker(setPointsList);


    const svgEventMap = {
        [EPolygonWorkType.Figure]: {
            onMouseMove,
            onMouseUp: () => onMouseUp(),
        },
        [EPolygonWorkType.Draw]: {
            onMouseDown: handleDrawStart,
            onMouseMove: handleDrawMove,
            onMouseUp: handleDrawEnd
        }
    };
    
    return (
        <div
            ref={ boxRef }
            className={ styles['polygon'] }
            style={{
                display: isSow ? 'block' : 'none',
                zIndex: isActive ? 5 : 1,
                '--polygon-bg': bgColor
            } as CSSProperties}
        >
            <svg
                ref={ svgRef }
                className={ styles['polygon__svg'] }
                {...(isActive && { ...svgEventMap[workType] })}
            >
                <polygon
                    points={ polygonPoints }
                    strokeWidth={ isActive ? 1 : 0 }
                />
                { isActive && workType === EPolygonWorkType.Figure
                  && circlePoints.map((point, index) => (
                    <circle
                        key={ `polygon-point-${key}-${index}` }
                        cx={ point.x }
                        cy={ point.y }
                        r={ 4 }
                        onMouseDown={ (e) => onMouseDown(point.id, e) }
                    />
                )) }
                { drawPath && <path
                    d={ drawPath }
                    strokeWidth={ strMarWid }
                /> }
            </svg>
        </div>
    )
}

export default memo( Polygon );
