import '../css/MenuStatistics.css';

export const GraphBar = (name, success, total, percent) => (
<div className='graphbar-bg'>
    <div className='graphbar-item' style={{width: percent + '%'}}>
        {name + ': ' + percent + "% (" + success + " / " + total + ")"}
    </div>
</div>
)