const Button = ({ label, onClick, onMouseEnter, onMouseLeave, onMouseDown }) => (
  <button class="button is-primary is-large" 
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onMouseDown={onMouseDown}
    onTouchStart={onMouseDown}>
    {label}
  </button>
)

export default Button
