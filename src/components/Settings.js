import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/Tool-state";
const Settings = () => {
    return (
        <div className={"toolbar"}>
            <label htmlFor={'line-id'}>line width</label>
<input onChange={e=> toolState.setLineWidth(e.target.value)} id={'line-id'} type={'number'} defaultValue={1} min={1} max={50} style={{margin:"0 10px"}}/>
            <label htmlFor={'stroke-id'}>stroke color</label>
            <input onChange={e=> toolState.setStrokeColor(e.target.value)} type={"color"} id={'stroke-id'}/>
        </div>
    );
};

export default Settings;