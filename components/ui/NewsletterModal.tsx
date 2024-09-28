import Modal from "./Modal";
import { PlanesDeSuscripcion } from "./PlanesDeSuscripcion";

export default ({
  isActive,
  closeModal,
}: {
  isActive: boolean;
  closeModal: (val: boolean) => void;
}) => {
  return (
    <Modal
      variant="custom"
      className="p-6 overflow-hidden mt-20"
      isActive={isActive}
      onCancel={() => closeModal(false)}
    >
      <div className="text-center">
        <PlanesDeSuscripcion closeModal={closeModal} />
      </div>
    </Modal>
  );
};