import './ClueModal.css';

const ClueModal = ({ handleClose, show, children}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      {/* <section id="dialogbox" className="modal"> */}
        {children}
            <div className="centeredPrompt">
                <div className="centeredPrompt__item centeredPromptLabel">Welcome to the Real World!</div>
                <div className="centeredPrompt__item centeredPromptDetails">Thanks for visiting here. More items will be added. </div>
            </div>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default ClueModal;