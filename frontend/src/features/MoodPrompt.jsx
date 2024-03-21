import close from '../assets/map/close.svg';

// Deprecated feature (mood prompt)
function MoodPrompt({onClickFunction}) {
    return (
      <div className="mood-prompt">
        <div id="mood-prompt-card">
          <img onClick={() => onClickFunction('none')} src={close}/>
          <p>How are you feeling today?</p>
          <button onClick={() => onClickFunction('grateful')} style={{backgroundColor: "var(--grateful)"}}>Grateful</button>
          <button onClick={() => onClickFunction('happy')} style={{backgroundColor: "var(--happy)"}}>Happy</button>
          <button onClick={() => onClickFunction('anxious')} style={{backgroundColor: "var(--anxious)"}}>Anxious</button>
          <button onClick={() => onClickFunction('tired')} style={{backgroundColor: "var(--tired)"}}>Tired</button>
          <button onClick={() => onClickFunction('down')} style={{backgroundColor: "var(--down)"}}>Down</button>
          <div className="urgent-help">I need urgent help</div>
        </div>
      </div>
    );
  }
  
export default MoodPrompt;
  