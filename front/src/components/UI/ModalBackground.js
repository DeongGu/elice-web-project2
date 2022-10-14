import '../../assets/style/ModalBackground.css';

const ModalBackground = ({ toggleHandler }) => {
  return (
    <div
      className='modal-background'
      onClick={() => {
        toggleHandler(false);
      }}
    />
  );
};

export default ModalBackground;
